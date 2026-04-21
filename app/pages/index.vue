<script setup lang="ts">
useSeoMeta({
  title: 'BitterPass — Credentials sealed by you, served to your agents',
  description:
    'BitterPass is a zero-knowledge credential service for humans and the agents they trust. The server stores ciphertext. You hold the master secret. Every read is signed and audited.',
})

const tumblerCount = 24
const tumblers = Array.from({ length: tumblerCount }, (_, i) => ({
  rotation: (360 / tumblerCount) * i,
}))

const reasons = [
  {
    label: 'Zero-knowledge by construction',
    body:
      'BitterPass never sees your plaintext. The server stores ciphertext, key wraps, and verifiers. A full server compromise leaks who-asked-for-what-when, not the secrets themselves.',
  },
  {
    label: 'Humans and agents, same vault',
    body:
      'A passkey opens the human console. An Ed25519 runner identity opens the agent surface. One vault, two trust paths, no shared bearer token sitting in CI.',
  },
  {
    label: 'Audit every touch',
    body:
      'Every read, write, and rotation lands in an append-only audit chain — locally first, mirrored to the service second. You can replay exactly what an agent saw, and when.',
  },
]

const flow = [
  {
    index: '01',
    title: 'You hold the Master Secret.',
    body:
      'Generated once, derived through Argon2id, never transmitted. The vault unwraps locally; the service only ever sees ciphertext.',
  },
  {
    index: '02',
    title: 'The server stores only the envelope.',
    body:
      'Records arrive as XChaCha20-Poly1305 envelopes with attached audit events. Two-phase atomic mirror writes mean no half-committed state — the server either has the whole record or none of it.',
  },
  {
    index: '03',
    title: 'Agents get scoped, sealed bundles per run.',
    body:
      'A runner authenticates with its Ed25519 key, the service hands it a single sealed credential bundle for the run. Bundle expires with the run. Nothing lingers in env or shell history.',
  },
]

const inside = [
  { label: 'Envelope', value: 'XChaCha20-Poly1305 with per-record nonce' },
  { label: 'Key derivation', value: 'Argon2id over the master secret + per-vault salt' },
  { label: 'Runner identity', value: 'Ed25519 keypair, signed request envelopes' },
  { label: 'Human gateway', value: 'WebAuthn passkey, no shared password ever' },
  { label: 'Storage shape', value: 'Two-phase atomic mirror writes — no divergent committed state' },
  { label: 'Audit', value: 'Append-only chain, hash-linked, locally then service-mirrored' },
  { label: 'Recovery', value: 'Paper recovery code + sealed recovery package' },
  { label: 'Hosting', value: 'Own failure domain. Own small Hetzner box. Not on Factory or Grid.' },
]

