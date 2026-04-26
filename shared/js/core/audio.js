/*!
 * audio.js — music + voice (narration).
 *
 * Music: if a file is wired via MR.Audio.setMusicSrc("…mp3"), we play that
 *   through an <audio> element. With no file wired, we fall back to a
 *   procedural lofi track built with the Web Audio API.
 *
 *   The procedural track is a small lofi study-beat:
 *
 *     • Drums   — boom-bap kit. Kick on 1 & 3, light snare on 2 & 4, closed
 *                 hi-hat on every 8th, one open hat on the last & of the
 *                 bar. The whole drum bus is low-passed at 4.5 kHz for the
 *                 muffled cassette character. ±8 ms timing jitter on every
 *                 hit so the groove is "human", not perfectly quantized.
 *     • Bass    — saw bass at the chord root, low-passed, beats 1 & 3.
 *     • Piano   — light electric-piano "comp" providing the harmony.
 *                 Rootless 3-note 7th voicings stabbed on beat 1 of each
 *                 bar; a single higher chord-tone "answer" on beat 3.
 *                 No sustained pad — piano stabs ring out and decay.
 *     • Vinyl   — looping filtered noise + occasional pops. Quiet bed.
 *
 *   Chord progression: Cmaj7 → Am7 → Fmaj7 → G7. Tempo 72 BPM, 4/4, one
 *   chord per 2 bars (≈6.67 s); full loop ≈26.7 s. The "answer" notes are
 *   randomly chosen each pass so the loop never sounds identical.
 *
 * Voice (narration): plays a clip if MR.Audio.playLine({ audio }) is given a
 *   URL; otherwise no-op (caller shows text).
 */
