/**
 * music.js — gentle lofi-style loop generated with the Web Audio API.
 *
 * No audio files required. This produces a calm, predictable loop tuned
 * to be soothing (important for a user who is on the spectrum): slow
 * tempo, warm filtered sines, soft percussion, a simple ii–V–I-ish
 * chord progression that cycles without surprises.
 */
(function () {
  // Chord progression (Am7 – Fmaj7 – Cmaj7 – G). Each entry is an array
  // of MIDI-ish semitone offsets over a C3 root. The progression loops.
  const PROGRESSION = [
    { name: "Am7",  bass: 45, chord: [57, 60, 64, 67], melody: [69, 72, 76, 72] },
    { name: "Fmaj7",bass: 41, chord: [53, 57, 60, 64], melody: [65, 69, 72, 69] },
    { name: "Cmaj7",bass: 36, chord: [48, 52, 55, 59], melody: [64, 67, 71, 67] },
    { name: "G",    bass: 43, chord: [50, 55, 59, 62], melody: [67, 71, 74, 71] },
  ];

  const BPM = 64;              // calm
  const BEATS_PER_CHORD = 4;
  const SECS_PER_BEAT = 60 / BPM;

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  let ctx = null;
  let masterGain = null;
  let isPlaying = false;
  let schedulerTimer = null;
  let nextNoteTime = 0;
  let chordIndex = 0;
  let beatInChord = 0;
  let volume = 0.4;

  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = volume;
    // Low-pass + soft compressor feel for warmth
    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 2800;
    lpf.Q.value = 0.7;
    masterGain.connect(lpf);
    lpf.connect(ctx.destination);
    return ctx;
  }

  // ---- voices ----

  function scheduleBass(freq, startTime, duration) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(0.32, startTime + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(g);
    g.connect(masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  function schedulePad(freqs, startTime, duration) {
    // Layered soft sines to act as a pad
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      // tiny detune for warmth
      osc.detune.value = (i - 1.5) * 4;

      const g = ctx.createGain();
      const peak = 0.06 - i * 0.01;
      g.gain.setValueAtTime(0, startTime);
      g.gain.linearRampToValueAtTime(peak, startTime + 0.6);
      g.gain.linearRampToValueAtTime(peak * 0.85, startTime + duration * 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  }

  function scheduleMelody(freq, startTime, duration) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // subtle vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5;
    lfoGain.gain.value = 2;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(startTime);
    lfo.stop(startTime + duration);

    osc.connect(g);
    g.connect(masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  function scheduleKick(startTime) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.18);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.4, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

    osc.connect(g);
    g.connect(masterGain);
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  }

  function scheduleHat(startTime) {
    // noise burst
    const bufferSize = ctx.sampleRate * 0.08;
    const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;

    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 6000;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.12, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    src.connect(hpf);
    hpf.connect(g);
    g.connect(masterGain);
    src.start(startTime);
    src.stop(startTime + 0.1);
  }

  // ---- scheduler ----

  function scheduleBeat(startTime, beatIdx, chord) {
    // On beat 1: bass + pad + melody note
    // On all beats: hi-hat
    // On beat 3: second kick
    if (beatIdx === 0) {
      scheduleBass(midiToFreq(chord.bass), startTime, SECS_PER_BEAT * 3.5);
      const padFreqs = chord.chord.map((m) => midiToFreq(m));
      schedulePad(padFreqs, startTime, SECS_PER_BEAT * 3.8);
      scheduleKick(startTime);
    }
    if (beatIdx === 2) {
      scheduleKick(startTime);
    }
    // hi-hat on every half beat
    scheduleHat(startTime);
    scheduleHat(startTime + SECS_PER_BEAT * 0.5);

    // melody note every other beat
    if (beatIdx % 2 === 0) {
      const melMidi = chord.melody[(chordIndex + beatIdx) % chord.melody.length];
      scheduleMelody(midiToFreq(melMidi), startTime + 0.12, SECS_PER_BEAT * 1.2);
    }
  }

  function schedulerTick() {
    if (!isPlaying) return;
    const lookahead = 0.15;
    while (nextNoteTime < ctx.currentTime + lookahead) {
      const chord = PROGRESSION[chordIndex];
      scheduleBeat(nextNoteTime, beatInChord, chord);
      beatInChord++;
      nextNoteTime += SECS_PER_BEAT;
      if (beatInChord >= BEATS_PER_CHORD) {
        beatInChord = 0;
        chordIndex = (chordIndex + 1) % PROGRESSION.length;
      }
    }
  }

  const Music = {
    isPlaying() { return isPlaying; },

    async start() {
      const c = ensureContext();
      if (!c) return false;
      if (c.state === "suspended") await c.resume();
      if (isPlaying) return true;
      isPlaying = true;
      chordIndex = 0;
      beatInChord = 0;
      nextNoteTime = c.currentTime + 0.1;
      // run scheduler with modest cadence
      schedulerTimer = setInterval(schedulerTick, 40);
      // fade master in
      masterGain.gain.cancelScheduledValues(c.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, c.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume, c.currentTime + 1);
      return true;
    },

    stop() {
      if (!isPlaying) return;
      isPlaying = false;
      if (schedulerTimer) { clearInterval(schedulerTimer); schedulerTimer = null; }
      if (ctx && masterGain) {
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      }
    },

    setVolume(v) {
      volume = Math.max(0, Math.min(1, v));
      if (ctx && masterGain && isPlaying) {
        masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.2);
      }
    },

    // tiny helpers for game SFX — share the same context when possible
    playCorrectSfx() {
      const c = ensureContext(); if (!c) return;
      const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
      notes.forEach((f, i) => {
        const osc = c.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = c.createGain();
        const t = c.currentTime + i * 0.08;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(g); g.connect(c.destination);
        osc.start(t); osc.stop(t + 0.25);
      });
    },

    playWrongSfx() {
      const c = ensureContext(); if (!c) return;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, c.currentTime);
      osc.frequency.linearRampToValueAtTime(220, c.currentTime + 0.25);
      const g = c.createGain();
      g.gain.setValueAtTime(0.15, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
      osc.connect(g); g.connect(c.destination);
      osc.start(); osc.stop(c.currentTime + 0.35);
    },

    playTrophySfx() {
      const c = ensureContext(); if (!c) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        const osc = c.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = f;
        const g = c.createGain();
        const t = c.currentTime + i * 0.1;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.2, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(g); g.connect(c.destination);
        osc.start(t); osc.stop(t + 0.55);
      });
    },
  };

  window.MR = window.MR || {};
  window.MR.Music = Music;
})();
