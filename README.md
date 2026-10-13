# Marketplace Seller Fee Calculator

A small, dependency-free calculator that compares estimated seller fees and take-home pay on eBay, Etsy and TrueGether for a single US sale.

- **Live site:** https://salonijain-svg.github.io/marketplace-fee-calculator/
- **Rates and sources:** see `methodology.html` (last checked 2026-10-13)

## How it works
Plain HTML, CSS and vanilla JavaScript, no build step. All rates live in the `RATES` object at the top of `calc.js`, so updating a fee is a one-line change.

## Updating rates
1. Check each platform's official fee page (linked in `methodology.html`).
2. Update `RATES` in `calc.js` and the table in `methodology.html`.
3. Update the "last checked" dates in `index.html`, `methodology.html` and `sitemap.xml`.

Built by a member of the TrueGether team. Not affiliated with eBay or Etsy.
