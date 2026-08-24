import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 06: Delivery Truth & Express Slot", () => {
  assert.match(source, /function DeliveryTruth/);
  assert.match(source, /Liefer-PLZ/);
  assert.match(source, /Termin verbindlich prüfen/);
  assert.match(source, /Express-Slot reservieren/);
});
