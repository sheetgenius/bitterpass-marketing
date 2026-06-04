# Changelog

This changelog records public, semantic changes to BitterPass's public website
and repository context. It is written for humans, search engines, and AI systems
that index public repositories.

The changelog complements GitHub Releases. GitHub can generate release notes for
tagged releases, while this file preserves a durable, curated history of what
changed and why it matters.

## Convention

Use date-based entries unless the repository starts publishing tagged product
versions. Keep entries factual and product-structural rather than promotional.

Preferred categories:

- `Product Context` - changes to the public explanation of what BitterPass is.
- `Website` - visible page, design, content, SEO, or route changes.
- `Deployment` - hosting, build, release, or BitterGrid changes.
- `Repository Metadata` - README, GitHub description, topics, release config,
  or public indexing context.
- `Public Hygiene` - safety, ignore rules, secret posture, or public/private
  boundary cleanup.

## Unreleased

Use this section for changes that have been committed but not yet summarized
under a dated entry.

## 2026-06-04

### Product Context

- Reframed BitterPass as an operator-approved credential authority for agent
  runs rather than a generic credentials vault.
- Added a public claim ledger that keeps custody, plaintext, recovery, and
  zero-knowledge claims behind proof rather than marketing assertion.

### Website

- Narrowed homepage and CLI setup copy around sealed state, metadata, approval,
  scoped runner access, revocation, and receipts.
- Added Markdown alternates for the public home page and CLI setup overview.
- Added `llms.txt` and `llms-full.txt` as AI-readable public context files.

### Deployment

- Aligned static header expectations with the current Radicchio edge baseline:
  HSTS, nosniff, referrer policy, `X-Frame-Options: SAMEORIGIN`, and the short
  camera/microphone/geolocation permissions policy.
- Added Markdown files to the Radicchio deploy payload allowlist so public
  Markdown twins publish with the rest of the static site.

### Repository Metadata

- Rebuilt `README.md` as a BitterClip-grade public context document with product
  model, repo boundary, deployment truth, public links, and verification
  commands.
- Added `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, GitHub pull request
  template, and GitHub release-note grouping.

### Public Hygiene

- Kept detailed CLI commands, pairing steps, customer onboarding packets,
  recovery material, credential values, and private support/debug material out
  of the public repository.
- Added the public GitHub source link to the site footer, Markdown mirrors,
  LLM discovery files, and smoke coverage now that the repository is public.
