# Project KLA — Bangkok Program site

The landing page for the Zhou & Eesley Family Foundation's Bangkok program
(14–23 December 2026). It's a plain static site: no build step, no package
install, no external CDN. Every file it needs is in this repo.

Deployed from this repo's `main` branch to <https://projectkla.vercel.app>,
and served at <https://www.pearchot.com/projectkla> and
<https://www.zhoueesleyfoundation.com/programs/bangkok/projectkla/>. A push to
`main` updates all three within about a minute.

## Adding it to the Foundation website

The foundation site serves this page with a Vercel rewrite to
`projectkla.vercel.app` (no copy of the files), so it updates automatically.
Clone this repo next to the foundation site repo and give your coding agent
one of these prompts from inside the foundation site repo.

**First-time setup:**

```
Read ../projectkla/docs/add-to-foundation-site.md and follow it: serve the
Project KLA page at /programs/bangkok/projectkla/ with the Vercel rewrite, and
link it from the Bangkok program post in the two places it describes. Verify
on the Vercel preview, then open a PR.
```

**If the page's files were copied into the foundation site earlier** (the
original instructions did this; that copy never updates):

```
Read ../projectkla/docs/add-to-foundation-site.md and follow "Already copied
the page into the site? Switch to the live link": delete the copied
public/programs/bangkok/projectkla folder and add the Vercel rewrite so the
page updates automatically. Keep the existing links in the Bangkok post.
Verify on the Vercel preview, then open a PR.
```

[`docs/add-to-foundation-site.md`](docs/add-to-foundation-site.md) has the
rewrite rules, the exact spots in the post for the links, how to verify, and a
fallback of copying the files.

## Run it locally

Any static file server works. With Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` straight from disk
also works in most browsers, but a server is closer to production.)

## Deploy it on your own domain

All paths are relative, so the site works at a domain root
(`example.org/`) or in a subfolder (`example.org/bangkok/`).

- **Vercel**: import the repo, choose the "Other" framework preset, and leave
  the build command and output directory empty. Then add your domain under
  Project → Settings → Domains.
- **Netlify**: import the repo with no build command and `.` as the publish
  directory.
- **GitHub Pages**: Settings → Pages → deploy from the `main` branch, `/ (root)`.
- **Any web host**: upload `index.html`, `schedule/` and `assets/` as they are.

## What's in here

```
index.html                 main page: markup, styles, and page logic
schedule/index.html        program schedule page (linked from the nav)
assets/
  css/fonts.css            @font-face rules (Chivo, EB Garamond)
  css/mobile.css           phone layout (≤700px), keyed to data-m attributes
  fonts/                   self-hosted font files
  images/                  photos used on the page
  js/resources.js          maps image ids (res0…res19) to files in assets/images
  js/dc-runtime.js         renders the <x-dc> template in index.html (generated, don't edit)
  js/react*.js             React 18.3.1, loaded by the runtime
```

## Editing

- **Schedule**: edit `schedule/index.html`. The sessions are in the data near
  the bottom of the file.
- **Phone layout**: `assets/css/mobile.css`. Desktop styles are inline in the
  HTML; the phone rules override them below 700px.
- **Text, links, and FAQ**: edit `index.html`. The page content (workshops,
  team, FAQ, modules, schedule) lives in the `renderVals()` data near the
  bottom of the file, and the layout is the `<x-dc>` template above it.
- **Swapping a photo**: replace the file in `assets/images/` and keep the same
  name, or add a new file and update its entry in `assets/js/resources.js`.
- **Forms**: the sign-up and co-host forms are Tally embeds
  (`tally.so/embed/…`). Change the form ids in `index.html` to point at your
  own Tally forms.
