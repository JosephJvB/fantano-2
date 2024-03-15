<script lang="ts">
  import { onMount } from 'svelte'
  import type { ISpotifyTrack } from 'jvb-spotty-models'
  import Pagination from './Pagination.svelte'
  import { PAGE_LIMIT } from '../lib/spotifyApi'

  export let tracks: ISpotifyTrack[]
  $: pageQuery = parseInt(
    new URLSearchParams(window.location.search).get('p') ?? '1'
  )
  $: lowerLimit = (pageQuery - 1) * PAGE_LIMIT
  $: numPages = Math.ceil(tracks.length / PAGE_LIMIT)
  $: pageTracks = tracks.slice(lowerLimit, pageQuery * PAGE_LIMIT)

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
</script>

<Pagination
  itemLabel="tracks"
  pageItemCount={pageTracks.length}
  totalItemCount={tracks.length}
  {lowerLimit}
  {numPages}
  {pageQuery}
/>
<ul>
  {#each pageTracks as track}
    <li class="track loaded">
      "{track.name}" by {track.artists[0].name}
    </li>
  {/each}
</ul>
<Pagination
  itemLabel="tracks"
  pageItemCount={pageTracks.length}
  totalItemCount={tracks.length}
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
