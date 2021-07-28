import path from 'path'
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $components: path.resolve('./src/components')
        }
      }
    }
  },

  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: true
    })
  ]
};

export default config;
