# bitterpass-marketing

Marketing site for [bitterpass.com](https://bitterpass.com).

Static Nuxt 4 + Tailwind 4 site, deployed to Radicchio (Cloudflare Worker
edge).

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

Use the `bitter-browser` plugin to screenshot for design review:

```
BITTER_PLUGIN_REQUEST_FILE=/tmp/req.json /path/to/bitter-browser-plugin run
```

with a request payload like:

```json
{
  "schema_version": "bitter.plugin.request.v0",
  "invocation_id": "inv_review",
  "namespace": "browser",
  "operation": "browser.screenshot",
  "input": {
    "url": "http://127.0.0.1:8766/",
    "output_path": "/tmp/bitterpass.png",
    "width": 1440
  }
}
```

## Deploy

The site is wired to Radicchio site_id 93. Deploys go through the
Bitter MCP `radicchio_deploy` tool (or Factory's `provision_site`).

Manual deploy fallback (only if MCP path fails):

1. `npm run generate` to produce `.output/public/`.
2. Use Radicchio's deploy API directly with `radicchio.json` as the
   contract reference.
