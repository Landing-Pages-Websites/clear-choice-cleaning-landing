// Deterministic unit tests for the Atlanta 40-mile service-area guard.
// Zero external deps — run with Node's built-in runner (Node strips the TS types):
//   node --test src/lib/serviceArea.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { isZipInServiceArea, SERVICE_AREA_MESSAGE } from "./serviceArea.ts";

test("required check: 30303 (downtown Atlanta) is IN area", () => {
  assert.equal(isZipInServiceArea("30303"), true);
});

test("required check: 30004 (Alpharetta, ~27mi) is IN area", () => {
  assert.equal(isZipInServiceArea("30004"), true);
});

test("required check: 60601 (Chicago) is OUT of area", () => {
  assert.equal(isZipInServiceArea("60601"), false);
});

test("fails closed on unknown 5-digit ZIP", () => {
  assert.equal(isZipInServiceArea("99999"), false);
});

test("fails closed on missing / empty / malformed ZIP", () => {
  assert.equal(isZipInServiceArea(""), false);
  assert.equal(isZipInServiceArea(null), false);
  assert.equal(isZipInServiceArea(undefined), false);
  assert.equal(isZipInServiceArea("300"), false); // too short
  assert.equal(isZipInServiceArea("300030"), false); // too long
  assert.equal(isZipInServiceArea("abcde"), false); // non-numeric
});

test("ignores surrounding whitespace/formatting but requires exactly 5 digits", () => {
  assert.equal(isZipInServiceArea(" 30303 "), true);
  assert.equal(isZipInServiceArea("30303-1234"), false); // ZIP+4 is not a 5-digit ZIP
});

test("fails closed on malformed input that embeds a valid ZIP (no digit-stripping)", () => {
  assert.equal(isZipInServiceArea("abc30303"), false); // letters must not be stripped away
  assert.equal(isZipInServiceArea("303-03"), false); // internal punctuation is not a 5-digit ZIP
  assert.equal(isZipInServiceArea("30303-1234"), false); // ZIP+4 must not normalize to 30303
  assert.equal(isZipInServiceArea(" 30303 "), true); // surrounding whitespace is still allowed
});

test("exposes the exact required out-of-area message", () => {
  assert.equal(
    SERVICE_AREA_MESSAGE,
    "Service is currently available within 40 miles of Atlanta, Georgia. Please enter a ZIP Code within our service area to continue.",
  );
});
