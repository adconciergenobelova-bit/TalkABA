# Talk ABA — static HTML / CSS / JS site (+ optional PHP API)

Converted from the React + TypeScript + Vite project. No build step is needed to run it.

## Run it

Static only (everything saved in the browser, like the original demo):
```
python3 -m http.server 8080      # or any static host
```
With the PHP API (server-side quiz grading, real certificate verification, contact/newsletter capture):
```
php -S localhost:8080
```
Open http://localhost:8080. The site auto-detects the API (`api/health.php`); if it is missing it falls back to browser-only mode. Set `apiBase: null` in `js/config.js` to force browser-only mode.

## Structure
| Path | Purpose |
|---|---|
| `*.html` | One page each: index, courses, course (`?slug=`), learn (`?slug=`), dashboard, paths, philosophy, instructors, faq, checkout, verify, 404 |
| `js/data.js` | **Edit content here**: courses, quizzes, paths, instructors, FAQs, events, testimonials |
| `js/store.js` | Cart, enrolments, progress, wishlist (localStorage keys unchanged: `taa_user`, `taa_cart`, `taa_enroll`, `taa_wish`) + API client |
| `js/layout.js`, `js/ui.js` | Header, footer, cart drawer, sign-in modal, shared components |
| `js/pages/*.js` | Page logic |
| `css/styles.css` | Compiled stylesheet (committed, ready to deploy) |
| `src/input.css` | Stylesheet source (Tailwind v4 theme + custom CSS) |
| `api/*.php` | PHP 7.4+ endpoints; JSON-file storage in `api/data/` (web access blocked by `.htaccess`) |
| `tools/build-quizzes.cjs` | Rebuilds the server answer key `api/data/quizzes.json` from `js/data.js` |

## Changing styles
Class names in the HTML/JS are Tailwind utilities. After editing them, rebuild the CSS:
```
npm install
npm run build:css
```

## After editing quiz questions
```
node tools/build-quizzes.cjs
```

## Before going live
1. **Hide quiz answers.** `js/data.js` still contains each question's `answer` and `explain` so browser-only mode works. When the PHP API is deployed, delete those two fields from every quiz question in `data.js` (the server returns them after submission). Until then, anyone can read the answers in the page source.
2. **Payments are a demo.** `checkout.html` and the cart's "Enroll now" grant access without charging. Integrate a provider (e.g. Paystack or Flutterwave for NGN) and enrol only after server-side confirmation.
3. **Accounts are local.** "Sign in" only stores a profile in the browser. Enrolments/progress are per-device. Add real authentication + a database before relying on them.
4. **Email.** `api/contact.php` saves messages to `api/data/messages.json`; set `NOTIFY_EMAIL` in that file to also email them (needs working PHP `mail()`).
5. Placeholder content to replace: footer address (Fresno/Visalia CA), phone `(559) 555-0134`, email addresses at `talkaba.academy`, certificate signatories, the 404 for missing images `instructor-3.jpg` / `instructor-4.jpg` (initials are shown instead).
6. Make sure `api/data/` is writable by PHP (`chmod 755`/`775`).
