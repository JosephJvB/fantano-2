<script lang="ts">
  import { type ModalType, modalStore } from '../lib/modals'

  let currentModalType: ModalType | null
  $: currentModalType = null

  // need to close on outside click
  // attach an event listener to window / body?
  modalStore.subscribe((type: ModalType) => {
    currentModalType = type
  })
</script>

{#if currentModalType === 'spotify-login'}
  <!-- struggling to get this element to be full height of html body -->
  <div
    id="modal-background"
    on:click={() => {
      modalStore.set(null)
    }}
  >
    <div id="modal-container" aria-modal="true" on:click|stopPropagation>
      <iframe title="login with spotify" src="/spotify-login" frameborder="0" />
    </div>
  </div>
{/if}

<style>
  #modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
  }
  #modal-container {
    position: sticky;
    height: 80vh;
    width: 80vw;
    border: solid white 1px;
    border-radius: 5px;
    z-index: 2;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    margin: auto;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
