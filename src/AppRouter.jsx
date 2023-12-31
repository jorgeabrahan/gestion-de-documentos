import { Route, Routes } from 'react-router-dom'
import { DocumentPage, DocumentsPage, HomePage, LoginPage, SignUp, Users } from './pages'
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
      <Route path="/usuarios" element={<PrivateRoute element={Users} />} />
      <Route path="/documentos/:documentId" element={<PrivateRoute element={DocumentPage} />} />
      <Route path="/documentos" element={<PrivateRoute element={DocumentsPage} />} />
    </Routes>
  )
}
