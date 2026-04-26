/*!
 * settings.js — applies settings to the DOM (body classes, locale).
 * Thin wrapper so router/UI don't have to know about body classes.
 */
(function () {
  const S = window.MR.Storage;
  const Str = window.MR.Strings;

  function apply() {
    const s = S.getSettings();
    document.body.classList.toggle("calm-mode",     !!s.calmMode);
    document.body.classList.toggle("high-contrast", !!s.highContrast);
    if (s.locale && Str) Str.setLocale(s.locale);
  }

  function set(patch) {
    const next = S.setSettings(patch);
    apply();
    return next;
  }

  function toggleCalm()        { return set({ calmMode:     !S.getSettings().calmMode     }); }
  function toggleHighContrast(){ return set({ highContrast: !S.getSettings().highContrast }); }

  window.MR = window.MR || {};
  window.MR.Settings = { apply, set, toggleCalm, toggleHighContrast };
})();
