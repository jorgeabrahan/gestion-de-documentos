import { create } from 'zustand'

export const authStore = create((set) => ({
  user: { displayName: '', email: '', uid: '' },
  status: 'unauthorized', // unauthorized || authorized || checking
  error: null, // string || null
  setUser: (user) => set((state) => ({ ...state, user })),
  setStatus: (status) => set((state) => ({ ...state, status })),
  setError: (error) => set((state) => ({ ...state, error }))
}))
