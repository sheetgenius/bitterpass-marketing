<script setup lang="ts">
useSeoMeta({
  title: 'BitterPass — Operator-approved credentials for agents',
  description:
    'BitterPass is an operator-approved credential authority for teams whose agents touch production APIs, cloud consoles, billing systems, and internal control planes.',
})

const tumblerCount = 24
const tumblers = Array.from({ length: tumblerCount }, (_, i) => ({
  rotation: (360 / tumblerCount) * i,
}))

const proofPoints = [
  {
    label: 'Human approval',
    body: 'Passkeys gate the operator surface. No shared password. No magic link.',
  },
  {
    label: 'Runner isolation',
    body: 'Each runner uses its own Ed25519 identity and receives one scoped bundle per run.',
  },
  {
    label: 'Replayable receipts',
    body: 'Approvals, scoped pulls, expiry, and revocation leave receipts an operator can review later.',
  },
]

const failureModes = [
  'Agents inherit credentials that were meant for a human at a shell.',
  'One service account ends up with standing access to too many systems.',
  'There is no durable record of which agent saw which secret, and when.',
  'Recovery rules are unclear enough that the operator cannot prove what they hold.',
]

const contract = [
  {
    label: 'Operator in the loop',
    body:
      'BitterPass is for environments where a human still needs to approve access, even if an agent does the work afterward.',
  },
  {
    label: 'Scoped machine access',
    body:
      'A runner receives the material for that run, not a permanent token that quietly becomes infrastructure.',
  },
  {
    label: 'Custody proof before use',
    body:
      'The public contract is sealed state, metadata, and audit. Approved onboarding must prove which material stays operator-held before a runner uses it.',
  },
]

const flow = [
  {
    index: '01',
    title: 'Operator unlocks with a passkey.',
    body:
      'WebAuthn gates the human console. A successful ceremony returns an HttpOnly session and nothing reusable in a URL.',
  },
  {
    index: '02',
    title: 'The custody boundary is proven before use.',
    body:
      'Public marketing keeps the claim narrow: BitterPass is built around sealed state, metadata, and audit. The approved onboarding path proves which material is operator-held before any runner receives a bundle.',
  },
  {
    index: '03',
    title: 'A runner gets one scoped bundle.',
    body:
      'A runner authenticates with its own Ed25519 identity and receives only what that run should see.',
  },
]

const surfaces = [
  {
    label: 'Operator console',
    body: 'Passkey auth, pairing approval, audit review, and metadata-only visibility.',
  },
  {
    label: 'Runner surface',
    body: 'Signed requests from enrolled runner identities instead of a shared bearer token.',
  },
  {
    label: 'Service posture',
    body: 'Sealed state, metadata, audit receipts, and an onboarding proof for what the service can and cannot hold.',
  },
]

const inside = [
  { label: 'Envelope', value: 'XChaCha20-Poly1305 with per-record nonce' },
  { label: 'Key derivation', value: 'Argon2id over the master secret + per-vault salt' },
  { label: 'Runner identity', value: 'Ed25519 keypair, signed request envelopes' },
  { label: 'Human gateway', value: 'WebAuthn passkey, no shared password or email login' },
  { label: 'Storage shape', value: 'Two-phase atomic mirror writes with no silent partial state' },
  { label: 'Audit', value: 'Append-only chain, hash-linked, locally first and mirrored second' },
  { label: 'Recovery', value: 'Operator-held recovery material is invitation-gated, not published in marketing' },
  { label: 'Hosting', value: 'Marketing root is Grid-managed Radicchio; console and API live on separate BitterPass surfaces' },
]

const audiences = [
  {
    eyebrow: 'Agent operator',
    title: 'Your automations touch real production systems.',
    body:
      'You need a narrower credential surface than env vars, shell history, and one service account that quietly becomes immortal.',
  },
  {
    eyebrow: 'Platform or security team',
    title: 'You need human approval before machine access.',
    body:
      'The operator approves the pairing and the runner gets a scoped bundle. That is a different control model than generic app config.',
  },
  {
    eyebrow: 'Small technical team',
    title: 'You want per-human and per-run identity without ceremony sprawl.',
    body:
      'Passkeys for people. Ed25519 identities for runners. A custody proof before production credential material enters a pilot.',
  },
]

const fitSignals = [
  {
    label: 'Good fit',
    body: 'Your agents touch production APIs, cloud consoles, billing systems, or internal control planes.',
  },
  {
    label: 'You are replacing',
    body: 'Broad service accounts, copied env files, or a CI secret surface that has outgrown its original trust assumptions.',
  },
  {
    label: 'You care about',
    body: 'Human approval, narrower runner scope, and a replayable audit trail for what an agent actually touched.',
  },
]

