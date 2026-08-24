import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 04: Digitaler Produktpass", () => {
  assert.match(source, /function ProductPassport/);
  assert.match(source, /Nächste Prüfung/);
  assert.match(source, /Seriennummer/);
  assert.match(source, /Dokumentation vollständig/);
});