const personas = [
  {
    eyebrow: 'Solo builder',
    title: 'Running agents that touch your accounts.',
    body:
      'Stop pasting API keys into yet another shell rc. Seal them once, hand each agent run only the credentials it actually needs.',
  },
  {
    eyebrow: 'Small team',
    title: 'Sharing credentials without sharing a single bearer token.',
    body:
      'Each member opens the vault with their own passkey. Each runner gets its own Ed25519 identity. Rotate without coordinating six humans.',
  },
  {
    eyebrow: 'AI ops engineer',
    title: 'Auditable credential surface for an agent fleet.',
    body:
      'Per-run sealed bundles, append-only audit chain, and idempotent two-phase writes are the substrate you wished CI/CD had ten years ago.',
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
      <div class="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 md:grid-cols-[1fr_auto_auto]">
        <a href="#top" class="brand text-fg">BitterPass</a>
        <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#why" class="hover:text-fg">Why</a>
          <a href="#how" class="hover:text-fg">How</a>
          <a href="#inside" class="hover:text-fg">Inside</a>
          <a href="#who" class="hover:text-fg">Who</a>
          <a href="#access" class="hover:text-fg">Access</a>
        </nav>
        <div class="flex items-center gap-3">
          <button id="theme-toggle" type="button" class="btn-outline">Theme</button>
          <a href="#access" class="btn-primary">Request access</a>
        </div>
      </div>
    </header>

    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 gridlines opacity-50"></div>
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

      <div class="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-[1.25fr_0.75fr] md:py-32">
        <div>
          <p class="section-index">00 / Sealed by you. Served to your agents.</p>
          <h1
            class="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
          >
            Your credentials, sealed by you, served to your agents.
          </h1>
          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted-strong md:text-xl">
            BitterPass is a zero-knowledge credential service for humans and the agents
            they trust. You hold the master secret. The server holds ciphertext.
            Every read is signed, scoped, and audited.
          </p>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Built for fleets that can no longer treat secrets as environment variables.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <a href="#access" class="btn-primary">Request early access</a>
            <a href="#how" class="btn-ghost">See the design &rarr;</a>
          </div>
        </div>

        <aside class="relative z-10 border-l border-line/60 pl-6 md:pl-8">
          <p class="section-index">What BitterPass refuses to do</p>
          <ul class="mt-6 space-y-4 text-sm leading-7 text-muted-strong">
            <li>Never store your plaintext, even briefly.</li>
            <li>Never let a service hold a long-lived bearer token in env.</li>
            <li>Never silently reconcile a divergent write — fail loud, indeterminate.</li>
            <li>Never share an audit chain across vaults.</li>
            <li>Never run on the same box as the things it secures.</li>
          </ul>
          <div class="mt-8 flex items-center gap-3">
            <span class="seal-stamp">SEAL</span>
            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Invitation-only. Founder-built.
            </span>
          </div>
        </aside>
      </div>
    </section>

    <section id="why">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">01 / Why BitterPass exists</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Vault was built for humans running infra. Doppler was built for app secrets.
          Nothing was shaped for human-authorized, agent-executed, ephemeral, zero-knowledge.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          BitterPass is that shape.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article
            v-for="reason in reasons"
            :key="reason.label"
            class="border-t border-line pt-5"
          >
            <h3 class="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {{ reason.label }}
            </h3>
            <p class="mt-5 text-lg leading-relaxed text-muted-strong">{{ reason.body }}</p>
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
          The plaintext lives only between your master secret and the agent run that needs it.
          Everything in between is ciphertext, signatures, and audit.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article v-for="step in flow" :key="step.index" class="border-t border-line pt-5">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">{{ step.index }}</p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ step.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ step.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="inside" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">03 / What's inside</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Boring, conservative cryptography. Loud, opinionated operations.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          The primitives are ones you already trust. The shape around them is where BitterPass earns its keep.
        </p>

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

    <section id="who" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">04 / Who it's for</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          For builders who already know that secrets in env was a temporary truce.
        </h2>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article v-for="persona in personas" :key="persona.eyebrow" class="border-t border-line pt-5">
            <p class="eyebrow">{{ persona.eyebrow }}</p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ persona.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ persona.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="access" class="border-y border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">05 / Access</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Request access.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          BitterPass is invitation-only while it hardens. Tell us what you want to seal
          and which fleet you want to seal it for.
        </p>
        <p class="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Approvals are manual. Replies come from a human, not a queue.
        </p>

        <form
          method="POST"
          action="/__submit"
          class="mt-14 grid gap-4 border-t border-line pt-6 md:max-w-2xl"
        >
          <input type="hidden" name="product" value="bitterpass-early-access" />

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
            <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >What do you want to seal?</span
            >
            <textarea
              name="context"
              rows="4"
              class="field-input"
              placeholder="Example: We run an agent fleet that touches Stripe, OpenAI, and a half-dozen internal APIs. We want per-run sealed bundles instead of a service account that knows everything."
            ></textarea>
          </label>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" class="btn-primary">Request access</button>
            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              We never store your message in plaintext on a long-lived service.
            </span>
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
            zero-knowledge credentials for humans and agents
          </span>
        </div>
        <div
          class="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <a href="#top" class="transition hover:text-fg">Top</a>
          <a href="#how" class="transition hover:text-fg">Design</a>
          <a href="#inside" class="transition hover:text-fg">Spec</a>
          <a href="#access" class="transition hover:text-fg">Request access</a>
        </div>
      </div>
    </footer>

  </div>
</template>
