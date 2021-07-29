<script>
  import { onMount } from 'svelte';

  let year = new Date().getFullYear();
</script>

<footer>
  <p>
    Copyright @kindoflew {year}
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
  }
</style>