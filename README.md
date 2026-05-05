# bitterpass-marketing

Marketing site for [bitterpass.com](https://bitterpass.com).

Static Nuxt 4 + Tailwind 4 site. Production deploys are owned by BitterGrid;
`radicchio.json` remains the static publish contract and legacy Radicchio site
reference.

Do not make this repo the source of truth for local CLI onboarding. The
canonical private-launch setup guide lives in the Bitter repo:
<https://github.com/sheetgenius/bitter/blob/main/docs/guides/first-customer-setup.md>.
Marketing copy should summarize the path and point customers toward the
CLI-owned guide.

## Local development

```
npm install
npm run generate
```

Generated output lands in `.output/public/`.

For local preview, serve the static dir:

```
cd .output/public && python3 -m http.server 8766
```

Then visit `http://127.0.0.1:8766/`. Add `?theme=light` or `?theme=dark`
to override the system preference.

## Visual verification

Use the Bitter Browser CLI to screenshot the live or local surface:

```
bitter browser capabilities
bitter browser screenshot http://127.0.0.1:8766/ --allow-loopback --out screenshots/bitter-browser-desktop.png --width 1280 --height 900 --settle-ms 500
bitter browser screenshot http://127.0.0.1:8766/ --allow-loopback --out screenshots/bitter-browser-mobile.png --mobile --settle-ms 500
```

## Verification

The repo-owned verification contract lives in `ops/manifest.json`.

```
npm run qa:ops
npm run qa:smoke
```

## Deploy

The site is wired to BitterGrid source deploys from `main`.

- `Scripts/deploy` builds and publishes the static Radicchio artifact.
- `Scripts/postdeploy-verify` reads `ops/manifest.json`, checks the live home
  page, CLI setup page, and `/up/`, then runs the Playwright smoke suite against
  `VERIFY_BASE_URL`.
- `Scripts/housekeeping` only removes repo-local generated artifacts declared
  as ephemeral in the ops manifest.

Manual deploy fallback (only if MCP path fails):

1. `npm run generate` to produce `.output/public/`.
2. Use Radicchio's deploy API directly with `radicchio.json` as the
   contract reference.

This repo is the marketing surface only. The credential service and API live at
`app.bitterpass.com` and `api.bitterpass.com`; do not place service secrets,
crypto custody internals, pairing tokens, or approved-customer material here.