(function () {
  const S = window.MR.Storage;
  let musicEl = null;
  let voiceEl = null;
  let proc = null;

  function ensureMusic() {
    if (musicEl) return musicEl;
    musicEl = document.createElement("audio");
    musicEl.loop = true;
    musicEl.volume = S.getSettings().volume || 0.4;
    return musicEl;
  }

  // -------- Procedural lofi track ----------------------------------------
  function startProcedural() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();
    if (ctx.state === "suspended") ctx.resume();

    // ---- Master + buses ----------------------------------------------------
    // Master → limiter → destination. The limiter catches transient peaks
    // (kick + snare on a downbeat, piano stabs on top of those) so the mix
    // stays even-loudness without anything needing to be cranked to win.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3;
    limiter.knee.value = 4;
    limiter.ratio.value = 12;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.08;
    limiter.connect(ctx.destination);

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(limiter);
    const targetVol = (S.getSettings().volume || 0.4) * 0.55;
    master.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.6);

    // Drum bus: kit sits under the piano now (no kick — see scheduleBar).
    // Lower than before since snare + hat alone don't need the headroom.
    const drumBus = ctx.createGain();
    drumBus.gain.value = 0.65;
    const drumLp = ctx.createBiquadFilter();
    drumLp.type = "lowpass";
    drumLp.frequency.value = 4500;
    drumLp.Q.value = 0.7;
    drumBus.connect(drumLp);
    drumLp.connect(master);

    // Tape wobble — applied only to pad/bass to keep drums tight.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 2.5; // cents
    lfo.connect(lfoGain);
    lfo.start();

    // Delay: gives the piano + jazz lead a wet, "in a room" feel without
    // a real reverb. Dotted-eighth at 72 BPM doubles as a rhythmic echo.
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.3125; // dotted-eighth at 72 BPM
    const feedback = ctx.createGain();
    feedback.gain.value = 0.30;
    const wet = ctx.createGain();
    wet.gain.value = 0.30;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(master);

    // ---- Tempo ---------------------------------------------------------
    const TEMPO = 72;                      // BPM
    const BEAT  = 60 / TEMPO;              // 0.833 s
    const BAR   = BEAT * 4;                // 3.333 s
    const BARS_PER_CHORD = 2;
    const CHORD_DUR = BAR * BARS_PER_CHORD; // 6.667 s
    // Small overlap so the previous bar's piano tail can ring under the
    // next chord's stab — adds a touch of phrase continuity.
    const CROSSFADE = 0.5;

    // Slight per-hit timing jitter (seconds) for "human played" feel.
    const jitter = () => (Math.random() - 0.5) * 0.016;

    // Clamp a scheduled time so we never feed the Web Audio API a negative
    // (or even past) timestamp — `setValueAtTime` rejects negative times.
    const at = (t) => Math.max(t, ctx.currentTime + 0.001);

    const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

    // ---- Harmony ---------------------------------------------------------
    // I-vi-IV-V with maj7 / min7 / dom7 voicings — classic lofi changes.
    // Each chord has:
    //   bass    — root note in the bass octave
    //   stab    — rootless 3-note voicing for the piano comp (mid octave).
    //             Dropping the root keeps the piano out of the bass's way.
    //   answer  — pool of higher chord tones the piano picks one from for
    //             the beat-3 "answer" hit. Adds melodic motion without
    //             needing a separate lead instrument.
    const CHORDS = [
      // Cmaj7  : E G B  / answers C5 E5 G5 B5
      { bass: 36, stab: [64, 67, 71], answer: [72, 76, 79, 83] },
      // Am7    : C E G  / answers C5 E5 G5
      { bass: 33, stab: [60, 64, 67], answer: [72, 76, 79] },
      // Fmaj7  : A C E  / answers A4 C5 E5
      { bass: 29, stab: [57, 60, 64], answer: [69, 72, 76] },
      // G7     : B D F  / answers B4 D5 F5
      { bass: 31, stab: [59, 62, 65], answer: [71, 74, 77] },
    ];

    let chordIdx = 0;
    let timer = null;
    let stopped = false;
    // Drift-free chord start clock. `nextStart` is the AudioContext time
    // at which the *next* chord should begin. It's incremented by
    // CHORD_DUR every tick, so successive chords land on a perfect grid
    // independent of setTimeout jitter. Without this, each tick would
    // re-read ctx.currentTime as the new t0 — and since setTimeout was
    // firing 0.5 s before the chord ended, every cycle started 0.5 s
    // early, making the beat audibly "jump ahead" after a few loops.
    let nextStart = ctx.currentTime + 0.05;

    // ---- Synth voices ----------------------------------------------------

    // Bass: short saw stab, low-passed, plays on beats 1 & 3 of each bar.
    function startBassNote(midiNote, t0, dur) {
      const f = midi(midiNote);
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      lfoGain.connect(o.detune);

      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = 380;
      filt.Q.value = 1.4;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.13, t0 + 0.012); // pluck attack
      g.gain.exponentialRampToValueAtTime(0.04, t0 + 0.18);
      g.gain.exponentialRampToValueAtTime(0.0005, t0 + dur);

      o.connect(filt);
      filt.connect(g);
      g.connect(master);
      o.start(t0);
      o.stop(t0 + dur + 0.05);
    }

    // Piano: light electric-piano voice. Triangle fundamental + soft 2×
    // and 3× sine harmonics gives the woody character; filter opens on
    // attack and closes during decay (hammer hits then strings ring out).
    // Percussive envelope — no sustain — so stacked stabs don't bloom.
    function startPianoNote(midiNote, t0, velocity) {
      const f = midi(midiNote);
      const peak = 0.048 * (velocity || 0.7); // up from 0.030 — more present

      const o1 = ctx.createOscillator();
      o1.type = "triangle";
      o1.frequency.value = f;
      o1.detune.value = -2;

      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.value = f * 2;
      o2.detune.value = +3;
      const o2g = ctx.createGain();
      o2g.gain.value = 0.18;

      const o3 = ctx.createOscillator();
      o3.type = "sine";
      o3.frequency.value = f * 3;
      const o3g = ctx.createGain();
      o3g.gain.value = 0.05;

      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.setValueAtTime(2200, t0);
      filt.frequency.exponentialRampToValueAtTime(800, t0 + 1.2);
      filt.Q.value = 0.8;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(peak, t0 + 0.006);                  // hammer hit
      g.gain.exponentialRampToValueAtTime(peak * 0.35, t0 + 0.18);       // initial decay
      g.gain.exponentialRampToValueAtTime(0.0005, t0 + 1.8);             // long release

      // Stronger send to delay: piano sits in a room rather than feeling
      // pasted-on-dry. Half the gain goes wet so we don't over-blur.
      const sendG = ctx.createGain();
      sendG.gain.value = 0.55;

      o1.connect(filt);
      o2.connect(o2g); o2g.connect(filt);
      o3.connect(o3g); o3g.connect(filt);
      filt.connect(g);
      g.connect(master);
      g.connect(sendG);
      sendG.connect(delay);

      o1.start(t0); o2.start(t0); o3.start(t0);
      o1.stop(t0 + 1.9);
      o2.stop(t0 + 1.9);
      o3.stop(t0 + 1.9);
    }

    // Jazz lead: bright, expressive single-line voice for the playful
    // melody on top of the piano comp. Sine + soft 2× triangle for clear
    // pitch, vibrato that ramps in after 0.4 s (sustained notes get more
    // expression than short ones), filter slowly closes during the note's
    // tail. Sent fairly wet through the delay so phrases bloom.
    function startJazzNote(midiNote, t0, dur, velocity) {
      const f = midi(midiNote);
      const peak = 0.045 * (velocity || 0.7);
      const sustain = peak * 0.7;

      const o1 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.value = f;
      o1.detune.value = -2;

      const o2 = ctx.createOscillator();
      o2.type = "triangle";
      o2.frequency.value = f * 2;
      o2.detune.value = +3;
      const o2g = ctx.createGain();
      o2g.gain.value = 0.20;

      // Late-onset vibrato — typical for jazz/sax phrasing.
      const vib = ctx.createOscillator();
      vib.frequency.value = 5.5;
      const vibG = ctx.createGain();
      vibG.gain.setValueAtTime(0, t0);
      vibG.gain.linearRampToValueAtTime(5, t0 + 0.4); // ±5 cents
      vib.connect(vibG);
      vibG.connect(o1.detune);
      vibG.connect(o2.detune);
      vib.start(t0);

      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.setValueAtTime(2400, t0);
      filt.frequency.exponentialRampToValueAtTime(1100, t0 + dur + 0.3);
      filt.Q.value = 1.1;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(peak, t0 + 0.018);                              // attack
      g.gain.exponentialRampToValueAtTime(Math.max(sustain, 1e-4), t0 + 0.15);       // small decay
      g.gain.setValueAtTime(Math.max(sustain, 1e-4), t0 + dur);                      // sustain
      g.gain.exponentialRampToValueAtTime(0.0005, t0 + dur + 0.5);                   // release

      const sendG = ctx.createGain();
      sendG.gain.value = 0.60;

      o1.connect(filt);
      o2.connect(o2g); o2g.connect(filt);
      filt.connect(g);
      g.connect(master);
      g.connect(sendG);
      sendG.connect(delay);

      const stopT = t0 + dur + 0.6;
      o1.start(t0); o2.start(t0);
      o1.stop(stopT);
      o2.stop(stopT);
      vib.stop(stopT);
    }

    // Jazz phrase library. Each phrase is an array of
    //   [beatOffset, midiNote, durationInBeats, velocity]
    // entries describing notes to fire across the 2-bar chord cycle
    // (8 beats total, 0..7.99). Mixes early/late phrases, descending
    // sparkles, ascending lifts, bebop-style 16th runs, trills, and held
    // call-and-answer pairs. Drawn from a C major blues palette
    // (C D Eb E G A Bb plus their octaves) so it sits over all four
    // chords without clashing.
    const JAZZ_PHRASES = [
      // 1. Early descending sparkle (E5 → D5 → A4)
      [[0.5, 76, 0.5, 0.70], [1.0, 74, 0.5, 0.65], [1.5, 69, 1.2, 0.60]],
      // 2. Late ascending lift to held note (G4 → A4 → E5)
      [[4.5, 67, 0.5, 0.60], [5.0, 69, 0.5, 0.70], [6.5, 76, 1.2, 0.78]],
      // 3. Call (bar 1) and answer (bar 2)
      [[0.5, 67, 0.5, 0.70], [4.5, 72, 1.0, 0.65], [6.5, 74, 0.8, 0.72]],
      // 4. Bebop-style 16th run with chromatic Bb (blues note)
      [[4.5, 69, 0.3, 0.55], [4.8, 70, 0.3, 0.62], [5.1, 72, 0.3, 0.68], [5.5, 75, 1.1, 0.78]],
      // 5. Sparse held note in each bar (A4, then C5)
      [[1.0, 69, 1.4, 0.70], [5.0, 72, 1.5, 0.66]],
      // 6. Trill in bar 1 + held resolution in bar 2
      [[1.0, 72, 0.3, 0.60], [1.3, 74, 0.3, 0.62], [1.6, 72, 0.4, 0.66], [5.0, 69, 1.5, 0.72]],
      // 7. Pickup figure leading into bar 2 downbeat
      [[3.5, 67, 0.4, 0.55], [4.2, 72, 0.7, 0.72], [4.8, 74, 0.4, 0.66], [5.5, 76, 1.0, 0.74]],
      // 8. Blues lick — Eb→E grace then up to A
      [[2.5, 63, 0.25, 0.55], [2.75, 64, 0.5, 0.65], [3.5, 69, 0.8, 0.72]],
    ];

    // Drums — synthesized hits routed to drumBus.
    // (Kick removed — its low-end thump was the "underlying beat" that
    // overpowered the piano. Bass alone now carries the low frequencies.)

    // Light snare — softer than a typical lofi snare. The noise burst is
    // shorter and quieter, and the tonal "snap" body is dialed back so it
    // reads more like a brushed/rim hit than a full backbeat.
    function startSnare(t0) {
      // Noise body
      const len = Math.floor(ctx.sampleRate * 0.13);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      const nFilt = ctx.createBiquadFilter();
      nFilt.type = "highpass";
      nFilt.frequency.value = 1800;

      const nG = ctx.createGain();
      nG.gain.setValueAtTime(0, t0);
      nG.gain.linearRampToValueAtTime(0.16, t0 + 0.001); // was 0.32
      nG.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.11);

      noise.connect(nFilt);
      nFilt.connect(nG);
      nG.connect(drumBus);
      noise.start(t0);
      noise.stop(t0 + 0.13);

      // Tonal body — softer "snap" so the snare doesn't punch through.
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(180, t0);
      o.frequency.exponentialRampToValueAtTime(120, t0 + 0.04);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0, t0);
      og.gain.linearRampToValueAtTime(0.085, t0 + 0.002); // was 0.18
      og.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.08);
      o.connect(og);
      og.connect(drumBus);
      o.start(t0);
      o.stop(t0 + 0.11);
    }

    function startHat(t0, open) {
      const dur = open ? 0.22 : 0.045;
      const len = Math.floor(ctx.sampleRate * (dur + 0.05));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      const filt = ctx.createBiquadFilter();
      filt.type = "highpass";
      filt.frequency.value = 7200;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(open ? 0.13 : 0.075, t0 + 0.001);
      g.gain.exponentialRampToValueAtTime(0.0005, t0 + dur);

      noise.connect(filt);
      filt.connect(g);
      g.connect(drumBus);
      noise.start(t0);
      noise.stop(t0 + dur + 0.05);
    }

    // Vinyl crackle: looping filtered noise + sparse pops. Built once,
    // loops for the lifetime of the track.
    function startVinyl() {
      const seconds = 4;
      const len = ctx.sampleRate * seconds;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        let v = (Math.random() * 2 - 1) * 0.06;     // base hiss
        if (Math.random() < 0.0002) v += (Math.random() * 2 - 1) * 0.55; // pop
        data[i] = v;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;

      const filt = ctx.createBiquadFilter();
      filt.type = "bandpass";
      filt.frequency.value = 3500;
      filt.Q.value = 0.5;

      const g = ctx.createGain();
      // Vinyl is meant to be felt, not heard — a quiet hiss bed.
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.5);

      src.connect(filt);
      filt.connect(g);
      g.connect(master);
      src.start();
      return { src, g };
    }
    const vinyl = startVinyl();

    // ---- Bar-level scheduler -------------------------------------------
    // Schedules drums + bass for one bar (4 beats, 16 sixteenths).
    // Pattern (16ths, 0..15) — kick muted by request:
    //   Snare    : 4 12                        (beats 2, 4)
    //   Hat (cl) : 0 2 4 6 8 10 12             (every 8th except slot 14)
    //   Hat (op) : 14                          (the "and" of beat 4)
    function scheduleBar(t0) {
      const sixteenth = BEAT / 4;
      // Snares (light)
      startSnare(at(t0 + 4  * sixteenth + jitter()));
      startSnare(at(t0 + 12 * sixteenth + jitter()));
      // Hats
      [0, 2, 4, 6, 8, 10, 12].forEach((slot) => {
        startHat(at(t0 + slot * sixteenth + jitter()), false);
      });
      startHat(at(t0 + 14 * sixteenth + jitter()), true);
    }

    // Schedules a 2-bar bass pattern: root on beats 1 and 3 of each bar.
    function scheduleBass(t0, bassMidi) {
      const beatLen = BEAT;
      [0, 2, 4, 6].forEach((beatN) => {
        startBassNote(bassMidi, at(t0 + beatN * beatLen + jitter()), beatLen * 1.6);
      });
    }

    // ---- Main loop: one chord cycle = 2 bars ---------------------------
    function tick() {
      if (stopped) return;
      const chord = CHORDS[chordIdx % CHORDS.length];
      // Use the precise nextStart clock — NOT ctx.currentTime — so cycles
      // line up on a perfect grid even when setTimeout fires late.
      const t0 = nextStart;

      // Drums + bass per bar.
      scheduleBar(t0);
      scheduleBar(t0 + BAR);
      scheduleBass(t0, chord.bass);

      // Piano comp: 3-note chord stab on beat 1 of each bar, plus a
      // single higher chord-tone "answer" on beat 3.
      [0, 1].forEach((barIdx) => {
        const barStart = t0 + barIdx * BAR;
        const stabVel = barIdx === 0 ? 0.85 : 0.72;
        chord.stab.forEach((m) => {
          startPianoNote(m, at(barStart + jitter()), stabVel);
        });
        const ansNote = chord.answer[Math.floor(Math.random() * chord.answer.length)];
        startPianoNote(ansNote, at(barStart + 2 * BEAT + jitter()), 0.65);
      });

      // Jazz lead: pick a random phrase template and fire it across the
      // 2-bar chord. Random selection (rather than sequential) means the
      // listener never quite predicts what the melody will do next.
      const phrase = JAZZ_PHRASES[Math.floor(Math.random() * JAZZ_PHRASES.length)];
      phrase.forEach(([beatOff, note, durBeats, vel]) => {
        startJazzNote(note, at(t0 + beatOff * BEAT + jitter()), durBeats * BEAT, vel);
      });

      // Advance the precise grid clock for the next cycle.
      chordIdx++;
      nextStart = t0 + CHORD_DUR;

      // Wake up ~300 ms before the next chord should begin so we have
      // lookahead to schedule the upcoming sounds before they need to
      // play. Floor at 50 ms so we never busy-loop.
      const wakeAhead = 0.30;
      const wakeMs = (nextStart - ctx.currentTime - wakeAhead) * 1000;
      timer = setTimeout(tick, Math.max(50, wakeMs));
    }
    tick();

    return {
      ctx,
      master,
      stop() {
        stopped = true;
        if (timer) clearTimeout(timer);
        const t = ctx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(0, t + 0.5);
        try { lfo.stop(t + 0.6); } catch (e) {}
        try { vinyl.src.stop(t + 0.6); } catch (e) {}
        setTimeout(() => { try { ctx.close(); } catch (e) {} }, 750);
      },
      setVolume(v) {
        const t = ctx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(v * 0.55, t + 0.2);
      },
    };
  }

  const Audio = {
    setMusicSrc(src) { ensureMusic().src = src; },

    startMusic() {
      const el = ensureMusic();
      if (el.src) {
        const p = el.play();
        if (p && p.catch) p.catch(() => {});
        return true;
      }
      if (!proc) proc = startProcedural();
      return !!proc;
    },

    stopMusic() {
      if (musicEl) musicEl.pause();
      if (proc) { proc.stop(); proc = null; }
    },

    isMusicPlaying() {
      return !!(musicEl && !musicEl.paused) || !!proc;
    },

    setVolume(v) {
      S.setSettings({ volume: v });
      if (musicEl) musicEl.volume = v;
      if (voiceEl) voiceEl.volume = v;
      if (proc) proc.setVolume(v);
    },

    // Narration: plays an audio file if provided; otherwise no-op (caller shows text).
    playLine({ audio }) {
      if (!audio || !S.getSettings().voiceOn) return;
      try {
        if (voiceEl) { voiceEl.pause(); voiceEl.currentTime = 0; }
        voiceEl = new window.Audio(audio);
        voiceEl.volume = S.getSettings().volume || 0.6;
        voiceEl.play().catch(() => {});
      } catch (e) {}
    },
    stopLine() { if (voiceEl) voiceEl.pause(); },
  };

  window.MR = window.MR || {};
  window.MR.Audio = Audio;
})();
