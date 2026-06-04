# AGENTS.md

## Scope

This repo owns the public marketing site for `bitterpass.com`.

The repository is public. Treat it as an indexable source artifact: avoid
private context, secrets, internal runbooks, provider payloads, customer data,
approved-customer onboarding packets, recovery material, and generated output.

The product console and credential authority live outside this repo. Use the
private BitterPass service surfaces for passkey ceremonies, vault unlock,
runner enrollment, credential values, pairing tokens, recovery material, and
customer-specific debugging.

The shared public marketing repository standard lives in Factory at
`docs/policy/public-marketing-repositories.md`.

## Product Boundary

Use this model when changing copy:

```text
Operator -> Passkey Session -> Runner Identity -> Scoped Bundle -> Receipts -> Expiry/Revocation
```

BitterPass is an operator-approved credential authority for agent runs. It is
not a generic password manager, deployment executor, account/billing layer,
public recovery runbook, or marketing-site login system.

Public claims must stay inside what the public site and source can support.
Do not claim zero-knowledge behavior, no-service-plaintext custody,
no-vendor-root custody, or recovery guarantees unless a current proof packet is
available and intentionally public.

Current CTA truth:

- request access through BitterDesk
- invited users open `app.bitterpass.com`
- login and signup pages bridge to Bitter account surfaces
- detailed CLI commands and pairing steps are invitation-gated

## Deployment Boundary

Current live deployment is Grid-managed and Radicchio/static:

- service key: `bitterpass.com`
- health path: `/up/`
- Radicchio site id: `93`
- publish directory: `.output/public`

Known caveats:

- The manual `Scripts/deploy` path requires `RADICCHIO_API_TOKEN` and is not the
  observed source-event deploy trigger.
- Radicchio currently serves the edge header baseline directly:
  `X-Frame-Options: SAMEORIGIN` and
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Radicchio may serve Markdown files as generic static content and may not emit
  canonical HTTP `Link` headers from repo-local `_headers`.

## Change Rules

When editing `app/pages/index.vue`, `app/pages/cli-setup.vue`, or metadata,
update these together:

- `public/index.md` or `public/cli-setup.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `qa/smoke.test.ts`
- `CHANGELOG.md`

Login and signup are noindex bridge routes. Keep their copy true to the live
Bitter account and console bridge.

Do not commit `.output`, `.nuxt`, `dist`, `test-results`, `playwright-report`,
`.env` files, private credentials, provider payloads, secret values, pairing
tokens, or customer-specific onboarding material.

## Commands

- Install dependencies: `bun install --frozen-lockfile`
- Generate static output: `bun run generate`
- Run ops manifest check: `bun run qa:ops`
- Run smoke tests: `bun run qa:smoke`
- Run static header test: `bun run test:headers`
- Show Radicchio payload: `Scripts/radicchio plan`
- Verify live public route: `Scripts/workcell-verify`

Do not start a dev server unless the human asks for it.
