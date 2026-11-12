// Copies the built game into www/, the folder Capacitor packages into the iOS and Android apps.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), out = path.join(root, "www");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const f of ["index.html", "manifest.webmanifest", "privacy.html", "favicon.ico"]) fs.copyFileSync(path.join(root, f), path.join(out, f));
for (const d of ["fonts", "icons"]) fs.cpSync(path.join(root, d), path.join(out, d), { recursive: true });
console.log("www/ ready");
