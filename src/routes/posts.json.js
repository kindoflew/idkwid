import { basename } from 'path';

export async function get() {
  const modules = Object.entries(import.meta.glob('./posts/*.svx'));

  const posts = [];

  await Promise.all(modules.map(async ([file, module]) => {
      const { metadata } = await module();

      posts.push({
        ...metadata,
        slug: basename(file, ".svx"),
      });
    })
  );

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return {
    body: { posts }
  };
}
