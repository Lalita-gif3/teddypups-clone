# TeddyPups website clone

Assignment: a clone of https://puppy.instabizweb.com/, written from scratch in HTML, CSS and JavaScript.
No frameworks and no dependencies.

## Run locally

```powershell
node build.js
node serve.js
```

Then open http://localhost:4173

## Deploy (Vercel)

```powershell
npx vercel --prod
```

## Structure

| File | Purpose |
| --- | --- |
| `build.js` | Generates the pages into `dist/` |
| `src/data.js` | Puppies, photos, FAQ and contact details |
| `src/ui.js` | Header, footer, mascot and page shell |
| `src/pages.js` | Page templates |
| `src/styles.css` | Styling and responsive rules |
| `src/app.js` | Menu, filters, gallery, scroll effects, forms |

## Differences from the reference

- Photos, videos and the logo are linked from the reference site, not copied. If that site is offline, they will not load.
- The mascot and illustrations are redrawn, so they look similar but not identical. Animations are simpler.
- Enquiry forms open WhatsApp with the message filled in; there is no server.
- Pages carry `noindex` so the clone does not compete with the original in search.
