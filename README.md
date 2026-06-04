# BitterPass

[BitterPass](https://bitterpass.com/) is an operator-approved credential
authority for teams whose agents touch production APIs, cloud consoles, billing
systems, and internal control planes.

It is built for environments where humans still approve access, while agent and
CLI runners need scoped material for one run, expiry and revocation, and
receipts that can be reviewed later.

## Place In Bitter

[Bitter](https://bitter.sh/) is an agent-operable software environment. It gives
AI agents persistent workspaces where repositories, credentials, hosting, email,
tests, deploys, logs, checks, and work history are connected.

BitterPass owns the credential-authority part of that environment:

- human operators approve access through the BitterPass console
- runner identities request scoped material for a bounded run
- credential lifecycle events leave receipts for later review
- Factory, BitterGrid, BitterHub, and marketing surfaces can link to that truth
  without becoming the authority

BitterPass is not a generic password manager, customer-data store, deployment
executor, account/billing layer, public recovery runbook, or marketing-site
login system.

## Product Model

The public product loop is:

```text
Operator -> Passkey Session -> Runner Identity -> Scoped Bundle -> Receipts -> Expiry/Revocation
```

The marketing claim is intentionally narrower than the private implementation
claim. Public copy may say that BitterPass is built around sealed state,
metadata, approval, scoped runner access, revocation, and audit receipts.
Claims about plaintext custody, root-secret custody, recovery material, or
zero-knowledge behavior require an approved private proof packet before they
are stated publicly.

Current public status:

- the public marketing surface is live at `bitterpass.com`
- access is private-launch and request-reviewed through BitterDesk
- login and signup bridge through Bitter account and BitterPass Console
- detailed CLI commands, pairing steps, and recovery material are
  invitation-gated

## Repository Role

This repository contains the public BitterPass marketing site at
[bitterpass.com](https://bitterpass.com/). The GitHub repository is public and
should remain safe to index.

This repository owns:

- the public marketing home page
- the public CLI setup overview page
- public product copy and metadata
- static Nuxt generation
- Radicchio deployment manifest and manual deploy helper
- public crawler and AI-readable files
- Markdown alternate content for public explanatory routes
- the `/up/` release identity payload
- public smoke tests and static-header expectations

It does not own the BitterPass console, API, passkey ceremonies, vault unlock,
credential values, pairing tokens, customer onboarding packets, private recovery
material, or private support/debug material. Those surfaces live outside this
public marketing repository.

## Links

- BitterPass website: [bitterpass.com](https://bitterpass.com/)
- CLI setup overview: [bitterpass.com/cli-setup](https://bitterpass.com/cli-setup/)
- Health/release identity: [bitterpass.com/up](https://bitterpass.com/up/)
- BitterPass Console: [app.bitterpass.com](https://app.bitterpass.com/)
- Support and access requests: [bitterdesk.com](https://bitterdesk.com/)
- Markdown page mirrors:
  [index.md](https://bitterpass.com/index.md),
  [cli-setup.md](https://bitterpass.com/cli-setup.md)
- AI crawler entry points:
  [llms.txt](https://bitterpass.com/llms.txt),
  [llms-full.txt](https://bitterpass.com/llms-full.txt)
- Public source:
  [github.com/sheetgenius/bitterpass-marketing](https://github.com/sheetgenius/bitterpass-marketing)
- Public change history: [CHANGELOG.md](CHANGELOG.md)
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security and public boundary: [SECURITY.md](SECURITY.md)
- Bitter: [bitter.sh](https://bitter.sh/)
- BitterGrid: [bittergrid.com](https://bittergrid.com/)

## Deployment

BitterPass's public marketing site is deployed on BitterGrid as the
`bitterpass.com` service and served as a Radicchio/static site.

Current verified state refreshed on 2026-06-04:

- service key: `bitterpass.com`
- GitHub source: `sheetgenius/bitterpass-marketing`
- release identity: `https://bitterpass.com/up/` is authoritative and should
  report matching `git_sha` and `release` values for the deployed commit
- deployment status: `ready`
- verification status: `passed`
- health path: `/up/`
- live health URL: `https://bitterpass.com/up/`
- deploy path: GitHub source event -> BitterGrid build/deploy -> Radicchio/static site
- Radicchio site id: `93`
- Radicchio hostname: `bitterpass.com`

Known deployment caveats:

- `Scripts/deploy` is a manual Radicchio fallback and requires
  `RADICCHIO_API_TOKEN`; it is not the observed current source-event deploy
  trigger.
- Radicchio serves the current edge security header baseline directly:
  `X-Frame-Options: SAMEORIGIN` and
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Radicchio currently serves Markdown files as static files and may not emit
  canonical HTTP `Link` headers from repo-local `_headers`.

## Development

```bash
bun install --frozen-lockfile
bun run generate
bun run qa:smoke
bun run test:headers
```

Useful commands:

- `bun run qa:ops` - validates the repo-owned ops manifest.
- `bun run generate` - writes static output to `.output/public`.
- `bun run qa:smoke` - runs the Playwright public-site smoke test.
- `bun run test:headers` - checks the checked-in Radicchio edge header baseline.
- `Scripts/radicchio plan` - shows the deployable static file payload.
- `Scripts/workcell-prepare` - validates and generates the source artifact.
- `Scripts/workcell-verify` - verifies the live public routes and release
  identity.

Do not start a development server unless the human asks for it. The smoke test
starts its own local static server when no `PLAYWRIGHT_BASE_URL` is supplied.

## Public Context

This repository is intentionally public. README text, page copy, metadata,
sitemap entries, Markdown alternates, and public links should preserve durable
context for humans, search engines, and AI systems that index public
repositories.

When a page claim changes, update the matching Markdown twin, `public/llms.txt`,
`public/llms-full.txt`, metadata, sitemap, smoke tests, and changelog in the
same change.
