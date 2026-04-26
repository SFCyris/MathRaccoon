/*!
 * strings.js — i18n-ready string lookup. MR.Strings.t("key", { ... }) →
 * looks up in the current locale table, falls back to the key itself.
 */
(function () {
  const tables = {};  // locale → { key: value }
  let currentLocale = "en";

  function get(locale, key) {
    const tbl = tables[locale];
    return tbl ? tbl[key] : undefined;
  }
  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
  }

  const Strings = {
    register(locale, table) {
      tables[locale] = { ...(tables[locale] || {}), ...table };
    },
    setLocale(locale) { currentLocale = locale; },
    getLocale() { return currentLocale; },
    t(key, vars) {
      const val = get(currentLocale, key) ?? get("en", key) ?? key;
      return interpolate(val, vars);
    },
  };

  window.MR = window.MR || {};
  window.MR.Strings = Strings;
})();
