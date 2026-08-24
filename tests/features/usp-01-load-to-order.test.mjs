import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../app/shop-app.tsx", import.meta.url), "utf8");

test("USP 01: Load-to-Order Wizard führt regelbasiert zur Empfehlung", () => {
  assert.match(source, /function WizardModal/);
  assert.match(source, /Lastgewicht in kg/);
  assert.match(source, /Anzahl tragender Stränge/);
  assert.match(source, /Maximaler Neigungswinkel/);
  assert.match(source, /Regelprüfung bestanden/);
  assert.match(source, /Sonderlastfälle.*fachlich geprüft/);
});
