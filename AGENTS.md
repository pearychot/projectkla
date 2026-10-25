# Agent notes

This repo is a self-contained static page (no build step). See `README.md` for layout.

If you've been asked to add this page to the Zhou & Eesley Family Foundation
website (zhoueesleyfoundation.com), follow
[`docs/add-to-foundation-site.md`](docs/add-to-foundation-site.md) exactly.

- Don't port the pages into a framework: copy `index.html`, `schedule/` and `assets/` as-is.
- Phone layout lives in `assets/css/mobile.css`, keyed to `data-m` attributes in the markup.
- Keep asset paths relative; the page must work from any subfolder.
- `assets/js/dc-runtime.js` and `assets/js/react*.js` are vendored. Don't edit them.
