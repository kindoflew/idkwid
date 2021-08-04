<script context="module">
  export const load = async function ({ fetch }) {
    const res = await fetch('/index.json');
    if (res.ok) {
      const { posts } = await res.json();
      return {
        props: { posts }
      };
    } else {
      return {
        status: 500,
        error: new Error(`Could not fetch posts`)
      };
    }
  };
</script>

<script>
  import { formatDate } from '$lib/formatDate';
  export let posts;
</script>

<svelte:head>
  <title>i don't know what i'm doing</title>
</svelte:head>

{#each posts as post}
  <div>
    <h2>
      <a href={`./posts/${post.slug}`}>
        {post.title}
      </a>
    </h2>
    <p class="date">{formatDate(post.date)}</p>
    <p class="summary">{post.summary}</p>
  </div>
{/each}

<style>
  div {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 5px;
    border: 2px solid var(--border-color);
  }

  div:last-of-type {
    margin-bottom: 0;
  }

  h2 {
    margin: 0;
  }

  .date {
    font-size: 0.9rem;
    margin: 0.2rem 0;
    color: var(--text-gray);
  }

  .summary {
    margin-bottom: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
