# Security

## Public Boundary

This repository is public marketing source. Do not commit or paste:

- secrets, tokens, private keys, passphrases, seed material, or recovery codes
- credential values or decrypted vault material
- pairing tokens, invite tokens, session cookies, or passkey ceremony payloads
- customer-specific onboarding packets or support/debug data
- internal DNS, billing, mailbox, incident, or provider runbooks
- generated output from `.nuxt`, `.output`, `dist`, `test-results`, or
  `playwright-report`

The public site may describe BitterPass at the product-contract level. It must
not become the source for private setup commands, custody proofs, or recovery
material.

## Reporting

Report security-sensitive issues through the private Bitter support path or an
approved operator contact. Do not open a public GitHub issue containing secret
material, customer data, proof-of-exploit details, or reproduction artifacts
that expose credential state.

For public repository changes, keep reports limited to non-sensitive symptoms
and move private evidence to the approved support path.

## Claim Discipline

Treat custody and cryptography language as security-sensitive.

Public copy can state that BitterPass is built around sealed state, metadata,
operator approval, scoped runner access, revocation, and receipts. Public copy
must not claim zero-knowledge behavior, no-service-plaintext custody,
no-vendor-root custody, or recovery guarantees unless the proof packet is
current, reviewed, and intentionally public.
