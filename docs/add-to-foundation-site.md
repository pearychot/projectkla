# Adding Project KLA to zhoueesleyfoundation.com

Instructions for a coding agent (Claude Code, Cursor, Codex, etc.) working in
the **Zhou & Eesley Family Foundation website repository**. Follow them in
order. The result:

- this page is served at **`https://www.zhoueesleyfoundation.com/programs/bangkok/projectkla/`**
- the existing Bangkok program post (`/programs/bangkok/`) links to it in two places
- the page **updates automatically** whenever the `projectkla` repo changes

## How it works

The page is deployed on its own from this repo to
**`https://projectkla.vercel.app`**. Every push to `projectkla`'s `main`
branch redeploys it within about a minute.

The foundation site doesn't store a copy of the page. A Vercel **rewrite**
serves `projectkla.vercel.app` at `/programs/bangkok/projectkla/`, under the
foundation's domain. The address bar keeps showing zhoueesleyfoundation.com.
Updates made in `projectkla` show up on the foundation site with no change to
the foundation repo. (pearchot.com/projectkla is served the same way.)

## Before you start

The foundation site is built with **Astro** and deployed on **Vercel**
(checked October 2026). Confirm that in the repo you're working in
(`astro.config.*`, `package.json`, the Vercel project). The rewrite below is a
Vercel feature. If the site is no longer on Vercel, use the equivalent
reverse-proxy rule on its host, or fall back to [copying the files](#fallback-copy-the-files-instead).

## Already copied the page into the site? Switch to the live link

An earlier version of these instructions copied `index.html`, `schedule/` and
`assets/` into the foundation repo. That copy is a snapshot and never updates.
If `public/programs/bangkok/projectkla/` exists:

1. **Delete that folder**, all of it:
   ```bash
   git rm -r public/programs/bangkok/projectkla
   ```
   This step is required: Vercel serves real files before it applies rewrites,
   so while the copy exists, the rewrite never runs and visitors keep seeing
   the old version.
2. Follow **Step 1** below to add the rewrite.
3. **Keep** the two links in the Bangkok post (Step 2). They already point to
   `/programs/bangkok/projectkla/` and don't change.
4. Verify with **Step 3**.

## Step 1: add the rewrite

Add these rules to `vercel.json` at the root of the foundation repo. Create the
file if it doesn't exist. If it exists, merge them into its `rewrites` array
(and `redirects`, see below) without removing anything already there.

```json
{
  "rewrites": [
    { "source": "/programs/bangkok/projectkla/", "destination": "https://projectkla.vercel.app/" },
    { "source": "/programs/bangkok/projectkla/:path*", "destination": "https://projectkla.vercel.app/:path*" }
  ]
}
```

- **Order matters:** keep the exact `/programs/bangkok/projectkla/` rule first.
- **Trailing slash:** the page's asset paths are relative, so the page must load
  at `/programs/bangkok/projectkla/` *with* the slash. The page has a script
  that adds a missing slash, but the browser may request a few files from the
  wrong path before that script runs. So:
  - If the site uses trailing slashes (the live site does: `/programs/bangkok/`),
    also add this redirect:
    ```json
    "redirects": [
      { "source": "/programs/bangkok/projectkla", "destination": "/programs/bangkok/projectkla/", "permanent": true }
    ]
    ```
  - If `astro.config.*` sets `trailingSlash: 'never'` or `vercel.json` sets
    `"trailingSlash": false`, **don't** add it: it would loop against the
    slash-stripping rule. Just verify the page still loads in Step 3.
- **Don't add the page's files to the foundation repo,** and don't port them
  into Astro components.

## Step 2: link to it from the Bangkok program post

*Skip this step if the links are already there.*

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

## Step 3: verify on the Vercel preview, then open a PR

Rewrites to another site only run on Vercel, **not in `npm run dev`**, so
check the result on the pull request's Vercel preview deploy:

1. Push a branch and open a pull request. Wait for the Vercel preview URL.
2. On the preview, open `/programs/bangkok/projectkla/` and check that:
   - the hero ("Bring hands-on AI and entrepreneurship education to your Bangkok community") renders with photos and the Chivo / EB Garamond fonts
   - it is the **current** version: on a phone-width screen, scrolling down
     bolds the matching nav link and slides the nav row along
   - the browser console shows no 404s for `assets/…` (404s for URLs containing `{{ … }}`, such as `{{ formSrc }}`, are expected and harmless: they come from the raw template before the runtime renders it)
   - clicking **Schedule** in the nav opens `/programs/bangkok/projectkla/schedule/`, and its nav links lead back to the main page
   - the embedded Tally form appears in the "Co-host" section
3. Open `/programs/bangkok/projectkla` (no trailing slash). It should land on
   the slash version and load the same page, with no redirect loop.
4. Open `/programs/bangkok/` and click both links.
5. Make sure the rest of the site still works: the home page and a couple of
   other program pages.
6. Merge.

If the preview shows the foundation site's 404 page at
`/programs/bangkok/projectkla/`, check that the copied folder is deleted and
that `vercel.json` is at the repo root. If rewrites still don't apply on this
setup, use the fallback below.

## Updating the page later

Nothing to do on the foundation site. Changes are made in the `projectkla` repo
(`main` branch), which redeploys `projectkla.vercel.app`, and the foundation
page shows the update within about a minute.

## Fallback: copy the files instead

Only if the rewrite can't be used. Astro serves everything in `public/` as-is,
so copy this repo's `index.html`, `schedule/` and `assets/` (and nothing else):

```bash
mkdir -p <foundation-site-repo>/public/programs/bangkok/projectkla
cp -R projectkla/index.html projectkla/schedule projectkla/assets <foundation-site-repo>/public/programs/bangkok/projectkla/
```

Don't copy `README.md`, `docs/`, `AGENTS.md`, `CLAUDE.md`, `.git/`, `.vercel/`
or `.env*`. With this approach, the page **doesn't update by itself**: every
change in `projectkla` needs the copy repeated (overwrite the folder) and a new
foundation-site deploy.

## Prompts to give your agent

From the foundation site repo, with `projectkla` cloned next to it
(`git pull` it first if you cloned it earlier).

**Setting it up for the first time:**

```
Read ../projectkla/docs/add-to-foundation-site.md and follow it: serve the
Project KLA page at /programs/bangkok/projectkla/ with the Vercel rewrite, and
link it from the Bangkok program post in the two places it describes. Verify
on the Vercel preview, then open a PR.
```

**Already copied the files in earlier:**

```
Read ../projectkla/docs/add-to-foundation-site.md and follow "Already copied
the page into the site? Switch to the live link": delete the copied
public/programs/bangkok/projectkla folder and add the Vercel rewrite so the
page updates automatically. Keep the existing links in the Bangkok post.
Verify on the Vercel preview, then open a PR.
```
