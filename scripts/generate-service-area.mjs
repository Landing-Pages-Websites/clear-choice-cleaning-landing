// Regenerates the SERVICE_AREA_ZIPS allowlist in src/lib/serviceArea.ts.
//
// Deterministic, offline-reproducible from a published ZIP-centroid dataset.
// It performs NO geocoding — it only filters known centroids by great-circle
// distance to Atlanta. The output is a plain string allowlist (no coordinates
// ship to the browser).
//
// Source dataset (U.S. Census ZCTA centroids, 2013), columns: ZIP,LAT,LNG
//   https://gist.github.com/erichurst/7882666
//
// Usage:
//   curl -sSL "https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377fd869e/US%20Zip%20Codes%20from%202013%20Government%20Data" -o zip-centroids.csv
//   node scripts/generate-service-area.mjs zip-centroids.csv
//
// Paste the printed array into SERVICE_AREA_ZIPS. Changing CENTER or RADIUS_MI
// changes the service area; keep them in sync with the comment in serviceArea.ts.

import fs from "node:fs";

const CENTER = [33.749, -84.388]; // Atlanta, GA
const RADIUS_MI = 40;
const EARTH_RADIUS_MI = 3958.7613;

const toRad = (deg) => (deg * Math.PI) / 180;

function haversineMiles(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(a));
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Usage: node scripts/generate-service-area.mjs <zip-centroids.csv>");
  process.exit(1);
}

const rows = fs.readFileSync(csvPath, "utf8").trim().split("\n").slice(1);
const inArea = [];
for (const row of rows) {
  const [zip, lat, lng] = row.split(",").map((s) => s.trim());
  if (!/^\d{5}$/.test(zip)) continue;
  if (haversineMiles(CENTER[0], CENTER[1], Number(lat), Number(lng)) <= RADIUS_MI) {
    inArea.push(zip);
  }
}
inArea.sort();

let out = "";
for (let i = 0; i < inArea.length; i += 10) {
  out += "  " + inArea.slice(i, i + 10).map((z) => `"${z}"`).join(", ") + ",\n";
}
console.error(`${inArea.length} ZCTAs within ${RADIUS_MI} mi of ${CENTER.join(", ")}`);
console.log(out);
