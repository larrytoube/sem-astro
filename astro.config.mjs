// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';

// Keystatic integration: Vite config + route injection
// Routes use prerender: false → deployed as Vercel Serverless Functions
function keystatic() {
  return {
    name: 'keystatic',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig, config }) => {
        updateConfig({
          server: config.server.host ? {} : { host: '127.0.0.1' },
          vite: {
            plugins: [{
              name: 'keystatic',
              resolveId(id) {
                if (id === 'virtual:keystatic-config') {
                  return this.resolve('./keystatic.config', './a');
                }
                return null;
              },
            }],
            optimizeDeps: {
              entries: ['keystatic.config.*'],
            },
          },
        });
        injectRoute({
          entrypoint: './src/keystatic/page.astro',
          pattern: '/keystatic/[...params]',
          prerender: false,
        });
        injectRoute({
          entrypoint: './src/keystatic/api.ts',
          pattern: '/api/keystatic/[...params]',
          prerender: false,
        });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    mdx(),
    markdoc(),
    keystatic(),
  ],
});
