"use client";

import { useEffect, useMemo, useState } from "react";
import { euro, products, type Product, type UspKey, uspFeatures } from "./data";

type CartLine = { product: Product; quantity: number };
type Overlay = "wizard" | "product" | "cart" | UspKey | null;

const categories = ["Alle", "Ketten", "Seile", "Hebebänder", "Zubehör"] as const;

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function ProductSymbol({ accent }: { accent: Product["accent"] }) {
  return (
    <img className={`product-photo product-photo--${accent}`} src="/product-world.webp" alt="" />
  );
}

function Modal({ title, eyebrow, onClose, children, wide = false }: {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("no-scroll");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal ${wide ? "modal--wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id="modal-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Dialog schließen">×</button>
        </div>
        <div className="modal__body">{children}</div>
      </section>
    </div>
  );
}

export default function ShopApp() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Alle");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = category === "Alle" || product.category === category;
      const searchable = [product.name, product.sku, product.category, product.standard, ...product.aliases].join(" ").toLowerCase();
      return inCategory && (!term || searchable.includes(term));
    });
  }, [category, search]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) return current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line);
      return [...current, { product, quantity }];
    });
    notify(`${product.name} wurde vorgemerkt.`);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setOverlay("product");
  };

  const shareFilters = async () => {
    const url = new URL(window.location.href);
    if (search) url.searchParams.set("q", search); else url.searchParams.delete("q");
    if (category !== "Alle") url.searchParams.set("kategorie", category); else url.searchParams.delete("kategorie");
    window.history.replaceState({}, "", url);
    try { await navigator.clipboard.writeText(url.toString()); notify("Filter-Link wurde kopiert."); }
    catch { notify("Filter sind jetzt in der URL gespeichert."); }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <div className="service-bar">
        <span>Technische Beratung: +49 8654 600-120</span>
        <span><b>Heute bestellt:</b> Lagerware morgen bei Ihnen</span>
        <span>Prüfzeugnisse inklusive</span>
      </div>

      <header className="site-header">
        <div className="header-main wrap">
          <a className="logo" href="#top" aria-label="Seile und Ketten Startseite">
            <BrandMark />
            <span>SEILE <b>&</b> KETTEN<small>HEBETECHNIK, DIE PASST.</small></span>
          </a>
          <label className="site-search">
            <span className="sr-only">Produkte durchsuchen</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Artikel, Norm oder Fremdnummer suchen …" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="header-actions">
            <button type="button" onClick={() => notify("Beratungstermin für heute angefragt.")}><span>Beratung</span><b>Expertenkontakt</b></button>
            <button className="cart-button" type="button" onClick={() => setOverlay("cart")} aria-label={`Warenkorb mit ${cartCount} Artikeln`}>
              <span>Warenkorb</span><b>{cartCount ? `${cartCount} Artikel` : "Noch leer"}</b>{cartCount > 0 && <i>{cartCount}</i>}
            </button>
          </div>
        </div>
        <nav className="main-nav wrap" aria-label="Hauptnavigation">
          <a href="#sortiment">Produkte</a>
          <button type="button" onClick={() => setOverlay("wizard")}>Sicher auswählen</button>
          <a href="#usps">Digitale Services</a>
          <a href="#branchen">Branchenlösungen</a>
          <a href="#service">Prüfung & Service</a>
          <span className="nav-spacer" />
          <button className="nav-login" type="button" onClick={() => setOverlay("procurement")}>B2B-Konto</button>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__visual" aria-hidden="true">
            <img src="/product-world.webp" alt="" />
          </div>
          <div className="hero__shade" />
          <div className="wrap hero__content">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light">Sicher heben. Einfach beschaffen.</p>
              <h1>Das richtige Anschlagmittel.<br /><em>Beim ersten Versuch.</em></h1>
              <p>Geprüfte Produkte, nachvollziehbare Auswahl und ein Liefertermin, auf den Ihre Fertigung bauen kann.</p>
              <div className="hero__actions">
                <button className="button button--primary" type="button" onClick={() => setOverlay("wizard")}>Sicherheitsfinder starten</button>
                <button className="button button--ghost" type="button" onClick={() => setOverlay("photo")}>Foto oder Skizze senden</button>
              </div>
              <div className="hero__proof">
                <span><b>25.000+</b> geprüfte Varianten</span>
                <span><b>98,7 %</b> termingerecht</span>
                <span><b>24 h</b> Dokumentenzugriff</span>
              </div>
            </div>

            <QuickFinder onStart={() => setOverlay("wizard")} />
          </div>
        </section>

        <section className="assurance-strip" aria-label="Leistungsversprechen">
          <div className="wrap">
            <span><b>Passend geprüft</b><small>Regeln statt Bauchgefühl</small></span>
            <span><b>Lieferdatum verbindlich</b><small>Bestand und Fertigung live</small></span>
            <span><b>Dokumente am Produkt</b><small>Auch Jahre später verfügbar</small></span>
            <span><b>Persönlich erreichbar</b><small>Techniker statt Callcenter</small></span>
          </div>
        </section>

        <section className="catalog-section wrap" id="sortiment">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Direkt zum passenden Produkt</p><h2>Technisches Sortiment</h2></div>
            <p>Nach Anwendung geführt oder über Artikelnummer, Norm und Fremdnummer direkt gefunden.</p>
          </div>

          <div className="catalog-toolbar">
            <div className="chips" role="group" aria-label="Produktkategorien">
              {categories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <button className="text-button" type="button" onClick={shareFilters}>Filter teilen</button>
          </div>

          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.slice(0, showAllProducts ? undefined : 4).map((product) => (
                <ProductCard key={product.id} product={product} onOpen={() => openProduct(product)} onAdd={() => addToCart(product)} compared={compare.includes(product.id)} onCompare={() => setCompare((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : current.length < 3 ? [...current, product.id] : current)} />
              ))}
            </div>
          ) : (
            <div className="empty-state"><h3>Kein direkter Treffer</h3><p>Wir prüfen Fremdnummer, Foto oder technische Daten gern persönlich.</p><button className="button button--primary" type="button" onClick={() => setOverlay("photo")}>PhotoQuote starten</button></div>
          )}
          {filteredProducts.length > 4 && <button className="button button--secondary center-button" type="button" onClick={() => setShowAllProducts((value) => !value)}>{showAllProducts ? "Weniger anzeigen" : `Alle ${filteredProducts.length} Produkte anzeigen`}</button>}
        </section>

        <section className="decision-band" id="branchen">
          <div className="wrap decision-band__grid">
            <div><p className="eyebrow eyebrow--light">Nicht nur verkaufen. Verantwortung teilen.</p><h2>Technische Auswahl mit eingebautem Sicherheitsnetz.</h2></div>
            <p>Jede Empfehlung zeigt Tragfähigkeit, Einsatzgrenzen und Dokumente. Kritische Konfigurationen gehen automatisch in die Fachprüfung.</p>
            <button className="button button--light" type="button" onClick={() => setOverlay("compatibility")}>Kompatibilität prüfen</button>
          </div>
        </section>

        <section className="usp-section wrap" id="usps">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Der digitale Vorsprung</p><h2>Zehn Funktionen, die Arbeit abnehmen</h2></div>
            <p>Vom ersten Lastfall bis zur nächsten Prüfung bleibt der gesamte Vorgang nachvollziehbar.</p>
          </div>
          <div className="usp-grid">
            {uspFeatures.map((feature) => (
              <button type="button" className="usp-card" key={feature.key} onClick={() => setOverlay(feature.key)}>
                <span className="usp-card__number">{feature.number}</span>
                <span className="usp-card__body"><b>{feature.title}</b><small>{feature.short}</small></span>
                <span className="usp-card__arrow">↗</span>
                <em>{feature.outcome}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="service-section" id="service">
          <div className="wrap service-section__grid">
            <div className="service-section__copy"><p className="eyebrow">Lebenszyklus-Service</p><h2>Nach dem Kauf beginnt die Sicherheit.</h2><p>Prüftermine, Zertifikate, Nachbestellungen und sichere Nachfolger bleiben über den digitalen Produktpass erreichbar.</p><button className="button button--primary" type="button" onClick={() => setOverlay("inspection")}>Prüffristen-Radar öffnen</button></div>
            <div className="radar-preview" aria-hidden="true"><span className="radar-preview__ring"><i>14</i><small>Tage</small></span><div><b>3 Prüfungen stehen an</b><p>Wir erinnern 60 und 14 Tage vorher – für eigene und fremde Betriebsmittel.</p></div></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-grid">
          <div><a className="logo logo--light" href="#top"><BrandMark /><span>SEILE <b>&</b> KETTEN<small>HEBETECHNIK, DIE PASST.</small></span></a><p>Demo eines kundenfreundlichen B2B-Shops für Seile, Ketten und Hebetechnik.</p></div>
          <div><b>Sortiment</b><a href="#sortiment">Anschlagketten</a><a href="#sortiment">Drahtseile</a><a href="#sortiment">Hebebänder</a><a href="#sortiment">Zubehör</a></div>
          <div><b>Service</b><button type="button" onClick={() => setOverlay("photo")}>Angebot anfragen</button><button type="button" onClick={() => setOverlay("inspection")}>Prüfservice</button><button type="button" onClick={() => setOverlay("passport")}>Dokumente</button></div>
          <div><b>Kontakt</b><span>Mo–Fr, 7:00–18:00 Uhr</span><span>+49 8654 600-120</span><span>technik@seile-ketten.de</span></div>
        </div>
        <div className="wrap footer-bottom"><span>© 2026 Seile & Ketten</span><span>Impressum · Datenschutz · AGB · Barrierefreiheit</span></div>
      </footer>

      {toast && <div className="toast" role="status">{toast}</div>}
      {compare.length > 0 && <div className="compare-bar"><span><b>{compare.length}/3</b> Produkte im Vergleich</span><button type="button" onClick={() => notify("Vergleichsansicht wurde vorbereitet.")}>Jetzt vergleichen</button><button className="compare-bar__clear" type="button" onClick={() => setCompare([])} aria-label="Vergleich leeren">×</button></div>}

      {overlay === "wizard" && <WizardModal onClose={() => setOverlay(null)} onAdd={addToCart} />}
      {overlay === "product" && <ProductModal product={selectedProduct} onClose={() => setOverlay(null)} onAdd={() => addToCart(selectedProduct)} />}
      {overlay === "cart" && <CartModal cart={cart} total={cartTotal} onClose={() => setOverlay(null)} onChange={setCart} onDone={() => { setCart([]); setOverlay(null); notify("Bestellung wurde als Demo erfolgreich erfasst."); }} />}
      {overlay && !["wizard", "product", "cart"].includes(overlay) && <FeatureModal feature={overlay as UspKey} products={products} onClose={() => setOverlay(null)} onAdd={addToCart} notify={notify} />}
    </div>
  );
}

function QuickFinder({ onStart }: { onStart: () => void }) {
  const [load, setLoad] = useState("2500");
  const [application, setApplication] = useState("Heben");
  return (
    <aside className="quick-finder" aria-label="Schnellauswahl">
      <div className="quick-finder__head"><span>01</span><div><b>Was möchten Sie heben?</b><small>Drei Angaben bis zur Empfehlung</small></div></div>
      <label>Lastgewicht<div className="input-with-unit"><input inputMode="numeric" value={load} onChange={(event) => setLoad(event.target.value)} /><span>kg</span></div></label>
      <label>Anwendung<select value={application} onChange={(event) => setApplication(event.target.value)}><option>Heben</option><option>Zurren</option><option>Sichern</option><option>Ziehen</option></select></label>
      <button className="button button--primary button--full" type="button" onClick={onStart}>Auswahl fortsetzen <span>→</span></button>
      <p>Keine Registrierung · Ergebnis mit Sicherheitsnachweis</p>
    </aside>
  );
}

function ProductCard({ product, onOpen, onAdd, compared, onCompare }: { product: Product; onOpen: () => void; onAdd: () => void; compared: boolean; onCompare: () => void }) {
  return (
    <article className="product-card">
      <div className="product-card__media" onClick={onOpen}><ProductSymbol accent={product.accent} /><span className="availability">● {product.stock > 10 ? "Auf Lager" : "Nur noch wenige"}</span></div>
      <div className="product-card__body">
        <p className="product-card__sku">{product.sku}</p><h3><button type="button" onClick={onOpen}>{product.name}</button></h3><p>{product.subtitle}</p>
        <dl><div><dt>Tragfähigkeit</dt><dd>{product.wll}</dd></div><div><dt>Norm</dt><dd>{product.standard}</dd></div></dl>
        <div className="product-card__delivery"><span>Verbindlich lieferbar</span><b>{product.delivery}</b></div>
        <div className="product-card__foot"><div><small>ab</small><strong>{euro(product.price)}</strong><small> / {product.unit}</small></div><button className="add-button" type="button" onClick={onAdd} aria-label={`${product.name} in den Warenkorb`}>+</button></div>
        <label className="compare-check"><input type="checkbox" checked={compared} onChange={onCompare} /> Vergleichen</label>
      </div>
    </article>
  );
}

function WizardModal({ onClose, onAdd }: { onClose: () => void; onAdd: (product: Product) => void }) {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState(2500);
  const [legs, setLegs] = useState(2);
  const [angle, setAngle] = useState(45);
  const [environment, setEnvironment] = useState("Normal");
  const recommendation = weight <= 3000 && environment !== "Säure/Beize" ? products[0] : products[3];
  return (
    <Modal title="Load-to-Order Sicherheitsfinder" eyebrow={`Schritt ${step} von 3`} onClose={onClose} wide>
      <div className="progress"><i style={{ width: `${step * 33.33}%` }} /></div>
      {step === 1 && <div className="wizard-grid"><div><h3>Lastfall beschreiben</h3><p>Die Empfehlung berücksichtigt Last, Strangzahl und Neigungswinkel.</p></div><div className="form-stack"><label>Lastgewicht in kg<input type="number" min="1" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /></label><label>Anzahl tragender Stränge<select value={legs} onChange={(event) => setLegs(Number(event.target.value))}><option value="1">1 Strang</option><option value="2">2 Stränge</option><option value="4">4 Stränge</option></select></label><label>Maximaler Neigungswinkel<select value={angle} onChange={(event) => setAngle(Number(event.target.value))}><option value="0">0° direkt</option><option value="45">bis 45°</option><option value="60">45–60°</option></select></label></div></div>}
      {step === 2 && <div className="wizard-grid"><div><h3>Einsatzbedingungen</h3><p>Temperatur und Medien können die zulässige Tragfähigkeit reduzieren.</p></div><div className="choice-grid">{["Normal", "Außen / korrosiv", "Hitze über 200 °C", "Säure/Beize"].map((item) => <button className={environment === item ? "selected" : ""} type="button" key={item} onClick={() => setEnvironment(item)}>{item}<small>{item === "Säure/Beize" ? "Fachprüfung notwendig" : "regelbasiert prüfbar"}</small></button>)}</div></div>}
      {step === 3 && <div className="result-card"><div className="result-card__flag">✓ Regelprüfung bestanden</div><div className="result-card__main"><ProductSymbol accent={recommendation.accent} /><div><p className="eyebrow">Unsere Empfehlung</p><h3>{recommendation.name}</h3><p>{legs} Stränge · {angle}° · {environment}</p><dl><div><dt>Erforderliche Last</dt><dd>{weight.toLocaleString("de-DE")} kg</dd></div><div><dt>Zulässige WLL</dt><dd>{recommendation.wll}</dd></div><div><dt>Norm</dt><dd>{recommendation.standard}</dd></div></dl></div></div><div className="safety-note"><b>Wichtig:</b> Das Ergebnis ist eine Vorauswahl. Sonderlastfälle und kritische Umgebungen werden vor Freigabe fachlich geprüft.</div></div>}
      <div className="modal-actions"><button className="button button--secondary" type="button" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Abbrechen" : "Zurück"}</button>{step < 3 ? <button className="button button--primary" type="button" onClick={() => setStep(step + 1)}>Weiter</button> : <button className="button button--primary" type="button" onClick={() => { onAdd(recommendation); onClose(); }}>Empfehlung übernehmen</button>}</div>
    </Modal>
  );
}

function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  const [quantity, setQuantity] = useState(product.unit === "Meter" ? 10 : 1);
  return (
    <Modal title={product.name} eyebrow={`${product.category} · ${product.sku}`} onClose={onClose} wide>
      <div className="product-detail"><div className="product-detail__visual"><ProductSymbol accent={product.accent} />{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="product-detail__info"><p className="lead">{product.subtitle}</p><dl className="spec-list"><div><dt>Tragfähigkeit</dt><dd>{product.wll}</dd></div><div><dt>Norm</dt><dd>{product.standard}</dd></div><div><dt>Ausführung</dt><dd>{product.grade}</dd></div><div><dt>Bestand</dt><dd>{product.stock} {product.unit}</dd></div></dl><div className="document-list"><b>Dokumente inklusive</b>{product.documents.map((document) => <button type="button" key={document}>{document}<span>PDF</span></button>)}</div><div className="detail-buy"><div><small>Verbindliche Lieferung</small><b>{product.delivery}</b></div><label>Menge<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label><strong>{euro(product.price * quantity)}</strong><button className="button button--primary" type="button" onClick={() => { onAdd(); onClose(); }}>In den Warenkorb</button></div></div></div>
    </Modal>
  );
}

function CartModal({ cart, total, onClose, onChange, onDone }: { cart: CartLine[]; total: number; onClose: () => void; onChange: (cart: CartLine[]) => void; onDone: () => void }) {
  const [checkout, setCheckout] = useState(false);
  if (!cart.length) return <Modal title="Ihr Warenkorb" onClose={onClose}><div className="empty-state"><h3>Noch nichts vorgemerkt</h3><p>Starten Sie über die Suche oder den Sicherheitsfinder.</p><button className="button button--primary" type="button" onClick={onClose}>Zum Sortiment</button></div></Modal>;
  return <Modal title={checkout ? "Bestellung abschließen" : "Ihr Warenkorb"} eyebrow={checkout ? "One-Page-Checkout" : `${cart.length} Positionen`} onClose={onClose} wide>
    {!checkout ? <><div className="cart-lines">{cart.map((line) => <div key={line.product.id}><ProductSymbol accent={line.product.accent} /><div><b>{line.product.name}</b><small>{line.product.sku} · {line.product.delivery}</small></div><input aria-label={`Menge ${line.product.name}`} type="number" min="1" value={line.quantity} onChange={(event) => onChange(cart.map((item) => item.product.id === line.product.id ? { ...item, quantity: Number(event.target.value) } : item))} /><strong>{euro(line.product.price * line.quantity)}</strong><button type="button" aria-label={`${line.product.name} entfernen`} onClick={() => onChange(cart.filter((item) => item.product.id !== line.product.id))}>×</button></div>)}</div><div className="cart-summary"><span>Zwischensumme</span><b>{euro(total)}</b><span>Versand</span><b>Im nächsten Schritt</b><strong>Gesamt netto</strong><strong>{euro(total)}</strong></div><div className="modal-actions"><button className="button button--secondary" type="button" onClick={onClose}>Weiter einkaufen</button><button className="button button--primary" type="button" onClick={() => setCheckout(true)}>Zum Checkout</button></div></> : <CheckoutForm total={total} onBack={() => setCheckout(false)} onDone={onDone} />}
  </Modal>;
}

function CheckoutForm({ total, onBack, onDone }: { total: number; onBack: () => void; onDone: () => void }) {
  const [terms, setTerms] = useState(false);
  return <form onSubmit={(event) => { event.preventDefault(); if (terms) onDone(); }}><div className="checkout-grid"><div className="form-stack"><h3>Rechnungs- und Lieferdaten</h3><label>Firma<input required placeholder="Mustertechnik GmbH" /></label><div className="field-row"><label>Vorname<input required /></label><label>Nachname<input required /></label></div><label>E-Mail<input required type="email" /></label><div className="field-row field-row--address"><label>Straße und Hausnummer<input required /></label><label>PLZ<input required inputMode="numeric" /></label></div><label>Ort<input required /></label></div><div className="checkout-side"><h3>Zahlung und Termin</h3><label className="radio-card"><input type="radio" name="payment" defaultChecked /> Kauf auf Rechnung <small>Für geprüfte Geschäftskunden</small></label><label className="radio-card"><input type="radio" name="payment" /> Kreditkarte <small>Sofortige Bestätigung</small></label><div className="delivery-promise"><span>✓</span><div><small>Früheste Lieferung</small><b>Morgen, 27. August</b><p>Bestellung innerhalb von 02:14 h</p></div></div><div className="checkout-total"><span>Netto</span><b>{euro(total)}</b><span>zzgl. 19 % USt.</span><b>{euro(total * .19)}</b><strong>Gesamt</strong><strong>{euro(total * 1.19)}</strong></div></div></div><label className="terms"><input type="checkbox" checked={terms} onChange={(event) => setTerms(event.target.checked)} required /> Ich bestätige die AGB und habe die produktbezogenen Sicherheitshinweise zur Kenntnis genommen.</label><div className="modal-actions"><button className="button button--secondary" type="button" onClick={onBack}>Zurück</button><button className="button button--primary" type="submit" disabled={!terms}>Zahlungspflichtig bestellen</button></div></form>;
}

function FeatureModal({ feature, products: productList, onClose, onAdd, notify }: { feature: UspKey; products: Product[]; onClose: () => void; onAdd: (product: Product, quantity?: number) => void; notify: (message: string) => void }) {
  const meta = uspFeatures.find((item) => item.key === feature)!;
  return <Modal title={meta.title} eyebrow={`USP ${meta.number} · ${meta.outcome}`} onClose={onClose} wide><FeatureContent feature={feature} products={productList} onAdd={onAdd} notify={notify} onClose={onClose} /></Modal>;
}

function FeatureContent({ feature, products: productList, onAdd, notify, onClose }: { feature: UspKey; products: Product[]; onAdd: (product: Product, quantity?: number) => void; notify: (message: string) => void; onClose: () => void }) {
  if (feature === "photo") return <PhotoQuote notify={notify} />;
  if (feature === "compatibility") return <CompatibilityGuard />;
  if (feature === "passport") return <ProductPassport products={productList} />;
  if (feature === "project") return <ProjectBuilder products={productList} notify={notify} />;
  if (feature === "delivery") return <DeliveryTruth products={productList} />;
  if (feature === "reorder") return <Reorder products={productList} onAdd={(product) => { onAdd(product); onClose(); }} />;
  if (feature === "procurement") return <ProcurementHub notify={notify} />;
  if (feature === "inspection") return <InspectionRadar notify={notify} />;
  if (feature === "pricing") return <PriceLadder products={productList} onAdd={(product, quantity) => { onAdd(product, quantity); onClose(); }} />;
  return null;
}

function PhotoQuote({ notify }: { notify: (message: string) => void }) {
  const [file, setFile] = useState<string>(""); const [done, setDone] = useState(false);
  return <div className="feature-layout"><div><h3>Aus Foto wird eine strukturierte Anfrage</h3><p className="lead">Wir erkennen Produktart, Anschluss und sichtbare Kennzeichnungen. Fehlende Angaben werden gezielt abgefragt.</p><ol className="step-list"><li><b>Foto oder Datei</b><span>JPG, PNG oder PDF bis 20 MB</span></li><li><b>Automatische Voranalyse</b><span>Keine Sicherheitsfreigabe durch KI</span></li><li><b>Technische Prüfung</b><span>Angebot durch Fachperson</span></li></ol></div><div className="upload-panel">{!done ? <><label className="dropzone"><input type="file" accept="image/*,.pdf" onChange={(event) => setFile(event.target.files?.[0]?.name ?? "")} /><span>↑</span><b>{file || "Foto oder Skizze hier auswählen"}</b><small>Die Datei wird in dieser Demo nicht übertragen.</small></label><label>Kurze Beschreibung<textarea placeholder="Zum Beispiel: Ersatz für vorhandene 2-Strang-Kette, Last 2,5 t …" /></label><button className="button button--primary button--full" disabled={!file} type="button" onClick={() => setDone(true)}>Voranalyse starten</button></> : <div className="analysis-result"><span>✓</span><h3>Anfrage ist vorbereitet</h3><p>Erkannt: 2-Strang-Anschlagmittel, Hakenanschluss, Kennzeichnung teilweise lesbar.</p><dl><div><dt>Noch erforderlich</dt><dd>Lastgewicht, Länge, Neigungswinkel</dd></div><div><dt>Antwortzeit</dt><dd>ca. 45 Minuten</dd></div></dl><button className="button button--primary" type="button" onClick={() => notify("Demo-Anfrage wurde an die Fachberatung übergeben.")}>An Fachberatung senden</button></div>}</div></div>;
}

function CompatibilityGuard() {
  const [part, setPart] = useState("VIP-2-10"); const [component, setComponent] = useState("Sicherheitslasthaken GK10"); const [checked, setChecked] = useState(false);
  return <div className="feature-layout"><div><h3>Kompatibilität vor dem Kauf</h3><p className="lead">Fremdnummer, Güteklasse, Nenndicke und Anschluss werden gemeinsam geprüft.</p><div className="guard-rules"><span>✓ Güteklasse</span><span>✓ Abmessungen</span><span>✓ Tragfähigkeit</span><span>✓ Norm & Einsatz</span></div></div><div className="tool-panel"><label>Vorhandene Artikel- oder Fremdnummer<input value={part} onChange={(event) => { setPart(event.target.value); setChecked(false); }} /></label><label>Gewünschte Komponente<select value={component} onChange={(event) => { setComponent(event.target.value); setChecked(false); }}><option>Sicherheitslasthaken GK10</option><option>Verkürzungshaken GK10</option><option>Aufhängekopf 2-Strang</option></select></label><button className="button button--primary button--full" type="button" onClick={() => setChecked(true)}>Kombination prüfen</button>{checked && <div className="guard-result"><b>✓ Kombination technisch passend</b><p>{part} kann mit „{component}“ verwendet werden. Bolzen- und Sicherungssatz ist im Lieferumfang.</p><small>Prüfbasis: GK10 · Nenndicke 10 mm · EN 1677</small></div>}</div></div>;
}

function ProductPassport({ products: productList }: { products: Product[] }) {
  const [id, setId] = useState(productList[0].id); const product = productList.find((item) => item.id === id)!;
  return <div className="passport"><div className="passport__selector"><label>Betriebsmittel auswählen<select value={id} onChange={(event) => setId(event.target.value)}>{productList.slice(0, 4).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="qr-placeholder" aria-label="Demo QR-Code"><i /><i /><i /><i /><span>QR</span></div><small>Produktcode SK-{product.id.toUpperCase()}-2608</small></div><div className="passport__content"><span className="status-pill">● Aktiv · prüffähig</span><h3>{product.name}</h3><p>{product.sku} · Seriennummer 26-0815-1042</p><dl className="passport-stats"><div><dt>In Betrieb seit</dt><dd>12.03.2026</dd></div><div><dt>Nächste Prüfung</dt><dd>12.03.2027</dd></div><div><dt>Standort</dt><dd>Werk 2 · Halle B</dd></div></dl><div className="timeline"><div><i />Heute <b>Dokumentation vollständig</b></div><div><i />12.03.2026 <b>Erstprüfung bestanden</b></div><div><i />10.03.2026 <b>Ausgeliefert</b></div></div><div className="document-list">{product.documents.map((document) => <button type="button" key={document}>{document}<span>PDF</span></button>)}</div></div></div>;
}

function ProjectBuilder({ products: productList, notify }: { products: Product[]; notify: (message: string) => void }) {
  const [lines, setLines] = useState([{ id: productList[0].id, quantity: 2 }, { id: productList[4].id, quantity: 4 }]);
  const total = lines.reduce((sum, line) => sum + productList.find((item) => item.id === line.id)!.price * line.quantity, 0);
  return <div><div className="project-head"><div><h3>Projekt „Hallenträger Linie 4“</h3><p>Stückliste mit technischer Vollständigkeitsprüfung</p></div><span className="status-pill">✓ 2 Positionen geprüft</span></div><div className="project-table">{lines.map((line, index) => { const product = productList.find((item) => item.id === line.id)!; return <div key={`${line.id}-${index}`}><span>{index + 1}</span><select value={line.id} onChange={(event) => setLines(lines.map((item, itemIndex) => itemIndex === index ? { ...item, id: event.target.value } : item))}>{productList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><input aria-label="Menge" type="number" min="1" value={line.quantity} onChange={(event) => setLines(lines.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: Number(event.target.value) } : item))} /><b>{euro(product.price * line.quantity)}</b><button aria-label="Position entfernen" type="button" onClick={() => setLines(lines.filter((_, itemIndex) => itemIndex !== index))}>×</button></div>; })}</div><button className="text-button" type="button" onClick={() => setLines([...lines, { id: productList[2].id, quantity: 1 }])}>+ Position ergänzen</button><div className="project-summary"><div><span>Kompatibilitätsstatus</span><b>Keine Konflikte</b></div><div><span>Frühester Gesamttermin</span><b>29. August 2026</b></div><div><span>Projektpreis netto</span><strong>{euro(total)}</strong></div><button className="button button--primary" type="button" onClick={() => notify("PDF-Projektangebot wurde vorbereitet.")}>PDF-Angebot erzeugen</button></div></div>;
}

function DeliveryTruth({ products: productList }: { products: Product[] }) {
  const [postal, setPostal] = useState("83395"); const [id, setId] = useState(productList[0].id); const [checked, setChecked] = useState(false); const product = productList.find((item) => item.id === id)!;
  return <div className="feature-layout"><div><h3>Liefertermin mit Datenbasis</h3><p className="lead">Bestand, Zuschnitt, Fertigung und Transport werden zu einer belastbaren Zusage verbunden.</p><div className="delivery-chain"><span className="done">Bestand</span><span className="done">Prüfung</span><span className="done">Verpackung</span><span>Transport</span></div></div><div className="tool-panel"><label>Produkt<select value={id} onChange={(event) => { setId(event.target.value); setChecked(false); }}>{productList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Liefer-PLZ<input inputMode="numeric" value={postal} onChange={(event) => { setPostal(event.target.value); setChecked(false); }} /></label><button className="button button--primary button--full" type="button" onClick={() => setChecked(true)}>Termin verbindlich prüfen</button>{checked && <div className="delivery-result"><p>Lieferung nach {postal}</p><strong>{product.delivery}</strong><span>98,7 % Prognosesicherheit · Slot 06:00–12:00 Uhr</span><button type="button">Express-Slot reservieren (+ 24,00 €)</button></div>}</div></div>;
}

function Reorder({ products: productList, onAdd }: { products: Product[]; onAdd: (product: Product) => void }) {
  const [code, setCode] = useState("SK-AK-10-2-2024"); const [found, setFound] = useState(false); const product = productList[0];
  return <div className="feature-layout"><div><h3>Nachbestellen ohne Suchen</h3><p className="lead">QR-/RFID-Code scannen oder eingeben. Ist der Artikel abgekündigt, wird nur ein fachlich geprüfter Nachfolger angeboten.</p><div className="scan-visual"><span>⌗</span><i /><i /><i /><i /></div></div><div className="tool-panel"><label>Produkt- oder Betriebsmittelcode<input value={code} onChange={(event) => { setCode(event.target.value); setFound(false); }} /></label><button className="button button--primary button--full" type="button" onClick={() => setFound(true)}>Code prüfen</button>{found && <div className="reorder-result"><span className="status-pill">Sicherer Nachfolger</span><h3>{product.name}</h3><p>Der ursprüngliche Artikel wurde 2025 ersetzt. Anschluss, WLL und Norm sind kompatibel.</p><dl><div><dt>Alt</dt><dd>AK-GK8-10-2</dd></div><div><dt>Neu</dt><dd>{product.sku}</dd></div></dl><button className="button button--primary" type="button" onClick={() => onAdd(product)}>Nachfolger übernehmen</button></div>}</div></div>;
}

function ProcurementHub({ notify }: { notify: (message: string) => void }) {
  const [limit, setLimit] = useState(2500); const [approval, setApproval] = useState(true);
  return <div className="procurement"><div className="procurement__nav"><b>Mustertechnik GmbH</b><button className="active" type="button">Übersicht</button><button type="button">Bestellungen</button><button type="button">Projekte</button><button type="button">Prüfmittel</button><button type="button">Benutzer & Rollen</button></div><div className="procurement__main"><div className="dashboard-head"><div><p className="eyebrow">Beschaffung im August</p><h3>12.840,60 €</h3></div><button className="button button--secondary" type="button" onClick={() => notify("Bestelldaten wurden als CSV vorbereitet.")}>CSV exportieren</button></div><div className="dashboard-stats"><div><span>Offene Freigaben</span><b>3</b><small>4.180,00 €</small></div><div><span>Bestellungen unterwegs</span><b>7</b><small>Alle im Termin</small></div><div><span>Nächste Prüfungen</span><b>14</b><small>In 60 Tagen</small></div></div><div className="approval-rule"><div><h4>Freigaberegel „Standardbestellung“</h4><p>Kostenstelle 4711 · Einkäufer und Instandhaltung</p></div><label>Grenzwert<input type="number" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /><span>€</span></label><label className="switch"><input type="checkbox" checked={approval} onChange={(event) => setApproval(event.target.checked)} /><i />Freigabe aktiv</label></div><div className="approval-list"><div><span>BM</span><p><b>2-Strang Anschlagkette GK10 × 8</b><small>Bernhard Mayr · Kostenstelle 4711</small></p><strong>{euro(2312)}</strong><button type="button">Freigeben</button></div><div><span>SH</span><p><b>Hebeband 3 t / 4 m × 20</b><small>Sabine Huber · Kostenstelle 4711</small></p><strong>{euro(850)}</strong><button type="button">Freigeben</button></div></div></div></div>;
}

function InspectionRadar({ notify }: { notify: (message: string) => void }) {
  const [assets, setAssets] = useState([{ name: "Anschlagkette AK-1042", due: "In 14 Tagen", state: "soon" }, { name: "Rundschlinge RS-8814", due: "In 56 Tagen", state: "ok" }, { name: "Fremdmittel FM-2208", due: "Seit 4 Tagen überfällig", state: "late" }]);
  return <div className="inspection"><div className="inspection__head"><div><p className="eyebrow">Werk 2 · Halle B</p><h3>Prüfstatus Ihrer Betriebsmittel</h3></div><button className="button button--secondary" type="button" onClick={() => setAssets([...assets, { name: `Fremdmittel FM-${2210 + assets.length}`, due: "In 365 Tagen", state: "ok" }])}>+ Fremdmittel erfassen</button></div><div className="inspection__summary"><div><span className="ring ring--green">92<small>%</small></span><p><b>46 prüffähig</b><small>von 50 Betriebsmitteln</small></p></div><div><strong>1</strong><span>überfällig</span></div><div><strong>3</strong><span>in 60 Tagen</span></div><div><strong>46</strong><span>aktuell</span></div></div><div className="asset-list">{assets.map((asset, index) => <div key={`${asset.name}-${index}`}><span className={`asset-state asset-state--${asset.state}`} /><p><b>{asset.name}</b><small>Letzte Prüfung: 12.03.2026 · Standort Halle B</small></p><strong>{asset.due}</strong><button type="button" onClick={() => notify(`Prüftermin für ${asset.name} wurde angefragt.`)}>Termin</button></div>)}</div></div>;
}

function PriceLadder({ products: productList, onAdd }: { products: Product[]; onAdd: (product: Product, quantity: number) => void }) {
  const [id, setId] = useState(productList[1].id); const [quantity, setQuantity] = useState(25); const product = productList.find((item) => item.id === id)!; const discount = quantity >= 100 ? .12 : quantity >= 50 ? .08 : quantity >= 20 ? .04 : 0; const unitPrice = product.price * (1 - discount); const cut = product.unit === "Meter" ? 8.9 : 0; const freight = unitPrice * quantity >= 500 ? 0 : 18.5; const total = unitPrice * quantity + cut + freight;
  return <div className="feature-layout"><div><h3>Jeder Preisbestandteil sichtbar</h3><p className="lead">Staffeln, Zuschnitt, Verpackung und Versand werden vor der Bestellung ausgewiesen.</p><div className="ladder">{[[1, "Basispreis"], [20, "− 4 %"], [50, "− 8 %"], [100, "− 12 %"]].map(([amount, label]) => <div className={quantity >= Number(amount) ? "active" : ""} key={amount}><b>ab {amount}</b><span>{label}</span></div>)}</div></div><div className="tool-panel"><label>Produkt<select value={id} onChange={(event) => setId(event.target.value)}>{productList.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Menge in {product.unit}<input type="range" min="1" max="120" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /><output>{quantity} {product.unit}</output></label><div className="price-breakdown"><div><span>Stück-/Meterpreis</span><b>{euro(unitPrice)}</b></div><div><span>Staffelrabatt</span><b>− {Math.round(discount * 100)} %</b></div><div><span>Zuschnitt</span><b>{cut ? euro(cut) : "inklusive"}</b></div><div><span>Versand</span><b>{freight ? euro(freight) : "kostenfrei"}</b></div><strong>Gesamt netto</strong><strong>{euro(total)}</strong></div><button className="button button--primary button--full" type="button" onClick={() => onAdd(product, quantity)}>Menge übernehmen</button></div></div>;
}
