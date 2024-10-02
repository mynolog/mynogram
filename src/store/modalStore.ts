import { create } from 'zustand'

export type ActiveModalFlag = 'select' | 'create' | 'edit' | 'delete'

type ModalState = {
  activeModal: ActiveModalFlag | null
  openModal: (modalId: ActiveModalFlag) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (modalId: ActiveModalFlag) =>
    set({
      activeModal: modalId,
    }),
  closeModal: () => set({ activeModal: null }),
}))

export default useModalStore
