import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'static',
  },

  app: {
    head: {
      title: 'BitterPass — Operator-approved credentials for agents',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'BitterPass is a zero-knowledge credentials vault for operators running agents against real systems. Passkeys gate humans. Ed25519 identities gate runners. The service stores ciphertext, metadata, and audit.',
        },
        { property: 'og:title', content: 'BitterPass — Operator-approved credentials for agents' },
        {
          property: 'og:description',
          content:
            'A zero-knowledge credentials vault for operators replacing broad service accounts, copied env vars, and unauditable bot access.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bitterpass.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'BitterPass — Operator-approved credentials for agents' },
        {
          name: 'twitter:description',
          content:
            'A zero-knowledge credentials vault for operators replacing broad service accounts, copied env vars, and unauditable bot access.',
        },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#f3eee5', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0d0c10', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        {
          key: 'theme-init',
          tagPosition: 'head',
          innerHTML:
            "(function(){try{var url=new URL(window.location.href);var qp=url.searchParams.get('theme');if(qp==='light'||qp==='dark'){document.documentElement.dataset.theme=qp;return;}var stored=window.localStorage.getItem('bitterpass-theme');if(stored==='light'||stored==='dark'){document.documentElement.dataset.theme=stored;}else{document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}}catch(_){document.documentElement.dataset.theme='light';}})();",
        },
      ],
    },
  },
})
