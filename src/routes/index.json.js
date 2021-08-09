// Learned this from babichjacob: https://github.com/babichjacob/university-website/blob/main/src/routes/blog/index.json.ts
// and c-bandy: https://github.com/babichjacob/university-website/blob/main/src/routes/blog/index.json.ts
import { basename } from 'path';

export async function get() {
  const modules = Object.entries(import.meta.glob('./posts/*.md'));

  const posts = [];

  await Promise.all(modules.map(async ([file, module]) => {
      const { metadata } = await module();

      posts.push({
        ...metadata,
        slug: basename(file, ".md"),
      });
    })
  );

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return {
    body: { posts }
  };
}
