// Marketplace seller fee calculator. Standard US rates, last checked 2026-10-13.
// Sources are listed on methodology.html.

const RATES = {
  ebay: {
    fvfRate: 0.136,        // most categories, on total sale up to $7,500
    fvfCap: 7500,
    fvfRateAbove: 0.0235,  // portion above $7,500
    orderFeeSmall: 0.30,   // order total $10.00 or less
    orderFeeLarge: 0.40    // order total over $10.00
  },
  etsy: {
    listing: 0.20,
    txnRate: 0.065,        // on item price + shipping (not sales tax, US)
    procRate: 0.03,        // US bank account, on gross incl. shipping + tax
    procFixed: 0.25
  },
  paypal: {
    checkout: { rate: 0.0349, fixed: 0.49 },
    gs:       { rate: 0.0299, fixed: 0 }
  }
};

const $ = (id) => document.getElementById(id);
const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2);
const pct = (n) => (Math.round(n * 1000) / 10).toFixed(1) + "%";
const num = (el) => Math.max(0, parseFloat(el.value) || 0);

function ebayFees(price, shipping, tax) {
  const total = price + shipping + tax;               // eBay includes shipping and sales tax
  const r = RATES.ebay;
  const fvf = Math.min(total, r.fvfCap) * r.fvfRate +
              Math.max(total - r.fvfCap, 0) * r.fvfRateAbove;
  const order = total <= 10 ? r.orderFeeSmall : r.orderFeeLarge;
  return { fvf, order, total: fvf + order };
}

function etsyFees(price, shipping, tax) {
  const r = RATES.etsy;
  const listing = r.listing;
  const txn = (price + shipping) * r.txnRate;
  const proc = (price + shipping + tax) * r.procRate + r.procFixed;
  return { listing, txn, proc, total: listing + txn + proc };
}

function trueGetherFees(price, shipping, tax, method) {
  const p = RATES.paypal[method];
  const proc = (price + shipping + tax) * p.rate + p.fixed;
  return { mkt: 0, proc, total: proc };
}

function fill(cardId, values, revenue) {
  const card = $(cardId);
  for (const [k, v] of Object.entries(values)) {
    const el = card.querySelector(`[data-k="${k}"]`);
    if (el) el.textContent = money(v);
  }
  const keep = Math.max(revenue - values.total, 0);
  card.querySelector('[data-k="keep"]').textContent = money(keep);
  card.querySelector('[data-k="pct"]').textContent = revenue > 0 ? pct(values.total / revenue) : "0%";
  card.querySelector('[data-k="bar"]').style.width = revenue > 0 ? (keep / revenue * 100) + "%" : "0%";
}

function update() {
  const price = num($("price"));
  const shipping = num($("shipping"));
  const tax = num($("tax"));
  const method = $("paypal").value;
  const revenue = price + shipping;                     // seller's revenue; tax is passed through

  fill("card-ebay", ebayFees(price, shipping, tax), revenue);
  fill("card-etsy", etsyFees(price, shipping, tax), revenue);
  fill("card-tg", trueGetherFees(price, shipping, tax, method), revenue);
}

$("price").addEventListener("input", (e) => {
  $("priceRange").value = Math.min(500, Math.max(1, num(e.target)));
  update();
});
$("priceRange").addEventListener("input", (e) => { $("price").value = e.target.value; update(); });
["shipping", "tax", "paypal"].forEach((id) => $(id).addEventListener("input", update));
update();
