<!-- <script context="module">
  import { page } from '$app/stores';
</script> -->
<script>
  import { fade } from 'svelte/transition';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import 'normalize.css';
  import '../styles/app.css';
  import '../styles/markdown.css';
  import '../styles/prismTheme.css';
</script>

<Header />
<main>
  <!-- {#key $page}
    <div in:fade> -->
      <slot />
    <!-- </div> 
  {/key} -->
</main>
<Footer />

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 3rem;
    width: 100%;
    max-width: 46rem;
    margin: 0 auto;
    border-radius: 5px;
    /* border: 2px solid #8b4512; */
    box-sizing: border-box;
    background-color: #fff6e5;
  }

  @media (max-width: 620px) {
    main {
      padding: 3rem 1rem;
    }
  }
</style>
