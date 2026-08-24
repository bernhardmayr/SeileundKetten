export type Product = {
  id: string;
  name: string;
  category: "Ketten" | "Seile" | "Hebebänder" | "Zubehör";
  subtitle: string;
  sku: string;
  aliases: string[];
  price: number;
  unit: string;
  stock: number;
  delivery: string;
  wll: string;
  standard: string;
  grade: string;
  accent: "orange" | "blue" | "steel" | "yellow";
  tags: string[];
  documents: string[];
};

export const products: Product[] = [
  {
    id: "ak-10-2",
    name: "2-Strang Anschlagkette GK10",
    category: "Ketten",
    subtitle: "Konfektioniert mit Verkürzungshaken und Sicherheitslasthaken",
    sku: "AK-GK10-10-2",
    aliases: ["VIP-2-10", "CS-8810", "PFE-1022"],
    price: 289,
    unit: "Stück",
    stock: 18,
    delivery: "Morgen, 27. Aug.",
    wll: "4.250 kg bei 0–45°",
    standard: "EN 818-4",
    grade: "Güteklasse 10",
    accent: "orange",
    tags: ["Bestseller", "Prüfzeugnis inklusive"],
    documents: ["Konformitätserklärung", "Prüfzeugnis 3.1", "Betriebsanleitung"],
  },
  {
    id: "ds-16",
    name: "Drahtseil 6x36 IWRC",
    category: "Seile",
    subtitle: "Verzinkt, weich, rechtsgängig – Zuschnitt nach Maß",
    sku: "DS-636-16-VZ",
    aliases: ["WR-636-16", "KANI-1636", "VOIGT-616"],
    price: 12.8,
    unit: "Meter",
    stock: 240,
    delivery: "Versand in 24 h",
    wll: "Mindestbruchkraft 157 kN",
    standard: "EN 12385-4",
    grade: "1960 N/mm²",
    accent: "steel",
    tags: ["Meterware", "Schnittkosten 8,90 €"],
    documents: ["Werkszeugnis 2.2", "Montagehinweis", "Pflegeanleitung"],
  },
  {
    id: "hb-3-4",
    name: "Hebeband 3 t / 4 m",
    category: "Hebebänder",
    subtitle: "Doppellagig mit verstärkten Endschlaufen",
    sku: "HB-3000-4",
    aliases: ["HB-G-34", "PEW-3004", "CS-SLING-3"],
    price: 42.5,
    unit: "Stück",
    stock: 46,
    delivery: "Morgen, 27. Aug.",
    wll: "3.000 kg direkt",
    standard: "EN 1492-1",
    grade: "Farbcode Gelb",
    accent: "yellow",
    tags: ["Sofort lieferbar", "QR-Produktpass"],
    documents: ["Konformitätserklärung", "Ablegekriterien", "Prüfprotokoll"],
  },
  {
    id: "rs-85",
    name: "Rundschlinge 8 t / 5 m",
    category: "Hebebänder",
    subtitle: "Endlos, hochfestes Polyester mit RFID-Transponder",
    sku: "RS-8000-5-RFID",
    aliases: ["RS-B-85", "DOLE-805", "CARL-8500"],
    price: 118,
    unit: "Stück",
    stock: 12,
    delivery: "Do., 28. Aug.",
    wll: "8.000 kg direkt",
    standard: "EN 1492-2",
    grade: "Farbcode Blau",
    accent: "blue",
    tags: ["RFID", "Prüffristenfähig"],
    documents: ["Konformitätserklärung", "RFID-Datenblatt", "Betriebsanleitung"],
  },
  {
    id: "sh-10",
    name: "Sicherheitslasthaken GK10",
    category: "Zubehör",
    subtitle: "Selbstverriegelnd, mit Ersatzteilset und Rückverfolgbarkeit",
    sku: "SLH-GK10-10",
    aliases: ["VAGH-10", "CS-HOOK-10", "PEW-HS10"],
    price: 87.9,
    unit: "Stück",
    stock: 31,
    delivery: "Morgen, 27. Aug.",
    wll: "4.000 kg",
    standard: "EN 1677-3",
    grade: "Güteklasse 10",
    accent: "orange",
    tags: ["Kompatibilitätsgeprüft", "Ersatzteile verfügbar"],
    documents: ["Einbauanleitung", "Konformitätserklärung", "Maßblatt"],
  },
  {
    id: "sp-m20",
    name: "Anschlagpunkt schweißbar M20",
    category: "Zubehör",
    subtitle: "360° drehbar, für dynamische Lastwechsel geeignet",
    sku: "AP-M20-2500",
    aliases: ["WAP-20", "VIP-RS-M20", "CS-AP20"],
    price: 64.5,
    unit: "Stück",
    stock: 8,
    delivery: "Fr., 29. Aug.",
    wll: "2.500 kg",
    standard: "EN 1677-1",
    grade: "100 % rissgeprüft",
    accent: "blue",
    tags: ["Drehbar", "Schweißanleitung inklusive"],
    documents: ["Schweißanweisung", "Prüfzertifikat", "CAD STEP"],
  },
];

export type UspKey =
  | "wizard"
  | "photo"
  | "compatibility"
  | "passport"
  | "project"
  | "delivery"
  | "reorder"
  | "procurement"
  | "inspection"
  | "pricing";

export const uspFeatures: Array<{
  key: UspKey;
  number: string;
  title: string;
  short: string;
  outcome: string;
}> = [
  { key: "wizard", number: "01", title: "Load-to-Order Wizard", short: "Von Last und Winkel zur geprüften Auswahl.", outcome: "Fehlbestellungen vermeiden" },
  { key: "photo", number: "02", title: "PhotoQuote", short: "Foto oder Skizze hochladen und Angebot vorbereiten.", outcome: "Anfrage in unter 2 Minuten" },
  { key: "compatibility", number: "03", title: "Compatibility Guard", short: "Bauteile, Normen und Einsatzzweck abgleichen.", outcome: "Nur passende Komponenten" },
  { key: "passport", number: "04", title: "Digitaler Produktpass", short: "Dokumente, Kennzeichnung und Historie an einem Ort.", outcome: "Lückenlose Nachweise" },
  { key: "project", number: "05", title: "Lift Project Builder", short: "Komplette Hebevorhaben als Stückliste planen.", outcome: "Ein Angebot statt Einzellisten" },
  { key: "delivery", number: "06", title: "Delivery Truth", short: "Belastbare Lieferzusage statt vager Verfügbarkeit.", outcome: "Termin vor Bestellung sicher" },
  { key: "reorder", number: "07", title: "Scan-to-Reorder", short: "Code eingeben, Artikel oder sicheren Nachfolger finden.", outcome: "Nachbestellen in Sekunden" },
  { key: "procurement", number: "08", title: "Procurement Hub", short: "Rollen, Budgets, Freigaben und Kostenstellen steuern.", outcome: "B2B-Prozess ohne Medienbruch" },
  { key: "inspection", number: "09", title: "Prüffristen-Radar", short: "Eigene und fremde Anschlagmittel termingerecht prüfen.", outcome: "Keine Prüfung übersehen" },
  { key: "pricing", number: "10", title: "Transparente Preisleiter", short: "Staffeln, Zuschnitt und Versand sofort nachvollziehen.", outcome: "Vollkosten vor dem Checkout" },
];

export const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
