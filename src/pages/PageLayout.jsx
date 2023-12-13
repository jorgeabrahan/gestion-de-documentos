import PropTypes from 'prop-types'
import { Navbar } from '../global/Navbar'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { MODAL_IDS, authStore, dataStore } from '../stores'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordModal } from '../modals'

export const PageLayout = ({ children, needsToBeAdmin = false }) => {
  const { user } = authStore((store) => store)
  const { modalToShow } = dataStore(store => store)
  const navigate = useNavigate()
  useEffect(() => {
    if (needsToBeAdmin && user.role !== 'admin') {
      navigate('/', { replace: true })
    }
  }, [navigate, needsToBeAdmin, user.role])
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {modalToShow === MODAL_IDS.changePassword && (
        <ChangePasswordModal />
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
