<script lang="ts">
  import { type ModalType, modalStore } from '../lib/modals'

  let currentModalType: ModalType | null
  $: currentModalType = null

  // this is loading twice since it loads in the iframe, so weird
  // maybe lets not do it in a modal?
  modalStore.subscribe((type) => {
    currentModalType = type
  })
</script>

{#if currentModalType === 'spotify-login'}
  <div id="modal-container">
    <iframe title="login with spotify" src="/spotify-login" frameborder="0" />
  </div>
{/if}

<style>
  #modal-container {
    position: absolute;
    height: 90vh;
    width: 80vw;
    border: solid white 1px;
    border-radius: 5px;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
