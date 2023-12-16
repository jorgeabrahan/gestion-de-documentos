import PropTypes from 'prop-types'
import { Navbar } from '../global/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { MODAL_IDS, dataStore } from '../stores'
import { ChangePasswordModal, CreateDocumentModal, ManageDocumentTypesModal, CreateCommentModal } from '../modals'
import { getAllUsers, getDocumentTypes, getDocuments } from '../firebase/database'

export const PageLayout = ({ children }) => {
  const { modalToShow, setUsers, setDocumentTypes, setDocuments } = dataStore(store => store)
  // cargar todos los usuarios una vez el sitio cargue
  useEffect(() => {
    getAllUsers().then((res) => {
      if (res?.error !== null) {
        toast.error('No se pudieron cargar los usuarios')
        return
      }
      setUsers(res?.users)
    })
    getDocumentTypes().then(res => {
      if (res.error !== null) {
        toast.error('No se pudieron cargar los tipos de documentos')
        return
      }
      setDocumentTypes(res?.documentTypes)
    })
    getDocuments().then(res => {
      if (res.error !== null) {
        toast.error('No se pudieron cargar los documentos')
        return
      }
      setDocuments(res?.documents)
    })
  }, [setUsers, setDocumentTypes, setDocuments])
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {modalToShow === MODAL_IDS.changePassword && (
        <ChangePasswordModal />
      )}
      {modalToShow === MODAL_IDS.createDocument && (
        <CreateDocumentModal />
      )}
      {modalToShow === MODAL_IDS.manageDocumentTypes && (
        <ManageDocumentTypesModal />
      )}
      {modalToShow === MODAL_IDS.addComment && (
        <CreateCommentModal />
      )}
      <Navbar />
      <main className="delimiter">{children}</main>
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node
}
