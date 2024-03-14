<script lang="ts">
  export let pageQuery: number
  export let numPages: number
  export let lowerLimit: number
  export let pageItemCount: number
  export let totalItemCount: number
  export let itemLabel: string | undefined
</script>

<p>
  {itemLabel}
  {lowerLimit}-{lowerLimit + pageItemCount} of {totalItemCount}
</p>
<p>
  {#if pageQuery > 1}
    <a href={`${window.location.pathname}?p=${pageQuery - 1}`}>{'<'}</a>
  {/if}
  {#each Array(numPages).fill(0) as _, idx}
    <a
      href={`${window.location.pathname}?p=${idx + 1}`}
      class:active={pageQuery === idx + 1}>{idx + 1}</a
    >
  {/each}
  {#if pageQuery < numPages}
    <a href={`${window.location.pathname}?p=${pageQuery + 1}`}>{'>'}</a>
  {/if}
</p>

<style>
  .active {
    color: yellowgreen;
  }
</style>
