const fs = require("fs");
const path = require("path");

const distPath = path.join(__dirname, "..", "..", "dist","app", "index.html");
if (!fs.existsSync(distPath)) {
  console.error("dist/index.html not found. Did you run the web build?");
  process.exit(1);
}
let html = fs.readFileSync(distPath, "utf8");
html = html.replace(
  /src="\/_expo\/static\//g,
  'src="/cosmoTask/app/_expo/static/'
);
fs.writeFileSync(distPath, html);
console.log("Patched index.html asset paths for GitHub Pages.");
