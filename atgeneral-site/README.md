# atgeneral marketing site

Static site for atgeneral — no build step, plain HTML/CSS/JS.

## Files

- `index.html` — the page
- `styles.css` — all styling
- `script.js` — mobile nav + contact form submission
- `favicon.svg` — browser tab icon
- `vercel.json` — clean URLs + basic security headers
- `robots.txt`

## Contact form

The form posts to [FormSubmit](https://formsubmit.co), a free forwarding
service — no backend or API key needed. It's already set to deliver to
**adeebnacero@gmail.com**.

**One-time step:** the first time the form is submitted after going live,
FormSubmit sends a confirmation email to adeebnacero@gmail.com — click the
activation link in it once, and every submission after that lands directly
in the inbox. Until that link is clicked, the form will error out.

If you'd rather change the destination address, edit `CONTACT_EMAIL` near
the top of `script.js`.

## Deploy to Vercel

**Option A — Vercel dashboard (easiest):**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Framework preset: choose **Other** (it's a static site, no build command needed).
4. Click Deploy — you'll get a `*.vercel.app` URL immediately.
5. Optional: add a custom domain under Project Settings → Domains.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
cd atgeneral-site
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

## Local preview

No build tools needed — just serve the folder:
```bash
npx serve .
# or
python3 -m http.server 8080
```
