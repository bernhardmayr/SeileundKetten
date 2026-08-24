import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 05: Lift Project Builder", () => {
  assert.match(source, /function ProjectBuilder/);
  assert.match(source, /Kompatibilitätsstatus/);
  assert.match(source, /Frühester Gesamttermin/);
  assert.match(source, /PDF-Angebot erzeugen/);
});
