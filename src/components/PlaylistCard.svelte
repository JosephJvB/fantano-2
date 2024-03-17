<script lang="ts">
  import Like from './Like.svelte'
  import { getSpotifyCookie } from '../lib/cookies'
  import { modalStore } from '../lib/modals'

  export let playlist: {
    id: string
    year: number
    numTracks: number
    liked: boolean
  }

  function clickLike() {
    console.log('clicked', playlist.id)
    const token = getSpotifyCookie()
    if (!token) {
      // open modal to start login
      modalStore.set('spotify-login')
    }
  }
</script>

<li class="link-card">
  <Like on:like={clickLike} liked={playlist.liked} />
  <a href={`/playlists/${playlist.id}`}>
    <h2>
      {`${playlist.year} playlist`}
      <span>&rarr;</span>
    </h2>
    <p>
      {`x${playlist.numTracks} tracks`}
    </p>
  </a>
</li>

<style>
  .link-card {
    position: relative;
    list-style: none;
    display: flex;
    padding: 1px;
    background-color: #23262d;
    background-image: none;
    background-size: 400%;
    border-radius: 7px;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  .link-card > a {
    width: 100%;
    text-decoration: none;
    line-height: 1.4;
    padding: calc(1.5rem - 1px);
    border-radius: 8px;
    background-color: #23262d;
    opacity: 0.8;
  }
  h2 {
    margin: 0;
    font-size: 1.25rem;
    transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  .link-card:is(:hover, :focus-within) {
    background-position: 0;
    background-image: var(--accent-gradient);
  }
  .link-card:is(:hover, :focus-within) h2 {
    color: rgb(var(--accent-light));
  }
</style>
