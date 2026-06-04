# Contributing

This repository is the public marketing source for
[bitterpass.com](https://bitterpass.com/). Changes should preserve product
truth, search context, and the public/private boundary.

## Public Copy Checklist

- State BitterPass as an operator-approved credential authority for agent runs.
- Keep the CTA truth current: request access through BitterDesk, invited users
  open BitterPass Console, and login/signup bridge through Bitter account.
- Avoid public claims about plaintext custody, root-secret custody,
  zero-knowledge behavior, or recovery guarantees unless the proof packet is
  intentionally public.
- Keep detailed CLI commands, pairing steps, recovery material, and
  customer-specific onboarding out of this repo.

## Files To Update Together

When editing `app/pages/index.vue`, update:

- `public/index.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `qa/smoke.test.ts`
- `CHANGELOG.md`

When editing `app/pages/cli-setup.vue`, update:

- `public/cli-setup.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `qa/smoke.test.ts`
- `CHANGELOG.md`

When editing deployment claims, update `README.md`, `AGENTS.md`, and the
workcell verification scripts if expectations move.

## Verification

```bash
bun run qa:ops
bun run test:headers
bun test Scripts/write-health.test.ts
bun run generate
bun run qa:smoke
Scripts/workcell-prepare
```

Run live verification after a deployed release:

```bash
VERIFY_EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) Scripts/workcell-verify
```

Do not start a dev server unless the human asks for it. The smoke test starts a
local static server when no `PLAYWRIGHT_BASE_URL` is supplied.
