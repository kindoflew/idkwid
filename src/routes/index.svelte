<script context="module">
  export const load = async function ({ fetch }) {
    const url = '/posts.json';
    const res = await fetch(url);
    if (res.ok) {
      const { posts } = await res.json();
      return {
        props: { posts }
      };
    } else {
      return {
        status: 500,
        error: new Error(`Could not fetch ${url}`)
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
    border-radius: 5px;
    /* background-color: var(--background-color); */
    border: 2px solid var(--background-color);
    /* border: 2px solid #8b4512; */
  }

  h2 {
    font-size: 1.75rem;
    margin: 0;
  }

  .date {
    font-size: 0.9rem;
    margin: 0.5rem 0 0.2rem;
    color: #6b6b6b;
  }

  .summary {
    margin-bottom: 0;
    font-size: 1rem;
  }
</style>
