import { AUTH_STATUS, authStore, initialUser } from '../../stores'

export const useAuth = () => {
  const { setUser, setStatus, setError } = authStore((store) => store)
  const startChecking = () => {
    setError(null)
    setStatus(AUTH_STATUS.checking)
  }
  const login = (user) => {
    setUser({ displayName: user.displayName, email: user.email, uid: user.uid })
    setError(null)
    setStatus(AUTH_STATUS.authorized)
  }
  const logout = () => {
    setUser(initialUser)
    setStatus(AUTH_STATUS.unauthorized)
  }
  const logoutWithError = (error = null) => {
    logout()
    setError(error)
  }
  return { startChecking, login, logout, logoutWithError }
}
