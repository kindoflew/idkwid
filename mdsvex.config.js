import urls from 'rehype-urls';
import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';

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
    [autolinkHeadings, {behavior: 'wrap'}]
  ]
};

export default config;
