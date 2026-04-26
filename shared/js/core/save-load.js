/*!
 * save-load.js — export/import a full Math Raccoon profile as a portable
 * JSON file. Lets a parent back up localStorage and move a child's progress
 * between browsers, devices, or after a cache wipe.
 *
 * The export bundles every `mathRaccoon::v2:*` key that exists. Import
 * replaces matching keys outright — this is intentional: a backup is a
 * snapshot, not a merge. The parent is in control.
 *
 * Format:
 *   {
 *     "app":          "MathRaccoon",
 *     "schemaVersion": 2,
 *     "exportedAt":   "2026-04-23T13:22:41.123Z",
 *     "playerName":   "Ava",
 *     "data": {
 *       "mathRaccoon::v2:settings":     { ... },
 *       "mathRaccoon::v2:progress":     { ... },
 *       "mathRaccoon::v2:achievements": [ ... ],
 *       ...
 *     }
 *   }
 */
(function () {
  const NS = "mathRaccoon::v2";
  // All keys we own under the v2 namespace. Keep in sync with storage.js.
  const KEYS = [
    `${NS}:schemaVersion`,
    `${NS}:settings`,
    `${NS}:progress`,
    `${NS}:achievements`,
    `${NS}:chapters`,
    `${NS}:journal`,
    `${NS}:critters`,
    `${NS}:friends`,
    `${NS}:daily`,
    `${NS}:admin`,
    `${NS}:dailyChallenge`,
    `${NS}:v1Imported`,
  ];

  function safeParse(raw) {
    try { return JSON.parse(raw); } catch (e) { return raw; }
  }

  // Build the export blob. Skips missing keys — don't pollute the file
  // with nulls that the importer would have to filter out.
  function buildExport() {
    const data = {};
    for (const key of KEYS) {
      const raw = localStorage.getItem(key);
      if (raw == null) continue;
      data[key] = safeParse(raw);
    }
    let playerName = "Player";
    try {
      const s = data[`${NS}:settings`];
      if (s && s.playerName) playerName = String(s.playerName);
    } catch (e) {}
    return {
      app: "MathRaccoon",
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      playerName,
      data,
    };
  }

  function sanitizeName(name) {
    return String(name || "player")
      .replace(/[^\w\-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "player";
  }

  function todayStamp() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  // Trigger a browser download for the export blob.
  function exportToFile() {
    const blob = buildExport();
    const json = JSON.stringify(blob, null, 2);
    const name = `math-raccoon-save-${sanitizeName(blob.playerName)}-${todayStamp()}.json`;
    const file = new Blob([json], { type: "application/json" });
    const url  = URL.createObjectURL(file);
    const a    = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    return { filename: name, keys: Object.keys(blob.data).length };
  }

  // Validate an imported file's shape. Returns { ok, reason, blob }.
  function validateBlob(raw) {
    if (!raw || typeof raw !== "object") {
      return { ok: false, reason: "File is empty or not JSON." };
    }
    if (raw.app !== "MathRaccoon") {
      return { ok: false, reason: "This file isn't a Math Raccoon save." };
    }
    if (!raw.data || typeof raw.data !== "object") {
      return { ok: false, reason: "Save file has no data block." };
    }
    // Only accept keys under our namespace — refuse to write anywhere else.
    const keys = Object.keys(raw.data);
    const bad = keys.filter((k) => !k.startsWith(`${NS}:`));
    if (bad.length) {
      return { ok: false, reason: `Save file contains foreign keys: ${bad.join(", ")}` };
    }
    if (!keys.length) {
      return { ok: false, reason: "Save file is empty." };
    }
    return { ok: true, blob: raw };
  }

  // Parse a File handle (from an <input type="file">) into a blob object,
  // validate it, and return the parsed save payload via the promise.
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        let parsed;
        try { parsed = JSON.parse(r.result); }
        catch (e) { reject(new Error("File isn't valid JSON.")); return; }
        const v = validateBlob(parsed);
        if (!v.ok) { reject(new Error(v.reason)); return; }
        resolve(v.blob);
      };
      r.onerror = () => reject(new Error("Could not read file."));
      r.readAsText(file);
    });
  }

  // Replace current localStorage with the supplied save blob. Returns a
  // summary so the caller can confirm to the parent what happened.
  function applyBlob(blob) {
    const data = blob.data || {};
    // Clear any existing keys we're about to replace (and any stale
    // keys not present in the import, so the profile is a true snapshot).
    let cleared = 0;
    for (const key of KEYS) {
      if (localStorage.getItem(key) != null) {
        localStorage.removeItem(key);
        cleared++;
      }
    }
    let written = 0;
    for (const [key, val] of Object.entries(data)) {
      if (!key.startsWith(`${NS}:`)) continue; // double-check
      try {
        localStorage.setItem(key, typeof val === "string" ? val : JSON.stringify(val));
        written++;
      } catch (e) { /* quota etc. */ }
    }
    return { cleared, written, playerName: blob.playerName || null };
  }

  // Convenience: read + apply + return summary.
  async function importFromFile(file) {
    const blob = await readFile(file);
    return applyBlob(blob);
  }

  window.MR = window.MR || {};
  window.MR.SaveLoad = {
    KEYS,
    buildExport,
    exportToFile,
    readFile,
    validateBlob,
    applyBlob,
    importFromFile,
  };
})();
