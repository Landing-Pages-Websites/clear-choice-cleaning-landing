// Service-area guard: Clear Choice serves a 40-mile radius around Atlanta, GA.
//
// Method (auditable, deterministic, no runtime network/geocoding dependency):
//   1. Source: U.S. Census ZCTA population-weighted centroids (2013), the
//      widely-mirrored "US Zip Codes from 2013 Government Data" gist
//      (erichurst/7882666) — columns ZIP,LAT,LNG.
//   2. Center: Atlanta, GA at 33.7490, -84.3880.
//   3. Distance: great-circle (Haversine), Earth radius 3958.7613 mi.
//   4. Rule: include every ZCTA centroid whose distance <= 40 miles.
//   The resulting allowlist is frozen below. Regenerate deterministically with
//   scripts/generate-service-area.mjs (same source, center, radius) — see that
//   file for the exact command. 163 ZCTAs qualify.
//
// Spot checks baked into the tests: 30303 (downtown, ~0.3mi) and 30004
// (Alpharetta, ~27mi) are IN; 60601 (Chicago, ~590mi) is OUT.

const SERVICE_AREA_ZIPS: ReadonlySet<string> = new Set([
  "30002", "30004", "30005", "30008", "30009", "30011", "30012", "30013", "30014", "30016",
  "30017", "30019", "30021", "30022", "30024", "30028", "30030", "30032", "30033", "30034",
  "30035", "30038", "30039", "30040", "30041", "30043", "30044", "30045", "30046", "30047",
  "30052", "30054", "30058", "30060", "30062", "30064", "30066", "30067", "30068", "30070",
  "30071", "30072", "30075", "30076", "30078", "30079", "30080", "30082", "30083", "30084",
  "30087", "30088", "30092", "30093", "30094", "30096", "30097", "30101", "30102", "30106",
  "30114", "30115", "30116", "30120", "30121", "30122", "30126", "30127", "30132", "30134",
  "30135", "30137", "30141", "30144", "30152", "30157", "30168", "30179", "30180", "30185",
  "30187", "30188", "30189", "30205", "30213", "30214", "30215", "30223", "30224", "30228",
  "30233", "30234", "30236", "30238", "30248", "30250", "30252", "30253", "30259", "30260",
  "30263", "30265", "30268", "30269", "30273", "30274", "30275", "30276", "30277", "30281",
  "30284", "30288", "30289", "30290", "30291", "30294", "30296", "30297", "30303", "30305",
  "30306", "30307", "30308", "30309", "30310", "30311", "30312", "30313", "30314", "30315",
  "30316", "30317", "30318", "30319", "30322", "30324", "30326", "30327", "30328", "30329",
  "30331", "30332", "30334", "30336", "30337", "30338", "30339", "30340", "30341", "30342",
  "30344", "30345", "30346", "30349", "30350", "30354", "30360", "30363", "30518", "30519",
  "30620", "30655", "30656",
]);

// Exact copy required by the task. Rendered inline when a ZIP is out of area.
export const SERVICE_AREA_MESSAGE =
  "Service is currently available within 40 miles of Atlanta, Georgia. Please enter a ZIP Code within our service area to continue.";

// Fails CLOSED: anything that is not a known in-area 5-digit ZIP is rejected.
// Missing, malformed, or unknown ZIPs return false so we never accept a lead we
// cannot service.
export function isZipInServiceArea(zip: string | null | undefined): boolean {
  if (!zip) return false;
  const trimmed = zip.trim();
  if (!/^\d{5}$/.test(trimmed)) return false;
  return SERVICE_AREA_ZIPS.has(trimmed);
}
