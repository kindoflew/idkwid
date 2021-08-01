<script>
  let year = new Date().getFullYear();
</script>

<footer>
  <p>
    Built with 
      <a href="https://kit.svelte.dev/" rel="noopener noreferrer">SvelteKit</a> 
      and 
      <a href="https://mdsvex.pngwn.io/" rel="noopener noreferrer">MDsveX</a>
  </p>
  <p>
    Copyleft {year} @kindoflew
  </p>
  <p>
    ¯\_(ツ)_/¯
  </p>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.5rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  a {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }
</style>