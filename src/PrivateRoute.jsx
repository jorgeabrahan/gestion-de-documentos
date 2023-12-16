import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { AUTH_STATUS, authStore } from './stores'
import { PageLayout } from './pages/PageLayout'

export function PrivateRoute({ element: Component, ...props }) {
  const { status } = authStore((state) => state)
  const location = useLocation()

  return status === AUTH_STATUS.authorized ? (
    <PageLayout>
      <Component {...props} />
    </PageLayout>
  ) : (
    <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
  )
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired
}
