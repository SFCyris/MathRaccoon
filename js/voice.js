/**
 * voice.js — SpeechSynthesis wrapper for read-aloud of hints, narration,
 * and feedback. Honors the user's "voiceOn" setting and quietly no-ops
 * if the browser doesn't support the API.
 */
(function () {
  const synth = window.speechSynthesis || null;
  let enabled = false;
  let voice = null;

  function pickVoice() {
    if (!synth) return null;
    const list = synth.getVoices();
    if (!list || !list.length) return null;
    // Prefer a friendly female en-* voice, fall back to anything en.
    const prefNames = [/samantha/i, /ava/i, /victoria/i, /karen/i, /tessa/i, /google.*us.*english/i];
    for (const re of prefNames) {
      const m = list.find((v) => re.test(v.name));
      if (m) return m;
    }
    return list.find((v) => /en/i.test(v.lang)) || list[0];
  }

  function ensureVoice() {
    if (!synth) return;
    if (!voice) voice = pickVoice();
    if (!voice && synth.addEventListener) {
      // Some browsers load voices async
      synth.addEventListener("voiceschanged", () => { voice = pickVoice(); }, { once: true });
    }
  }

  function strip(text) {
    if (!text) return "";
    return String(text).replace(/[🎉🎮🗺️🏔️🍪🥧🔢🧱💜🌲🪨🫐🧀📚🦉🦔✨🐶🐱🦊🦌🐻🌌🎪🤗🏆🎯💡🌈⭐🔥🙌]+/g, " ")
      .replace(/\s+/g, " ").trim();
  }

  const Voice = {
    isSupported() { return !!synth; },
    isOn() { return enabled && !!synth; },
    setEnabled(on) {
      enabled = !!on;
      if (!enabled) this.cancel();
      else ensureVoice();
    },
    speak(text, opts = {}) {
      if (!synth || !enabled) return;
      if (!text) return;
      const u = new SpeechSynthesisUtterance(strip(text));
      ensureVoice();
      if (voice) u.voice = voice;
      // Softer defaults: gentler pace, warm pitch, quieter volume.
      u.rate = opts.rate || 0.9;
      u.pitch = opts.pitch || 0.98;
      u.volume = opts.volume == null ? 0.65 : opts.volume;
      if (opts.replace) synth.cancel();
      synth.speak(u);
    },
    cancel() { if (synth) synth.cancel(); },
  };

  window.MR = window.MR || {};
  window.MR.Voice = Voice;
})();
