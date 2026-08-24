import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 03: Compatibility & Compliance Guard", () => {
  assert.match(source, /function CompatibilityGuard/);
  assert.match(source, /Fremdnummer/);
  assert.match(source, /Kombination technisch passend/);
  assert.match(source, /Prüfbasis/);
});
