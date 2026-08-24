import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 02: PhotoQuote", () => {
  assert.match(source, /function PhotoQuote/);
  assert.match(source, /type=\\"file\\"/);
  assert.match(source, /Voranalyse starten/);
  assert.match(source, /An Fachberatung senden/);
});
