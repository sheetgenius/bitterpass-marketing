# BitterPass

BitterPass is an operator-approved credential authority for teams whose agents
touch production APIs, cloud consoles, billing systems, and internal control
planes.

It is built for environments where humans still approve access, while CLI and
MCP runners need scoped material for one run, expiry and revocation, and
receipts that can be reviewed later.

## Public Product Loop

```text
Operator -> Passkey Session -> Runner Identity -> Scoped Bundle -> Receipts -> Expiry/Revocation
```

The product contract is not "trust the marketing page." BitterPass is built
around sealed state, metadata, operator approval, scoped runner access,
revocation, and audit receipts. The approved onboarding path proves the custody
boundary before a runner receives production credential material.

## What BitterPass Replaces

- Agents inheriting credentials meant for a human shell.
- One service account with standing access to too many systems.
- Copied environment files and unauditable bot access.
- Recovery and credential lifecycle rules that no operator can inspect later.

## What Is Public During Private Launch

The public site explains the contract and the request path. Detailed CLI
commands, pairing steps, customer onboarding packets, recovery material, and
credential values are invitation-gated.

Request access through BitterDesk. Invited users open BitterPass Console at
`app.bitterpass.com`. Login and signup paths bridge through Bitter account
surfaces rather than a marketing-site account database.

## Boundaries

BitterPass is not a generic password manager, deployment executor,
account/billing layer, public recovery runbook, or marketing-site login system.

Public copy may state that BitterPass is built around sealed state, metadata,
approval, scoped runner access, revocation, and receipts. Claims about plaintext
custody, root-secret custody, recovery material, or zero-knowledge behavior
require an approved proof packet before they are stated publicly.

## Links

- HTML home: https://bitterpass.com/
- CLI setup overview: https://bitterpass.com/cli-setup/
- BitterPass Console: https://app.bitterpass.com/
- Access requests and support: https://bitterdesk.com/
- Health and release identity: https://bitterpass.com/up/
- AI crawler index: https://bitterpass.com/llms.txt
- Full AI context: https://bitterpass.com/llms-full.txt
- Public source: https://github.com/sheetgenius/bitterpass-marketing
