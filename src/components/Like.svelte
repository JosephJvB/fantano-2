<script>
  import { createEventDispatcher } from 'svelte'

  export let liked = false

  const dispatch = createEventDispatcher()
</script>

<button class="like-icon" on:click={() => dispatch('like')}>
  <svg
    fill={liked ? 'yellowgreen' : 'none'}
    height="30px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="yellowgreen"
  >
    <path
      d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"
    />
  </svg>
</button>

<style>
  .like-icon {
    all: unset;
    top: 20px;
    right: 20px;
    position: absolute;
    z-index: 1;
  }
</style>
