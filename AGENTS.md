# Project guidance

## Public-facing copy
- Do not add demo, prototype, collection/import/migration notices, badges, watermarks, or development-only explanatory copy to any page, metadata, toast, dialog, or downloadable user-facing material.
- Keep provenance and implementation limitations in internal documentation, not visitor-facing copy.
- Removing these labels does not implement authentication, persistence, payments, or messaging; do not report such functionality as production-ready without verification.

## Original KOWSC content
- The user confirmed ownership of http://www.kowsc.co.kr/ and authorized full-content migration for this renewal.
- Preserve original wording, order, line breaks and body media. Do not replace source content with summaries or generic metadata descriptions. Keep the current project design.
- Original snapshots and asset failures are recorded under docs/research/kowsc; regenerate with scripts/import-kowsc-content.py.

## Git workflow (shared `main`, two people)
- Before any work: run `git status`; commit anything pending, then `git pull --rebase origin main`. Resolve conflicts and `git rebase --continue`. Push with `git push origin main`.
- Never use `git push --force` (or `--force-with-lease`) on `main`. It discards the other person's commits and the loss goes live immediately.
- If the push is rejected and the rebase is hard to resolve, push to a new branch instead (`git push origin HEAD:<your-name>-work`) and hand it over for merging.
- Every push to `main` is deployed automatically to production (https://koreasports-silk.vercel.app). Run `npm ci && npm test` (all tests must pass) and `php -l` on changed PHP files before pushing.

## Deployment (Vercel, vercel-php runtime)
- `api/index.php` is the front controller and only serves entry points listed in it. When you add a new root or `admin/` PHP entry point, add it to that list too; otherwise the page 404s on Vercel while working locally.
- Vercel does not run a build. Committed files are served as they are.

## Generated files — edit the source, then regenerate and commit the output
- Colors and design tokens: edit `assets/design-system/tokens.json` only, then run `python scripts/build-design-tokens.py`. Do not hand-edit `assets/css/tokens.css` or `assets/js/design-system/tokens.js`; tests check that they match the JSON.
- Rich editor: after changing `assets/js/editor/`, run `npm run build` and commit `assets/js/generated/`.

## Records
- Append a short entry for each piece of work to the bottom of `docs/qa.md` (what changed, how it was checked). Update `docs/sitemap.md` when menus or URLs change.
- Personal data: the resident registration number and passport number entered on the 선수등록 form must never be stored anywhere (see `docs/qa.md`); keep that guarantee when touching the form or repository code.

## Related project
- The green comparison version lives in a separate repository (`planderdev/koreasports-2`, https://koreasports-2.vercel.app). It is not connected to this one; do not try to sync it from here.
