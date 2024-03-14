<script lang="ts">
  import { onMount } from 'svelte'
  import Pagination from './Pagination.svelte'

  export let trackIds: string[]
  $: pageQuery = parseInt(
    new URLSearchParams(window.location.search).get('p') ?? '1'
  )
  $: lowerLimit = (pageQuery - 1) * 100
  $: numPages = Math.ceil(trackIds.length / 100)
  $: pageTracks = trackIds.slice(lowerLimit, pageQuery * 100)

  onMount(() => {
    // first page
    if (isNaN(pageQuery) || pageQuery < 1) {
      const search = new URLSearchParams(window.location.search)
      search.delete('p')
      window.location.search = search.toString()
      return
    }

    // last page
    if (pageQuery > numPages) {
      const search = new URLSearchParams(window.location.search)
      search.set('p', numPages.toString())
      window.location.search = search.toString()
      return
    }
  })

  $: loadTracks = new Promise<
    Array<{
      id: string
      name: string
      artists: Array<{ name: string }>
    }>
  >((r) =>
    setTimeout(() => {
      r(
        pageTracks.map((id) => ({
          id: id,
          name: `name_${id.substring(0, 5)}`,
          artists: [{ name: `artist_${id.substring(0, 5)}` }],
        }))
      )
    }, 300)
  )
</script>

<Pagination
  itemLabel="tracks"
  pageItemCount={pageTracks.length}
  totalItemCount={trackIds.length}
  {lowerLimit}
  {numPages}
  {pageQuery}
/>
<ul>
  {#await loadTracks}
    {#each pageTracks as _}
      <li class="track loading"></li>
    {/each}
  {:then loadedTracks}
    {#each loadedTracks as track}
      <li class="track loaded">
        "{track.name}" by {track.artists[0].name}
      </li>
    {/each}
  {/await}
</ul>
<Pagination
  itemLabel="tracks"
  pageItemCount={pageTracks.length}
  totalItemCount={trackIds.length}
  {lowerLimit}
  {numPages}
  {pageQuery}
/>

<style>
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
  .track {
    width: 100%;
    height: 50px;
    border-radius: 7px;
    margin-bottom: 10px;
    background-color: grey;
  }
  .loading {
  }
  .loaded {
  }
</style>
