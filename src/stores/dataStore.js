import { create } from 'zustand'

export const MODAL_IDS = {
  changePassword: 'changePassword',
  createDocument: 'createDocument',
  manageDocumentTypes: 'manageDocumentTypes',
  addComment: 'addComment'
}

export const DOCUMENT_STATES = {
  solicitud: 'solicitud', // default
  proceso: 'proceso',
  cerrado: 'cerrado'
}

export const dataStore = create((set) => ({
  users: [],
  documentTypes: [],
  documents: [],
  documentComments: [],
  modalToShow: null,
  setUsers: (users) => set((state) => ({ ...state, users })),
  setModalToShow: (modalToShow) => set((state) => ({ ...state, modalToShow })),
  setDocumentTypes: (documentTypes) =>
    set((state) => ({ ...state, documentTypes })),
  addDocumentType: (documentType) =>
    set((state) => ({
      ...state,
      documentTypes: [...state.documentTypes, documentType]
    })),
  removeDocumentType: (documentId) =>
    set((state) => ({
      ...state,
      documentTypes: state?.documentTypes?.filter((dt) => dt.id !== documentId)
    })),
  setDocuments: (documents) => set((state) => ({ ...state, documents })),
  addDocument: (document) =>
    set((state) => ({ ...state, documents: [...state.documents, document] })),
  setDocumentComments: (documentComments) =>
    set((state) => ({ ...state, documentComments })),
  addDocumentComment: (documentComment) =>
    set((state) => ({
      ...state,
      documentComments: [...state.documentComments, documentComment]
    }))
}))
