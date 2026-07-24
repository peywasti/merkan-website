// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://merkan.ir',
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'fa',
    locales: ['en', 'fa', 'tr'],
    routing: {
      prefixDefaultLocale: false,
    }
  }
});
