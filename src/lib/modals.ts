import { atom } from 'nanostores'

export type ModalType = 'spotify-login'

export const modalStore = atom<ModalType | null>(null)

modalStore.subscribe((type, prev) => {
  // document.body.style.overflowY = type === null ? 'initial' : 'hidden'
  // document.body.style.height = '100vh'
})
