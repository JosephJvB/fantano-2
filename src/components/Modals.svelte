<script lang="ts">
  import { type ModalType, modalStore } from '../lib/modals'

  // https://svelte.dev/examples/modal
  let dialogRef: HTMLDialogElement

  let currentModalType: ModalType | null
  $: currentModalType = null

  modalStore.subscribe((type: ModalType | null) => {
    currentModalType = type

    if (!dialogRef) {
      return
    }

    if (type === null) {
      document.body.style.overflowY = 'initial'
      dialogRef.close()
    } else {
      document.body.style.overflowY = 'hidden'
      dialogRef.showModal()
    }
  })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialogRef}
  on:close={() => modalStore.set(null)}
  on:click|self={() => modalStore.set(null)}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div id="modal-container" on:click|stopPropagation>
    <button class="close-button" on:click={() => dialogRef.close()}>x</button>
    {#if currentModalType === 'spotify-login'}
      <iframe
        allow="frame-ancestors 'self' accounts.spotify.com"
        title="login with spotify"
        src="/spotify-login"
        frameborder="0"
      />
    {/if}
  </div>
</dialog>

<style>
  dialog {
    border-radius: 0.2em;
    border: none;
    padding: 0;
    overflow: hidden;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  #modal-container {
    height: 600px;
    width: 500px;
    max-width: 100%;
    border: solid white 1px;
    border-radius: 5px;
    position: relative;
  }
  #modal-container .close-button {
    all: unset;
    padding: 5px 10px;
    cursor: pointer;
    background-color: black;
    color: white;
    border: solid 1px white;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  iframe body {
    margin: 0;
  }
</style>
