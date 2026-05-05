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
    prerender: {
      routes: ['/up'],
    },
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
            'BitterPass is an operator-approved credentials vault for teams whose agents touch production APIs, cloud consoles, billing systems, and internal control planes.',
        },
        { property: 'og:title', content: 'BitterPass — Operator-approved credentials for agents' },
        {
          property: 'og:description',
          content:
            'Operator-approved credentials for teams replacing broad service accounts, copied env vars, and unauditable bot access when agents touch real systems.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bitterpass.com' },
        { property: 'og:image', content: 'https://bitterpass.com/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'BitterPass scoped credential authority for agents' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://bitterpass.com/og-image.svg' },
        { name: 'twitter:title', content: 'BitterPass — Operator-approved credentials for agents' },
        {
          name: 'twitter:description',
          content:
            'Operator-approved credentials for teams replacing broad service accounts, copied env vars, and unauditable bot access when agents touch real systems.',
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
          key: 'ga4-loader',
          tagPosition: 'head',
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5N0EM7WK5J',
          async: true,
        },
        {
          key: 'ga4-init',
          tagPosition: 'head',
          innerHTML:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5N0EM7WK5J');",
        },
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
