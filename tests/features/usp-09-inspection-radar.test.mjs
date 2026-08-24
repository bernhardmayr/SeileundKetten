import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 09: Prüffristen-Radar & Fremdmittelregister", () => {
  assert.match(source, /function InspectionRadar/);
  assert.match(source, /überfällig/);
  assert.match(source, /Fremdmittel erfassen/);
  assert.match(source, /Prüftermin/);
});
