---
title: Using Svelte Context to communicate between parent and child components 
date: 2021-08-02T00:00:00
summary: Avoiding the let directive because I'm picky.
---

One of my favorite talks at this year's [Svelte Summit](https://sveltesummit.com/) was [Untangling Composition and Higher Order Components](https://youtu.be/fnr9XWvjJHw?t=3472) by [Isaac Hagoal](https://twitter.com/isaac_hagoel). The techniques discussed are great for publishing your own components and you should definitely check it out (and the whole Summit, for that matter). 

However, there was a pattern I learned recently that wasn't mentioned in the talk, so I figured I'd write about it. If you don't want the *context* (pun!), you can skip to [the actual code](#the-actual-code). 

*This article assumes a basic understanding of Svelte's [Context API](https://svelte.dev/docs#setContext) and [slots](https://svelte.dev/docs#slot).*

### Why I needed a pattern

Shortly before the Summit, I decided to write a package and publish it on `npm` -- it was something I had never done before and I like learning by doing. To avoid scrutiny, I settled on writing a parallax effect component for Svelte (parallax seems to be frowned upon these days so I figured no one would notice if I ended up publishing garbage 😅).

The basic architecture was a parent component that takes some global config props and a child component to be nested inside. The child component would use a mix of the parent's props and its own props for animation. There could be any number of children nested inside the parent.

The `Parent` eventually looked something like this (very, very abridged for clarity):

```svelte
<!-- Parent.svelte -->
<script>
  // props to be passed in
  export let config;
  export let cancel; // to cancel animation -- for a11y!

  // a local variable that changes often
  let scrollY; // bind:scrollY
</script>

...

<div>
  <!-- child components go here -->
  <slot />
</div>
```

### Deciding on a clean API

With that squared away, I started thinking about *how* these components would be used. I wanted it to look something like this:

```svelte
<Parent {config} {cancel}>
  <!-- Magically pass down config and cancel somehow -->
  <Child childProp={value}>
</Parent>
```

In Svelte, we have the [let directive](https://svelte.dev/tutorial/slot-props) to pass props down to `slot`s:

```svelte
<Parent {config} {cancel} let:config let:cancel>
  <Child childProp={value} {config} {cancel}>
</Parent>
```

But I wanted to avoid it for a few reasons. First, it seemed too "noisy" -- I wanted a simple, clean API which, for me, meant only passing props down -- without any boilerplate. One of the main reasons devs use component libraries is to abstract away all of the set up.

Second, if a user wanted to have a lot of `Child` components, they would need to pass down just as many `Parent` props. All that repitition could lead to forgetting to pass them, which could lead to bugs and frustration.

And third, I still had local variables to pass down. In order to make development easier on myself, I wanted all data to be passed between components *together*.

### Context to the rescue

In order to "hide" this prop passing, I reached for Svelte's Context API:

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  export let config;
  export let cancel;

  let scrollY;

  // these will be available to any components nested in `Parent`
  setContext('contextKey', {
    config,
    cancel,
    scrollY
  });
</script>
```

Now, all the prop sharing could happen behind the scenes. But there was still a problem.

The above code would work -- if none of those values were going to change. But, in my case, they were going to change often and `context` isn't reactive by default. 

To fix this, I made my `Parent` props and variables into stores:

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  export let config;
  export let cancel;

  // make a store version of the prop
  const _config = writable(config);
  // reactive statement to keep them in sync
  $: $_config = config;

  // ...and again
  const _cancel = writable(cancel);
  $: $_cancel = cancel;

  const scrollY = writable(0);

  setContext('contextKey', {
    _config,
    _cancel,
    scrollY
  });
</script>
```

And that seemed...ok, I guess? It worked, but I thought it was kind of ugly (in the actual code there were *a lot* of props and local vars). I had a bunch of unnecessary stores and redeclared variables prefixed with underscores -- it got pretty tedious whenever I wanted to change something.

But then I remembered a cool `context` pattern I had come across in IBM's [carbon-components-svelte](https://github.com/carbon-design-system/carbon-components-svelte) library. It goes a little something like this: **instead of passing all those props and vars *down* to the children, you pass functions that take them as arguments *up* to the parent.** Using `context`! Rad!

### The actual code!

First we set up our `context` and an array to hold the children and their methods. The `context` itself contains two methods -- one for adding a `Child` and one for removing it:

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte';

  export let config;
  export let cancel;

  let scrollY;

  // eventually full of `Child` objects with methods
  let children = [];

  // methods for Child to add/remove itself from `children`
  setContext('contextKey', {
    add: (child) => {
      children = [...children, child];
    },
    remove: (child) => {
      children = children.filter(c => c !== child);
    }
  });
</script>
```

Then, in `Child.svelte` we grab the `context`, set up our object, and call `add` in `onMount`:

```svelte
<!-- Child.svelte -->
<script>
  import { onMount, getContext } from 'svelte';

  // grab context
  const { add, remove } = getContext('contextKey');

  // Child object with fancy method
  const child = {
    func: (config, cancel, scrollY) => {
      // do fancy stuff
    }
  };

  onMount(() => {
    // add it to the array in `Parent`
    add(child);

    return () => {
      // clean up!
      remove(child);
    }
  });
</script>
```

And finally, we use it in `Parent.svelte`:

```javascript
$: children.forEach(child => {
     child.func(config, cancel, scrollY);
   });
```

Now, whenever the props and vars change in `Parent` (including the `children` array), those methods will be re-run and the changes will be reflected in `Child`! There's less visual noise and it's still pretty clear what's going on.

To run the methods *only* when the props/vars change, you can "hide" `children` from the reactive statement by moving the `forEach` into its own function:

```javascript
$: runAll(config, cancel, scrollY);

function runAll(config, cancel, scrollY) {
  // "hide" `children` from reactive statement
  children.forEach(child => {
    child.func(config, cancel, scrollY);
  });
}
```

Another cool side-effect of this pattern is that the parent component can get all kinds of information about children (for example, you can get `children.length` -- can't do that with `$$slots`). You can also add meta info to the `Child` object:

```javascript
const child = {
  name: nameProp,
  type: typeProp,
  props: ['some', 'other', 'props'],
  func: (config, cancel, scrollY) => {
    // do fancy stuff
  }
}
```

So, there you have it -- instead of using `context` to pass data, we use it as a fancy portal to communicate between components.

*If you'd like to mess around with this pattern, I made a little [REPL example](https://svelte.dev/repl/041d9d959a2e4cbc8c3a2519724df472?version=3.42.1) that you can play with. And if you want to see it in action, you can check out my actual project here -- [svelte-parallax](https://github.com/kindoflew/svelte-parallax).*
