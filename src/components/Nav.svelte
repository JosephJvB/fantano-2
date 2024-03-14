<script>
  $: currentPath = typeof window !== 'undefined' && window.location.pathname
</script>

<nav>
  <a href="/" class:active={currentPath === '/'}>home</a>
  <a href="/about" class:active={currentPath === '/about'}>about</a>
</nav>

<style>
  a.active {
    color: yellowgreen;
  }
</style>
