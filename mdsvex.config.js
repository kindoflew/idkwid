// learned how to do all this from c-bandy: https://github.com/c-bandy/website/blob/main/mdsvex.config.js
import urls from 'rehype-urls';
import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import addClasses from 'rehype-add-classes';

function processUrl(url, node) {
  if (node.tagName === 'a') {
    node.properties.class = 'md-link';

    if (!url.href.startsWith('/') && !url.href.startsWith('#')) {
      node.properties.class += ' external';
      node.properties.target = '_blank';
      node.properties.rel = 'noreferrer noopener';
    }
  }
}

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: true
  },
  layout: {
    posts: './src/routes/posts/Layout.svelte',
    about: './src/routes/about/Layout.svelte'
  },
  remarkPlugins: [],
  rehypePlugins: [
    [urls, processUrl],
    slug,
    [autolinkHeadings, {behavior: 'wrap'}],
    [addClasses, { 'ul': 'md-list' }]
  ]
};

export default config;
