import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 10: Transparente Preisleiter", () => {
  assert.match(source, /function PriceLadder/);
  assert.match(source, /Staffelrabatt/);
  assert.match(source, /Zuschnitt/);
  assert.match(source, /Gesamt netto/);
});
