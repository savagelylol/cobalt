import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path, status, message }) => {
        if (path === '/version.json') {
          // Return a placeholder JSON body to save as the static file.
          return JSON.stringify({
            cobalt: {
              version: 'unknown',
              url: process.env.WEB_DEFAULT_API || 'https://api.cobalt.tools/',
              services: []
            },
            git: {
              branch: 'main',
              commit: 'unknown',
              remote: 'savagelylol/cobalt'
            }
          });
        }
        // For other paths, fail the build as usual.
        throw new Error(message);
      }
    }
  }
};

export default config;
