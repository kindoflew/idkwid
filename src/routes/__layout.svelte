<script>
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import 'normalize.css';
  import '../styles/index.css';
</script>

<Header />
<main>
  <slot />
</main>
<Footer />

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    padding: 3rem;
    width: 100%;
    max-width: 46rem;
    margin: 0 auto;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: var(--background-light);
  }

  @media (max-width: 620px) {
    main {
      padding: 3rem 1rem;
    }
  }
</style>
