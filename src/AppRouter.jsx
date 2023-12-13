import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, SignUp } from './pages'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/iniciar-sesion"
        element={<PublicRoute element={LoginPage} />}
      />
      <Route path="/crear-cuenta" element={<PublicRoute element={SignUp} />} />
      <Route path="/" element={<PrivateRoute element={HomePage} />} />
    </Routes>
  )
}
