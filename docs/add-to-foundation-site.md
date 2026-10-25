# Adding Project KLA to zhoueesleyfoundation.com

Instructions for a coding agent (Claude Code, Cursor, Codex, etc.) working in
the **Zhou & Eesley Family Foundation website repository**. Follow them in
order. The result:

- this page is served at **`https://www.zhoueesleyfoundation.com/programs/bangkok/projectkla/`**
- the existing Bangkok program post (`/programs/bangkok/`) links to it in two places

## Before you start

The foundation site is built with **Astro** and deployed on **Vercel**
(checked October 2026). Confirm that in the repo you're working in
(`astro.config.*`, `package.json`). If the site has moved to another framework,
the idea is the same: serve this repo's files unchanged as static files at
`/programs/bangkok/projectkla/`. Adjust step 1 to match.

You need two checkouts side by side:

```
projectkla/                 ← this repo (source of the page)
<foundation-site-repo>/     ← where you make the changes
```

## Step 1: copy the page into the site's `public/` folder

Astro serves everything in `public/` as-is at the same path, with no build
processing. Copy this repo's `index.html`, `schedule/` folder and `assets/` folder (and
nothing else) into it:

```bash
mkdir -p <foundation-site-repo>/public/programs/bangkok/projectkla
cp -R projectkla/index.html projectkla/schedule projectkla/assets <foundation-site-repo>/public/programs/bangkok/projectkla/
```

Rules:

- **Copy the files exactly; don't port them into Astro components.** The page
  is self-contained: React 18.3.1, a small runtime (`assets/js/dc-runtime.js`),
  fonts and images, all referenced by relative paths. Rewriting it as `.astro`
  files would break the runtime.
- **Don't copy** `README.md`, `docs/`, `AGENTS.md`, `CLAUDE.md`, `.git/`,
  `.vercel/` or `.env*`.
- **Check for a route clash.** Make sure nothing in `src/pages/` already
  produces `/programs/bangkok/projectkla`. Also check how `/programs/bangkok/`
  is generated: a content collection (e.g. `src/content/programs/bangkok.md`)
  or a dynamic route (`src/pages/programs/[slug].astro`) won't clash with a
  folder in `public/`.
- **Trailing slashes are handled.** A script at the top of `index.html` adds
  the trailing slash if the host strips it, so Astro's `trailingSlash` setting
  doesn't matter. Leave that script in place.

## Step 2: link to it from the Bangkok program post

The post's text lives in the site source. Search the repo for this sentence to
find the file (most likely a Markdown/MDX entry in a content collection, or a
data file feeding `src/pages/programs/[slug].astro`):

> Two partner schools are confirmed and more are expected.

Add **two** links, using the root-relative URL `/programs/bangkok/projectkla/`
(not an absolute URL, so it also works on preview deploys).

### Link A: a callout right after the lead paragraph

The post opens with a large italic lead paragraph that starts:

> Ten days of entrepreneurship teaching in Bangkok, December 14–23, 2026, for high school and college students…

Put a short call to action **directly after that paragraph, and before the first
body paragraph** ("The Foundation's first Thailand programming runs…"). Use this
text:

> **Co-host a workshop, sponsor the program, or join as a participant →** [Bangkok Program 2026](/programs/bangkok/projectkla/)

Where the lead paragraph is rendered by the page template rather than written
in the content file, add the callout in the template only when the program slug
is `bangkok`. Don't add it to other programs. Match the site's existing link
style; the closing "Get in touch →" link uses the `nav-link` class. Keep it
visually quiet: one line, no new colors.

### Link B: inline, in "What we know so far"

Under the heading **"What we know so far"**, change the first sentence from:

> Two partner schools are confirmed and more are expected.

to:

> Two partner schools are confirmed and more are expected. Schools and organizations that want to host a session can [co-host a workshop](/programs/bangkok/projectkla/).

Don't change any other wording in the post.

## Step 3: verify before you open a PR

1. Run the dev server (`npm run dev` or whatever the repo uses) and open
   `http://localhost:4321/programs/bangkok/projectkla/`. Check that:
   - the hero ("Bring hands-on AI and entrepreneurship education to your Bangkok community") renders with photos and the Chivo / EB Garamond fonts
   - the browser console shows no 404s for `assets/…` (404s for URLs containing `{{ … }}`, such as `{{ formSrc }}` or `{{ s.img }}`, are expected and harmless: they come from the raw template before the runtime renders it)
   - clicking **Schedule** in the nav opens `/programs/bangkok/projectkla/schedule/`, and its nav links lead back to the matching sections on the main page
   - the embedded Tally form appears in the "Co-host" section
2. Also open `/programs/bangkok/projectkla` (no trailing slash). It should
   load the same page, with the slash added to the address bar.
3. Open `/programs/bangkok/` and click both new links.
4. Run the production build (`npm run build`) and make sure
   `dist/programs/bangkok/projectkla/index.html` exists.
5. Open a pull request. The Vercel preview deploy is the final check; repeat
   steps 1–3 on the preview URL.

## Updating the page later

Changes to the page are made in **this repo** (`projectkla`). To publish an
update, repeat step 1 (overwrite the copied folder) and open a new PR on the
foundation site. Don't edit the copy in `public/` directly, or the two will
drift apart.

## Prompt to give your agent

From the foundation site repo, with `projectkla` cloned next to it:

```
Read ../projectkla/docs/add-to-foundation-site.md and follow it: add the
Project KLA page at /programs/bangkok/projectkla/ and link it from the
Bangkok program post in the two places it describes. Verify locally, then
open a PR.
```
