## Summary

-

## Public Context Checklist

- [ ] README, public page copy, and repository metadata still describe BitterPass accurately.
- [ ] Product claims are factual and aligned with the live product.
- [ ] Custody, plaintext, recovery, and zero-knowledge claims are proof-backed or absent.
- [ ] Public/private boundaries remain clear.

## Web And Discovery Checklist

- [ ] Vue page changes have matching `public/*.md` Markdown twin updates.
- [ ] `public/llms.txt`, `public/llms-full.txt`, and `public/sitemap.xml` are current.
- [ ] Canonical and alternate links remain correct.
- [ ] Smoke tests cover changed public routes or files.

## Verification

- [ ] `bun run qa:ops`
- [ ] `bun run test:headers`
- [ ] `bun run generate`
- [ ] `bun run qa:smoke`

## Deployment Notes

-
