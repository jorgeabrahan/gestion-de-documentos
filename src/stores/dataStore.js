import { create } from 'zustand'

export const MODAL_IDS = {
    changePassword: 'changePassword'
}

export const dataStore = create((set) => ({
  users: [],
  modalToShow: null,
  setUsers: (users) => set((state) => ({ ...state, users })),
  setModalToShow: (modalToShow) => set(state => ({ ...state, modalToShow }))
}))
