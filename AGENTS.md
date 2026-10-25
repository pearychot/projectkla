# Agent notes

This repo is a self-contained static page (no build step). See `README.md` for layout.

If you've been asked to add this page to the Zhou & Eesley Family Foundation
website (zhoueesleyfoundation.com), follow
[`docs/add-to-foundation-site.md`](docs/add-to-foundation-site.md) exactly.

- The foundation site serves this page through a Vercel rewrite to `projectkla.vercel.app`, not a copy of the files. If it has a copied `public/programs/bangkok/projectkla/` folder, switch it to the rewrite as the doc describes.
- Don't port the pages into a framework. If you ever do copy them (the fallback), copy `index.html`, `schedule/` and `assets/` as-is.
- Phone layout lives in `assets/css/mobile.css`, keyed to `data-m` attributes in the markup.
- Keep asset paths relative; the page must work from any subfolder.
- `assets/js/dc-runtime.js` and `assets/js/react*.js` are vendored. Don't edit them.