const accessSteps = [
  {
    index: '01',
    label: 'Fit review',
    title: 'We review the live surface and the trust boundary you need to keep.',
    body:
      'The request is manual on purpose. We want to know what your agents touch, which approval step still needs a human, and what credential pattern you are trying to replace.',
  },
  {
    index: '02',
    label: 'Invitation path',
    title: 'Approved teams get the current console and CLI onboarding path.',
    body:
      'The invitation carries the console URL, the current CLI setup path, pairing steps, and the runner-enrollment walkthrough. Public marketing stays high-level by design.',
  },
  {
    index: '03',
    label: 'Request and support route',
    title: 'BitterDesk is the path for access requests, missing invitations, and stalled setup.',
    body:
      'Use BitterDesk for the first request and for follow-up if the invite never lands or the first pairing run stalls. An operator can look at the request and the onboarding state.',
  },
]

const requestPrompts = [
  {
    label: 'Live surface',
    body: 'Which production APIs, cloud consoles, billing systems, or internal control planes do your agents touch?',
  },
  {
    label: 'Approval boundary',
    body: 'Which step still needs a human operator before a runner receives credential material?',
  },
  {
    label: 'Pilot terms',
    body: 'Ask for private-launch pricing, onboarding timing, and the smallest scoped runner pilot that would prove value.',
  },
]

const authorityFaqs = [
  {
    question: 'Does BitterPass replace a general secret manager?',
    answer:
      'No. BitterPass is for operator-approved agent access: scoped bundles, expiry, revocation, and receipts for runs that touch real systems.',
  },
  {
    question: 'Do agents receive standing credentials?',
    answer:
      'No. Enrolled runner identities request scoped material for a run. Access is bounded by the operator-approved scope and lifecycle state.',
  },
  {
    question: 'Where do credential lifecycle receipts live?',
    answer:
      'BitterPass owns approval, issuance, expiry, revocation, and audit receipts. Factory, Grid, Hub, and marketing surfaces can link to that truth but do not become the authority.',
  },
  {
    question: 'What is public during private launch?',
    answer:
      'The marketing site explains the contract. Detailed CLI commands, pairing steps, and recovery material travel only with approved invitations.',
  },
]

useHead({
  link: [{ rel: 'canonical', href: 'https://bitterpass.com/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'BitterPass',
          applicationCategory: 'SecurityApplication',
          operatingSystem: 'Web, CLI',
          url: 'https://bitterpass.com/',
          sameAs: ['https://github.com/sheetgenius/bitterpass-marketing'],
          description:
            'Operator-approved credentials for agents with scoped, expiring, revocable, auditable access.',
          publisher: {
            '@type': 'Organization',
            name: 'BitterPass',
            url: 'https://bitterpass.com/',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: authorityFaqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ]),
    },
  ],
})

onMounted(() => {
  const button = document.getElementById('theme-toggle') as HTMLButtonElement | null
  if (!button) return
  const root = document.documentElement
  const currentTheme = () =>
    root.dataset.theme ||
    'dark'
  const applyLabel = () => {
    button.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode'
  }
  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem('bitterpass-theme', next)
    } catch (_) {
      /* ignore */
    }
    applyLabel()
  })
  applyLabel()
})
</script>

