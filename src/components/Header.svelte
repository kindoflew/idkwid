<script>
  import { page } from '$app/stores';
</script>

<header>
  <div>
    <h1>i don't know what i'm doing</h1>
    <p>
      a blog about web development by 
      <a
        href="https://twitter.com/kindoflew"
        rel="noreferrer noopener"
      >
        @kindoflew
      </a>
    </p>
  </div>

  <nav>
    <ul>
      <li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">home</a></li>
      <li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">about</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    margin-bottom: 1.8rem;
  }

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    text-align: center;
    /* color: var(--text-light);  */
  }

  p {
    text-align: center;
    margin-top: 0;
    /* color: var(--text-light);  */
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0.7);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background-light);
    background-size: contain;
    border-radius: 5px;
  }

  li {
    position: relative;
    height: 100%;
  }

  li:not(:last-of-type) {
    border-right: 1px solid lightgrey;
  }

  /* li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  } */

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    text-decoration: none;
    transition: color 0.2s linear;
  }

  nav a:hover {
    text-decoration: underline;
  }

  p a {
    text-decoration: underline;
  }

  p a:hover {
    text-decoration: none;
  }
</style>
