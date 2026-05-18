<script setup lang="ts">
const signupUrl = 'https://bitter.sh/signup'
const consoleLoginUrl = 'https://app.bitterpass.com/login'

useSeoMeta({
  title: 'Request BitterPass access through Bitter',
  description:
    'BitterPass access starts with one Bitter account. Request access through Bitter, then use passkey and vault trust in the console.',
  robots: 'noindex, follow',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://bitterpass.com/signup' }],
})
</script>

<template>
  <main class="grid min-h-screen place-items-center px-6 py-12">
    <section class="panel card-line w-full max-w-lg p-7">
      <p class="section-index">BitterPass access</p>
      <h1 class="mt-4 text-3xl font-semibold leading-tight">
        Request access through Bitter.
      </h1>
      <p class="mt-4 leading-7 text-muted-strong">
        BitterPass vault access is reviewed from one Bitter account. There is no
        BitterPass-only signup path or local password account.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="btn-primary" :href="signupUrl">
          Request Bitter account
        </a>
        <a class="btn-outline" :href="consoleLoginUrl">
          Continue with Bitter account
        </a>
      </div>
    </section>
  </main>
</template>
