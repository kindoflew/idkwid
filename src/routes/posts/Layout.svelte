<script>
  import { onMount } from 'svelte';
  import { formatDate } from '$lib/formatDate';

  export let title;
  export let date;

  let article;
  let readingTime;
  let prettyDate = formatDate(date);

  onMount(() => {
    readingTime = getReadingTime();
  });

  // https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
  function getReadingTime() {
    let text = article.innerText;
    let wpm = 225;
    let words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  }
</script>

<svelte:head>
  <title>{title} | idkwid</title>
</svelte:head>

<article bind:this={article}>
  <h2>{title}</h2>
  <p>{prettyDate} | {readingTime} minute read</p>
  <slot />
</article>

<style>
  h2 {
    margin-bottom: 0;
  }

  p {
    font-size: 0.95rem;
  }
</style>