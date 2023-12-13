import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { AUTH_STATUS, authStore } from './stores'

export function PublicRoute({ element: Component, ...props }) {
  const { status } = authStore((state) => state)
  const location = useLocation()

  return status !== AUTH_STATUS.authorized ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired
}
