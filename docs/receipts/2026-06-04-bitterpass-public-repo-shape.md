# BitterPass Public Repo Shape Receipt - 2026-06-04

## Status

- Repo: `/Users/c3po/co/bitterpass-marketing`
- Remote: `sheetgenius/bitterpass-marketing`
- Status: `live-verified`
- Branch: `main`
- Final receipt commit: the commit containing this receipt.
- Source-shape commits:
  - `7cd8047b8ce5abb6117f344746bca3dcb03766be` - public repo shape and copy correction
  - `0b52c2c96728475236f9fd0e57f998258c5fafb7` - Markdown twins included in Radicchio payload
  - `40550909f597f8b7cbad73a8c82e841b38d9b921` - smoke test uses HTTP request checks for Markdown downloads
  - `9b9b272194c9c5a8860b3a1e9ea1c3efc732f98e` - workcell verifier tolerates Markdown line wraps

## Story Gate

- Product sentence: BitterPass is an operator-approved credential authority for
  teams whose agents touch production APIs, cloud consoles, billing systems,
  and internal control planes.
- User/job: operators and technical teams need human approval, scoped runner
  access, expiry/revocation, and receipts instead of broad standing secrets.
- Object loop:

  ```text
  Operator -> Passkey Session -> Runner Identity -> Scoped Bundle -> Receipts -> Expiry/Revocation
  ```

- Bitter role: BitterPass owns credential-authority truth for the Bitter
  constellation. Factory, BitterGrid, BitterHub, and marketing surfaces may link
  to that truth but do not become the authority.
- Boundary: this repo owns public marketing only. Console, API, passkey
  ceremonies, vault unlock, credential values, pairing tokens, recovery
  material, and customer onboarding packets live elsewhere.
- CTA truth: request access through BitterDesk; invited users open
  `app.bitterpass.com`; login/signup bridge through Bitter account surfaces.

## Claim Ledger

- Live-proven: `https://bitterpass.com/`, `/cli-setup/`, `/login`, `/signup`,
  `/up/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`,
  `/index.md`, and `/cli-setup.md` return 200 after deployment.
- Source-proven: static Nuxt/Radicchio site, ops manifest, public smoke tests,
  Markdown alternates, LLM files, repo-local README/AGENTS/CHANGELOG/
  CONTRIBUTING/SECURITY/GitHub metadata, and marketing-only boundary.
- Private/restricted: passkey ceremony details, vault unlock behavior,
  credential values, root-secret custody, recovery material, runner bundle
  issuance, and customer-specific onboarding packets.
- Removed or quarantined: zero-knowledge, no-service-plaintext,
  no-vendor-root-secret, and recovery guarantees unless backed by an approved
  public proof packet.

## Public Files Added Or Updated

- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/release.yml`
- `.github/pull_request_template.md`
- `public/index.md`
- `public/cli-setup.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `public/_headers`
- `nuxt.config.ts`
- `qa/smoke.test.ts`
- `Scripts/postdeploy-verify`
- `Scripts/radicchio`
- `Scripts/workcell-prepare`
- `Scripts/workcell-verify`

## Copy Improvement

Old weakness: the page described BitterPass as a credentials vault and included
public copy that could imply unproven plaintext, root-secret, recovery, or
zero-knowledge custody claims.

Sharper claim: BitterPass is an operator-approved credential authority. The
public contract is sealed state, metadata, approval, scoped runner access,
revocation, and receipts; approved onboarding proves the custody boundary
before production credential material reaches a runner.

## Deploy And Live Evidence

- Deploy executor: BitterGrid source-event deploy to Radicchio/static site.
- Grid service: `bitterpass.com`
- Grid service id: `23`
- Radicchio site id: `93`
- Health path: `/up/`
- Final verified release before receipt commit: `9b9b272194c9c5a8860b3a1e9ea1c3efc732f98e`
- Final Grid deployment before receipt commit: `2545`
- Final deploy operation before receipt commit: `13269`
- Final source check before receipt commit:
  remote, desired, and release all matched
  `9b9b272194c9c5a8860b3a1e9ea1c3efc732f98e`.
- Live `/up/` before receipt commit reported matching `git_sha` and `release`
  and `secret_material_returned: false`.

Verification commands passed before receipt commit:

```bash
bun run qa:ops
bun run test:headers
bun test Scripts/write-health.test.ts
bun run generate
bun run qa:smoke
Scripts/workcell-prepare
VERIFY_EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) Scripts/workcell-verify
VERIFY_BASE_URL=https://bitterpass.com EXPECTED_GIT_SHA=$(git rev-parse HEAD) Scripts/postdeploy-verify
```

Final live verification after the receipt commit should repeat the Grid wait,
source check, workcell verify, and postdeploy verify so `/up/` reports the
receipt commit itself.

## Reviewer And Grounding Notes

X-High findings used:

- The source/liveness reviewer confirmed `bitterpass.com` was Grid/Radicchio
  managed and live at `edb9a0b3c1107a550f05bc8cfdf87dfdf2c0c643` before this
  pass, but lacked `/index.md` and `/llms.txt`.
- The adversarial copy reviewer flagged zero-knowledge/no-service-plaintext and
  no-vendor-root style claims as not public-proven.
- The deploy-boundary critique caught that repo `_headers` was stricter than
  the current Radicchio edge baseline.

Opus 4.8 Max grounding review:

- Attempted through local Claude CLI with
  `claude --print --model claude-opus-4-8 --effort max --permission-mode plan`.
- The process produced no output for about one minute and was killed.
- Treat this pass as Opus-blocked, not Opus-reviewed.

## Caveats

- Radicchio serves `index.md` and `cli-setup.md` as
  `application/octet-stream`, so browser navigation treats them as downloads.
  Smoke tests verify Markdown via HTTP request checks.
- Radicchio does not currently emit canonical HTTP `Link` headers for Markdown
  alternates.
- The public repo must not claim custody or recovery guarantees beyond the
  public proof packet.

## Next-Repo Lesson

Do not trust a green local static build to prove public-file deployment. Check
the repo deploy helper payload, then verify live `llms` and Markdown files. For
Radicchio sites, expect Markdown content-type/download behavior unless the
platform is changed.
