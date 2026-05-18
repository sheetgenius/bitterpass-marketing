<script setup lang="ts">
const consoleLoginUrl = 'https://app.bitterpass.com/login'
const signupUrl = 'https://bitter.sh/signup'

useSeoMeta({
  title: 'Sign in to BitterPass through Bitter',
  description:
    'BitterPass uses one Bitter account plus passkey/vault trust. Continue to the BitterPass console to unlock or request access.',
  robots: 'noindex, follow',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://bitterpass.com/login' }],
})
</script>

<template>
  <main class="grid min-h-screen place-items-center px-6 py-12">
    <section class="panel card-line w-full max-w-lg p-7">
      <p class="section-index">BitterPass account</p>
      <h1 class="mt-4 text-3xl font-semibold leading-tight">
        Sign in through BitterPass Console.
      </h1>
      <p class="mt-4 leading-7 text-muted-strong">
        BitterPass does not have a separate marketing-site login. One Bitter
        account proves identity, then the console handles passkey and vault
        trust.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="btn-primary" :href="consoleLoginUrl">
          Continue with Bitter account
        </a>
        <a class="btn-outline" :href="signupUrl">
          Request Bitter account
        </a>
      </div>
    </section>
  </main>
</template>
