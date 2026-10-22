# eBay Fee Calculator 2026

A free, open-source calculator that shows what eBay takes from a sale and what you keep, using eBay's published US fee rates (checked October 2026).

**Use it here:** https://salonijain-svg.github.io/marketplace-fee-calculator/

## What it does

- Calculates eBay's final value fee by category (13.6% in most categories, plus category rates such as 15.3% for books and 6.7% for guitars)
- Adds the per-order fee ($0.30 on orders of $10 or less, $0.40 above)
- Calculates every fee on the item price, so you can see what you keep from the sale itself
- Optional Below Standard surcharge (eBay adds 6% to the final value fee)
- Compares the same sale on Etsy, Mercari and TrueGether

## How it's built

A single static `index.html` with plain HTML, CSS and JavaScript. No tracking, no dependencies, no build step.

## Accuracy

Rates come from each platform's own fee pages and were last checked in October 2026. The calculator doesn't include promoted listings, store subscriptions, optional upgrades or international fees. Fees change, so always confirm on the platform's own page before you price.

Spotted an out-of-date rate? Open an issue and it will be updated.
