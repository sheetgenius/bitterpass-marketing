<script setup lang="ts">
useSeoMeta({
  title: 'BitterPass — CLI setup',
  description:
    'A first-time operator path for BitterPass. The full CLI walkthrough arrives with your access invitation; this page covers what to expect at each step.',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://bitterpass.com/cli-setup/' }],
})

const steps = [
  {
    index: '01',
    title: 'Request access.',
    body:
      'Tell us what your agents touch, what approval still needs a human, and what credential pattern you are replacing. Reviews are manual on purpose — the point is signal, not volume.',
  },
  {
    index: '02',
    title: 'Operator review and pairing approval.',
    body:
      'Approved invitations include the current CLI release notes, the console pairing steps, and the runner-enrollment walkthrough. The detailed commands live with the invitation, not in public marketing.',
  },
  {
    index: '03',
    title: 'Pair the console with a passkey.',
    body:
      'WebAuthn gates the operator surface. You register a passkey on the device you plan to use, and the session never leaves the browser as a reusable URL or magic link.',
  },
  {
    index: '04',
    title: 'Enroll a runner identity.',
    body:
      'Each runner gets its own Ed25519 keypair. The walkthrough covers generating the identity on the runner host, registering it with the operator, and confirming the first scoped pull.',
  },
  {
    index: '05',
    title: 'Each run receives one scoped bundle.',
    body:
      'Runners do not get a permanent token. They authenticate, receive only what the run should see, and the audit chain records which agent touched which secret.',
  },
]

const expect = [
  {
    label: 'Manual approval',
    body: 'Access is gated by an operator review. There is no self-serve signup queue.',
  },
  {
    label: 'Invitation contents',
    body:
      'Console pairing steps, the current CLI release, runner-enrollment walkthrough, and recovery code generation.',
  },
  {
    label: 'Operator-held recovery',
    body:
      'You generate and hold the recovery material. The service does not custody the root of trust.',
  },
]
</script>

<template>
  <div id="top">
    <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div
        class="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 md:grid-cols-[1fr_auto_auto]"
      >
        <NuxtLink to="/" class="brand text-fg">BitterPass</NuxtLink>
        <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
          <NuxtLink to="/#contract" class="hover:text-fg">Contract</NuxtLink>
          <NuxtLink to="/#how" class="hover:text-fg">How</NuxtLink>
          <NuxtLink to="/#spec" class="hover:text-fg">Spec</NuxtLink>
          <NuxtLink to="/#access" class="hover:text-fg">Access</NuxtLink>
        </nav>
        <div class="flex items-center gap-3">
          <a href="https://app.bitterpass.com" class="btn-outline">Open console</a>
          <NuxtLink to="/#access" class="btn-primary">Request access</NuxtLink>
        </div>
      </div>
    </header>

    <section class="border-b border-line">
      <div class="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <p class="section-index">00 / CLI setup</p>
        <h1
          class="mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
        >
          Set up the BitterPass CLI.
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          A short, honest path for first-time operators. The full CLI walkthrough
          arrives with your access invitation, since runner enrollment is gated on
          operator approval. Below is what to expect at each step.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-3">
          <NuxtLink to="/#access" class="btn-primary">Request access</NuxtLink>
          <a href="https://app.bitterpass.com" class="btn-outline">Open console</a>
          <NuxtLink to="/" class="btn-ghost">Back to overview &larr;</NuxtLink>
        </div>
      </div>
    </section>

    <section class="border-b border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">01 / The path</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Five steps from request to first scoped pull.
        </h2>

        <div class="mt-14 grid gap-10 md:gap-12">
          <article
            v-for="step in steps"
            :key="step.index"
            class="grid gap-4 border-t border-line pt-6 md:grid-cols-[120px_1fr] md:gap-10"
          >
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {{ step.index }}
            </p>
            <div>
              <h3 class="text-2xl font-semibold leading-tight">{{ step.title }}</h3>
              <p class="mt-3 text-muted-strong leading-relaxed">{{ step.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">02 / What to expect</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          The invitation carries the detail.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          Public marketing keeps the architecture visible. Specific CLI commands,
          release versions, and pairing tokens live with the access invitation so the
          enrollment surface stays narrow.
        </p>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <article
            v-for="item in expect"
            :key="item.label"
            class="panel card-line p-6 md:p-7"
          >
            <p class="eyebrow">{{ item.label }}</p>
            <p class="mt-4 text-lg leading-relaxed text-muted-strong">{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-line">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p class="section-index">03 / Next</p>
          <h2
            class="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            Pick the path that matches where you are.
          </h2>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
            If you have not been invited yet, the request form on the home page is the
            entry. If you already received an invitation, the console is the next
            surface.
          </p>
        </div>

        <div class="grid gap-5">
          <NuxtLink to="/#access" class="panel card-line block p-6 md:p-7">
            <p class="eyebrow">Not invited yet</p>
            <p class="mt-3 text-lg leading-relaxed text-muted-strong">
              Open the request form on the home page and describe the live surface you
              need to protect.
            </p>
            <p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Request access &rarr;
            </p>
          </NuxtLink>

          <a href="https://app.bitterpass.com" class="panel card-line block p-6 md:p-7">
            <p class="eyebrow">Already invited</p>
            <p class="mt-3 text-lg leading-relaxed text-muted-strong">
              Open the console at app.bitterpass.com and finish pairing with the
              passkey on your registered device.
            </p>
            <p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Open console &rarr;
            </p>
          </a>

          <a href="https://bitterdesk.com" class="panel card-line block p-6 md:p-7">
            <p class="eyebrow">Need help</p>
            <p class="mt-3 text-lg leading-relaxed text-muted-strong">
              Reach BitterDesk if your invitation is missing, your pairing fails, or
              you need an operator to look at a stalled enrollment.
            </p>
            <p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              bitterdesk.com &rarr;
            </p>
          </a>
        </div>
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
          <NuxtLink to="/#spec" class="transition hover:text-fg">Spec</NuxtLink>
          <NuxtLink to="/cli-setup" class="transition hover:text-fg">CLI setup</NuxtLink>
          <a href="https://bitterdesk.com" class="transition hover:text-fg">Support</a>
          <NuxtLink to="/#access" class="transition hover:text-fg">Request access</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
