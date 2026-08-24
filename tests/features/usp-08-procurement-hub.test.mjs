import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 08: Procurement Hub", () => {
  assert.match(source, /function ProcurementHub/);
  assert.match(source, /Offene Freigaben/);
  assert.match(source, /Freigaberegel/);
  assert.match(source, /CSV exportieren/);
});
