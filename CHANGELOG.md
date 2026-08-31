# Changelog

All notable changes to `@sakaniui/react` are documented here.

## 0.3.2

- **Fix: `@sakaniui/react/tokens.css` was never actually published.** The `exports` map pointed it at `./src/styles/tokens.css`, but `files: ["dist"]` only ever publishes the `dist` folder — so that path never existed in the installed package, and `import '@sakaniui/react/tokens.css'` (exactly as documented in the README) failed to resolve for every consumer. Without it, every component would have rendered completely unstyled: the CSS ships only the `var(--color-fg-default)` *references*, not the `:root { --color-fg-default: ... }` *definitions*. Fixed by copying `tokens.css` into `dist/` as part of the build and pointing the export there instead.

## 0.3.1

- Fix: `Combobox`'s `loading` prop (the panel's loading state) was declared on `ComboboxOption` instead of `ComboboxProps`, so passing it to `<Combobox loading />` as documented was a type error and the prop was unreachable in a type-checked consumer. Moved to `ComboboxProps`, where the component was already reading it from at runtime.

## 0.3.0

The library has grown substantially since the last published release —
five new categories of primitives and dozens of new blocks, all matching
their Figma source 1:1 and shipping with full light/dark support.

**New component categories:**
- **E-commerce** — Cart Item, Checkout Steps, Color Swatch, Price Display, Product Card, Product Gallery, Quantity Selector, Size Selector, Star Rating, Stock Status, Wishlist Button
- **Marketing** — Blog Blockquote, Blog Feature Text, Blog Image, Blog Listing Card, Blog Listing Featured Card, Featured Icon, First Page Heading, Job Listing, List, Location Dot, Marquee, Metric, Mobile Navigation Menu, Placeholder Logo, Profile Card, Rich Text Heading, Rich Text Paragraph, Section Heading, Sub Feature, Team Card

**New blocks:**
- **Authentication** — Email Verification, Forgot Password, Login, Reset Password, Sign Up, Two-Factor Authentication
- **Billing** — Add Card Form, Billing Address, Billing History, Current Plan, Payment Method
- **E-commerce** — Checkout Flow, Order Confirmation, Product Detail, Product Grid, Shopping Cart
- **Marketing** — Blog Listing, Careers, CTA Banner, FAQ, Feature Grid, Hero, Logo Cloud, Pricing Table, Team Section, Testimonial
- **Application** — Account Overview, Activity Log, App Header, Data Table + Toolbar, File Upload Panel, Form Modal, Inline CTA, Multistep Modal, Notification Panel, Onboarding Progress, Profile Settings, Section Footer

**Other:**
- `StarRating` gained a full `orientation` axis (horizontal / horizontal-reverse / vertical), shared between the E-commerce Product Detail block and Marketing's own Star Rating usage.
- Every component and block's Storybook Docs page now renders a real, written explanation (previously blank) — what it does, what it maps to in Figma, and key implementation notes, sourced from each component's own doc comments.
- The Storybook landing page now introduces the Sakani Design System itself instead of Storybook's generic default onboarding content.
- README's component/block inventory brought up to date with the actual library (114+ components, 41 blocks).

## 0.2.0

- Blocks are now published from a separate subpath, `@sakaniui/react/blocks`, kept out of the main `@sakaniui/react` entry point so importing them is a deliberate choice.
- Added Funnel and Heatmap charts.
- The library now auto-builds (`prepare` script) on install.

## 0.1.0

- First published release of `@sakaniui/react`.