<template>
  <div id="top">
    <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div
        class="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 md:grid-cols-[1fr_auto_auto_auto]"
      >
        <a href="#top" class="brand text-fg">BitterPass</a>
        <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#contract" class="hover:text-fg">Contract</a>
          <a href="#how" class="hover:text-fg">How</a>
          <a href="#spec" class="hover:text-fg">Spec</a>
          <a href="#for" class="hover:text-fg">For</a>
          <a href="#access" class="hover:text-fg">Access</a>
        </nav>
        <div class="flex items-center gap-3">
          <button id="theme-toggle" type="button" class="btn-outline">Theme</button>
        </div>
        <div class="flex items-center gap-3">
          <a href="https://app.bitterpass.com" class="btn-outline">Open console</a>
          <a href="#access" class="btn-primary">Request access</a>
        </div>
      </div>
    </header>

    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 gridlines opacity-40"></div>
      <div class="absolute left-[-12%] top-[-14%] h-72 w-72 rounded-full hero-orb hero-orb-a blur-3xl"></div>
      <div class="absolute bottom-[-14%] right-[-8%] h-80 w-80 rounded-full hero-orb hero-orb-b blur-3xl"></div>

      <div class="vault-dial" aria-hidden="true">
        <span class="vault-dial__ring vault-dial__ring--outer"></span>
        <span class="vault-dial__ring vault-dial__ring--mid"></span>
        <span class="vault-dial__ring vault-dial__ring--inner"></span>
        <span class="vault-dial__ring vault-dial__ring--core"></span>
        <span class="vault-dial__ring vault-dial__ring--seal"></span>
        <span class="vault-dial__sweep"></span>
        <span
          v-for="(t, i) in tumblers"
          :key="i"
          class="vault-dial__tumbler"
          :style="{ transform: `rotate(${t.rotation}deg) translateY(-39%)` }"
        ></span>
      </div>

      <div
        class="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[1.08fr_0.92fr] md:py-32"
      >
        <div>
          <p class="section-index">00 / CLI and MCP credential handles</p>
          <h1
            class="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
          >
            Credential authority for operators running agents.
          </h1>
          <p class="mt-8 max-w-3xl text-lg leading-relaxed text-muted-strong md:text-xl">
            BitterPass is for teams whose agents and MCP tools touch production APIs, cloud consoles,
            billing systems, and internal control planes. It replaces broad service
            accounts, copied env vars, and unauditable bot access with human approval,
            per-run scope, revocation, and receipts.
          </p>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Passkeys gate humans. Ed25519 identities gate CLI and MCP runners. The approved
            onboarding path proves the custody boundary before a runner receives production
            credential material.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <a href="#access" class="btn-primary">Request access</a>
            <a href="#contract" class="btn-ghost">Read the contract &rarr;</a>
            <NuxtLink to="/cli-setup" class="btn-outline">CLI setup guide</NuxtLink>
          </div>

          <div class="mt-12 grid gap-4 md:grid-cols-3">
            <article v-for="point in proofPoints" :key="point.label" class="signal-card">
              <p class="signal-card__label">{{ point.label }}</p>
              <p class="signal-card__body">{{ point.body }}</p>
            </article>
          </div>
        </div>

        <aside class="panel card-line p-7 md:p-8">
          <p class="section-index">Built for this failure mode</p>
          <h2 class="mt-4 text-2xl font-semibold leading-tight md:text-3xl">
            When agents touch real systems, the old secret patterns stop being
            acceptable.
          </h2>
          <ul class="mt-6 space-y-4 text-sm leading-7 text-muted-strong">
            <li
              v-for="item in failureModes"
              :key="item"
              class="border-t border-line pt-4 first:border-t-0 first:pt-0"
            >
              {{ item }}
            </li>
          </ul>
          <div class="mt-8 border-t border-line pt-5">
            <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Public marketing and operator access stay on separate surfaces.
            </p>
            <p class="mt-3 text-sm leading-6 text-muted-strong">
              Marketing lives at <span class="text-fg">bitterpass.com</span>. The
              console lives at <span class="text-fg">app.bitterpass.com</span>.
            </p>
            <a href="https://app.bitterpass.com" class="btn-outline mt-5">Open console</a>
          </div>
        </aside>
      </div>
    </section>

    <section id="contract">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">01 / Operating contract</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Designed for human approval and agent execution, not generic app-config sprawl.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          If you are looking for a generic secret manager, this is the wrong shape.
          BitterPass is for operators who need a human to approve access and a runner
          to receive only what that run should see.
        </p>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <article
            v-for="item in contract"
            :key="item.label"
            class="panel card-line p-6 md:p-7"
          >
            <p class="eyebrow">{{ item.label }}</p>
            <p class="mt-4 text-lg leading-relaxed text-muted-strong">{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="how" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">02 / How the trust works</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Three boundaries, one vault.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          The product contract is not "trust the marketing page." It is a bounded
          onboarding proof: operator approval, runner identity, scoped material, and
          receipts before the first production pull.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article v-for="step in flow" :key="step.index" class="border-t border-line pt-5">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {{ step.index }}
            </p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ step.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ step.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="spec" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">03 / System surface</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Conservative crypto. Explicit boundaries.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          The primitives should feel familiar. The product discipline shows up in the
          split between operator access, runner access, and what the service is allowed
          to hold.
        </p>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <article
            v-for="surface in surfaces"
            :key="surface.label"
            class="panel card-line p-6 md:p-7"
          >
            <p class="eyebrow">{{ surface.label }}</p>
            <p class="mt-4 text-lg leading-relaxed text-muted-strong">{{ surface.body }}</p>
          </article>
        </div>

        <div class="mt-14 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[0].label }}</span>
              <span class="spec-row__body">{{ inside[0].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[1].label }}</span>
              <span class="spec-row__body">{{ inside[1].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[2].label }}</span>
              <span class="spec-row__body">{{ inside[2].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[3].label }}</span>
              <span class="spec-row__body">{{ inside[3].value }}</span>
            </div>
          </div>
          <div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[4].label }}</span>
              <span class="spec-row__body">{{ inside[4].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[5].label }}</span>
              <span class="spec-row__body">{{ inside[5].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[6].label }}</span>
              <span class="spec-row__body">{{ inside[6].value }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-row__label">{{ inside[7].label }}</span>
              <span class="spec-row__body">{{ inside[7].value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="for" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">04 / Who this is for</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          For teams already feeling the credential blast radius.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          The audience is not “anyone with secrets.” It is operators and technical teams
          who already know that env vars, copied tokens, and broad service accounts were
          only a temporary truce.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article
            v-for="audience in audiences"
            :key="audience.eyebrow"
            class="border-t border-line pt-5"
          >
            <p class="eyebrow">{{ audience.eyebrow }}</p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ audience.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ audience.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">05 / FAQ</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Buyer questions before a runner ever sees credential material.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          BitterPass is the authority surface for agent credential lifecycle receipts.
          Other systems can observe or link to those receipts, but they do not become
          the source of truth for issuance, expiry, revocation, or audit state.
        </p>

        <div class="mt-14 grid gap-6 md:grid-cols-2">
          <article
            v-for="item in authorityFaqs"
            :key="item.question"
            class="panel card-line p-6 md:p-7"
          >
            <h3 class="text-xl font-semibold leading-tight">{{ item.question }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="access" class="border-y border-line">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p class="section-index">05 / Access</p>
          <h2
            class="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            Request access if this is already your problem.
          </h2>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
            Tell us what your agents touch, what approval step still needs a human in
            the loop, and what credential pattern you are trying to replace.
          </p>

          <div class="mt-10 grid gap-5">
            <div v-for="signal in fitSignals" :key="signal.label" class="border-t border-line pt-5">
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {{ signal.label }}
              </p>
              <p class="mt-3 text-muted-strong leading-relaxed">{{ signal.body }}</p>
            </div>
          </div>

          <div class="panel card-line mt-10 p-6 md:p-7">
            <p class="eyebrow">What happens next</p>
            <div class="mt-5 grid gap-5">
              <article
                v-for="step in accessSteps"
                :key="step.index"
                class="grid gap-4 border-t border-line pt-5 first:border-t-0 first:pt-0 md:grid-cols-[72px_1fr]"
              >
                <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {{ step.index }}
                </p>
                <div>
                  <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {{ step.label }}
                  </p>
                  <h3 class="mt-2 text-xl font-semibold leading-tight">{{ step.title }}</h3>
                  <p class="mt-3 text-muted-strong leading-relaxed">{{ step.body }}</p>
                </div>
              </article>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="https://app.bitterpass.com" class="btn-outline">Already invited? Open console</a>
            <a href="https://bitterdesk.com" class="btn-ghost">Need help? Open BitterDesk &rarr;</a>
          </div>
        </div>

        <aside class="panel card-line h-fit p-7 md:p-8" aria-labelledby="request-review-title">
          <p class="section-index">Request review</p>
          <h3 id="request-review-title" class="mt-3 text-2xl font-semibold leading-tight">
            Start the access request in BitterDesk.
          </h3>
          <p class="mt-3 text-muted-strong leading-relaxed">
            There is no self-serve signup queue or static form endpoint. Send the
            review packet through BitterDesk so an operator can follow up with the
            console, CLI, runner onboarding path, and pilot terms.
          </p>

          <div class="mt-8 grid gap-5">
            <article
              v-for="prompt in requestPrompts"
              :key="prompt.label"
              class="border-t border-line pt-5 first:border-t-0 first:pt-0"
            >
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {{ prompt.label }}
              </p>
              <p class="mt-3 text-muted-strong leading-relaxed">{{ prompt.body }}</p>
            </article>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a href="https://bitterdesk.com" class="btn-primary">Start request in BitterDesk</a>
            <a href="https://app.bitterpass.com" class="btn-outline">Already invited? Open console</a>
          </div>

          <p class="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Human review. Private-launch terms are scoped manually.
          </p>
        </aside>
      </div>
    </section>

    <footer class="border-b border-line">
      <div
        class="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div class="flex items-center gap-4">
          <span class="brand text-muted-strong">BitterPass</span>
          <span class="hairline w-10"></span>
          <span class="font-mono text-xs text-muted">
            operator-approved credentials for humans and agents
          </span>
        </div>
        <div
          class="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <a href="https://app.bitterpass.com" class="transition hover:text-fg">Console</a>
          <a href="#spec" class="transition hover:text-fg">Spec</a>
          <NuxtLink to="/cli-setup" class="transition hover:text-fg">CLI setup</NuxtLink>
          <a href="https://github.com/sheetgenius/bitterpass-marketing" class="transition hover:text-fg">Source</a>
          <a href="https://bitterdesk.com" class="transition hover:text-fg">Support</a>
          <a href="#access" class="transition hover:text-fg">Request access</a>
        </div>
      </div>
    </footer>
  </div>
</template>
