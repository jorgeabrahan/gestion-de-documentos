import { create } from 'zustand'

export const AUTH_STATUS = {
    checking: 'checking',
    authorized: 'authorized',
    unauthorized: 'unauthorized'
}

export const initialUser = { displayName: null, email: null, uid: null }

export const authStore = create((set) => ({
  user: initialUser,
  status: AUTH_STATUS.unauthorized,
  error: null, // string || null
  setUser: (user) => set((state) => ({ ...state, user })),
  setStatus: (status) => set((state) => ({ ...state, status })),
  setError: (error) => set((state) => ({ ...state, error }))
}))
