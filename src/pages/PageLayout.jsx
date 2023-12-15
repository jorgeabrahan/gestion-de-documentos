import PropTypes from 'prop-types'
import { Navbar } from '../global/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { MODAL_IDS, authStore, dataStore } from '../stores'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordModal, CreateDocumentModal } from '../modals'
import { getAllUsers, getDocumentTypes } from '../firebase/database'
import { ManageDocumentTypesModal } from '../modals/ManageDocumentTypesModal'

export const PageLayout = ({ children, needsToBeAdmin = false }) => {
  const { user } = authStore((store) => store)
  const { modalToShow, setUsers, setDocumentTypes } = dataStore(store => store)
  const navigate = useNavigate()
  useEffect(() => {
    if (needsToBeAdmin && user.role !== 'admin') {
      navigate('/', { replace: true })
    }
  }, [navigate, needsToBeAdmin, user.role])
  // cargar todos los usuarios una vez el sitio cargue
  useEffect(() => {
    getAllUsers().then((users) => setUsers(users))
    getDocumentTypes().then(res => {
      if (res.error !== null) {
        toast.error('No se pudieron cargar los tipos de documentos')
        return
      }
      setDocumentTypes(res?.documentTypes)
    })
  }, [setUsers, setDocumentTypes])
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
      <Navbar />
      <main className="delimiter">{children}</main>
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node,
  needsToBeAdmin: PropTypes.bool
}
