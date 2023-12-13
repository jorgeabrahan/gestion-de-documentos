import { Home, Logout, Users } from '../assets/icons'
import { useAuth } from '../hooks/auth/useAuth'
import { Account, PageButton, PageLink } from './navbar-c'

export const Navbar = () => {
  const { logout } = useAuth()
  return (
    <nav className="delimiter py-4">
      <section className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Account />
          <PageLink to="/" tooltip="Inicio">
            <Home />
          </PageLink>
          <PageLink to="/usuarios" tooltip="Usuarios" needsToBeAdmin={true}>
            <Users />
          </PageLink>
        </div>
        <PageButton
          tooltip="Cerrar sesión"
          isPrimary={true}
          handleClick={logout}
        >
          <Logout />
        </PageButton>
      </section>
    </nav>
  )
}
