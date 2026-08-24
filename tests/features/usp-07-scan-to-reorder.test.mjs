import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 07: Scan-to-Reorder & Safe Successor", () => {
  assert.match(source, /function Reorder/);
  assert.match(source, /Betriebsmittelcode/);
  assert.match(source, /Sicherer Nachfolger/);
  assert.match(source, /Nachfolger übernehmen/);
});
