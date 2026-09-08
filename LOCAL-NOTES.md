# Local notes (NOT committed) — landing page pass 2026-09-08

Kept local per instruction: test locally, don't push half-baked "removed ai slop" commits to the
public repo. When these ship, fold them into ONE professional commit (see suggested message below).

## What changed in this pass (source is clean; verified on live `next dev` :8092)

1. **Removed every em-dash (—) from user-visible copy** across `app/page.tsx` and
   `app/privacy/page.tsx` (the "AI-written" tell). Replaced with periods / colons / commas so the
   sentences read like a person wrote them. Verified: `document.body.innerText.includes('—') === false`.
2. **Removed the decorative `// ── … — …` comment banners** from `app/page.tsx` and
   `app/globals.css` — those AI-style separators are visible to anyone browsing the public repo
   (sponsors, YC). Now plain comments. `grep -rn "—" app` → NONE.
3. **Fixed dead links in `app/blogs/page.tsx`**: nav + footer still pointed at `/#pricing` (removed
   section). Repointed to `/#early-access`, aligned nav/footer with the home + privacy pages
   (added Privacy policy + Journal to the blogs footer).

## Key diagnosis (why the user still sees the old bugs)

The bugs reported — white-on-white early-access input, invisible showcase text, the "table" — are
NOT in the current source. They are on the DEPLOYED site, which is stale at commit `744ccc6`.
The contrast/waitlist fixes landed locally in `24e7dcf` but `24e7dcf` was never pushed. Confirmed
via computed styles on the local build:
  - `.waitlist-form input[type=email]` → color rgb(21,22,20) on bg rgb(241,240,235)  ✅ readable
  - `.finding-card h3 / p / code` → dark ink on paper  ✅ readable
  - `document.querySelectorAll('table').length === 0`  ✅ no table

=> The visible-bug fixes are a DEPLOY, not new code. Deploy `24e7dcf` + this pass together.

## Suggested single professional commit message (when ready to push)

    landing: clean copy tone, fix stale journal links, align nav

    - rewrite hero/section copy to remove em-dash punctuation for a plainer voice
    - repoint /blogs nav + footer away from the retired pricing anchor to early access
    - align journal footer with home + privacy (privacy policy, journal)

## Still open on the landing page (next pass — needs the YC reference study)

- Hero "feel alive" upgrade + stronger early-access module, informed by a real read of the
  reference sites (trident, parameter, antigen, codeant, fabraix, mindfort, veria, ghosteye).
- Decide: keep the ASCII mascot hero or move to a product-shot / live-terminal hero like the
  reference set does.

## How to view locally

    cd /tmp/oxdroid.github.io && npx next dev -p 8092
    # then open http://127.0.0.1:8092/  (/, /privacy, /blogs all 200)
    # NOTE: the python http.server on :8091 serves a STALE out/ build — ignore it or rebuild.
