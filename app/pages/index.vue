<script setup lang="ts">
useSeoMeta({
  title: 'BitterPass — Operator-approved credentials for agents',
  description:
    'BitterPass is a zero-knowledge credentials vault for operators running agents against real systems. Passkeys gate humans. Ed25519 identities gate runners. The service stores ciphertext, metadata, and audit.',
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
    label: 'Replayable audit',
    body: 'Reads, writes, and rotations land in a hash-linked chain you can inspect later.',
  },
]

const failureModes = [
  'Agents inherit credentials that were meant for a human at a shell.',
  'One service account ends up with standing access to too many systems.',
  'There is no durable record of which agent saw which secret, and when.',
  'Recovery depends on vendor custody instead of an operator-controlled kit.',
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
    label: 'Ciphertext on the service',
    body:
      'The service stores envelopes, metadata, and audit. The root secret stays with the operator, not the vendor.',
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
    title: 'The service stores sealed state only.',
    body:
      'Records arrive as ciphertext envelopes with audit metadata. Storage and sync work without asking the service to hold plaintext.',
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
    body: 'Ciphertext, metadata, and recovery artifacts only. No vendor-held root secret.',
  },
]

const inside = [
  { label: 'Envelope', value: 'XChaCha20-Poly1305 with per-record nonce' },
  { label: 'Key derivation', value: 'Argon2id over the master secret + per-vault salt' },
  { label: 'Runner identity', value: 'Ed25519 keypair, signed request envelopes' },
  { label: 'Human gateway', value: 'WebAuthn passkey, no shared password or email login' },
  { label: 'Storage shape', value: 'Two-phase atomic mirror writes with no silent partial state' },
  { label: 'Audit', value: 'Append-only chain, hash-linked, locally first and mirrored second' },
  { label: 'Recovery', value: 'Operator-held paper recovery code plus sealed recovery package' },
  { label: 'Hosting', value: 'Independent failure domain, separate from Factory and BitterGrid' },
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
      'Passkeys for people. Ed25519 identities for runners. Recovery that does not depend on a vendor holding the root of trust.',
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

onMounted(() => {
  const button = document.getElementById('theme-toggle') as HTMLButtonElement | null
  if (!button) return
  const root = document.documentElement
  const currentTheme = () =>
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
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
          <p class="section-index">00 / Operator-approved credentials for agents</p>
          <h1
            class="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
          >
            A credentials vault for operators running agents.
          </h1>
          <p class="mt-8 max-w-3xl text-lg leading-relaxed text-muted-strong md:text-xl">
            BitterPass is for teams replacing broad service accounts, copied env vars,
            and unauditable bot access. Passkeys gate humans. Ed25519 identities gate
            runners. The service stores ciphertext, metadata, and audit.
          </p>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Built for the moment when agents start touching production APIs, cloud
            consoles, billing systems, and internal control planes.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <a href="#access" class="btn-primary">Request access</a>
            <a href="#contract" class="btn-ghost">Read the contract &rarr;</a>
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
          The plaintext lives only between the operator-controlled secret material and
          the run that needs it. Everything in between is passkeys, signatures,
          ciphertext, and audit.
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

          <div class="mt-8">
            <a href="https://app.bitterpass.com" class="btn-outline">Already invited? Open console</a>
          </div>
        </div>

        <form
          method="POST"
          action="/__submit"
          class="panel card-line h-fit p-7 md:p-8"
        >
          <input type="hidden" name="product" value="bitterpass-early-access" />

          <p class="section-index">Request review</p>
          <h3 class="mt-3 text-2xl font-semibold leading-tight">Describe the live surface you need to protect.</h3>
          <p class="mt-3 text-muted-strong leading-relaxed">
            Approvals are manual. The point is signal, not volume.
          </p>

          <div class="mt-8 grid gap-4">
            <label class="grid gap-2">
              <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</span>
              <input
                type="email"
                name="email"
                required
                autocomplete="email"
                class="field-input"
                placeholder="you@company.com"
              />
            </label>

            <label class="grid gap-2">
              <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                What do your agents touch?
              </span>
              <textarea
                name="context"
                rows="5"
                class="field-input"
                placeholder="Example: Our agents touch Stripe, cloud infrastructure, and internal admin tools. We need operator-approved access, per-run scope, and a real audit trail instead of one service account that knows everything."
              ></textarea>
            </label>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" class="btn-primary">Request access</button>
              <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Human review. No automated approval queue.
              </span>
            </div>
          </div>
        </form>
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
          <a href="#access" class="transition hover:text-fg">Request access</a>
        </div>
      </div>
    </footer>
  </div>
</template>
