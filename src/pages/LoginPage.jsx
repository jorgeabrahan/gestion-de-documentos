import { useEffect } from 'react'
import {
  Input,
  PrimaryButton,
  SectionTitle,
  SectionSubtitle,
  SecondaryDescription
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { loginWithEmailAndPassword } from '../firebase/auth'
import { useForm } from '../hooks'
import { useAuth } from '../hooks/auth/useAuth'
import { CenteredBoxLayout } from '../layouts'
import { AUTH_STATUS, USER_ROLES, authStore } from '../stores'
import { createUserColection } from '../firebase/database'

export const LoginPage = () => {
  const { user, status, error, setError } = authStore(
    (store) => store
  )
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })
  useEffect(() => setError(null), [setError])
  const { login, logoutWithError, startChecking } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError('Porfavor llena todos los campos')
      return
    }
    startChecking()
    loginWithEmailAndPassword({ email, password }).then((res) => {
      if (res?.ok) {
        createUserColection(res?.uid).then((data) => {
          login({ uid: res?.uid, displayName: res?.displayName, email, role: data?.role })
        })
        return
      }
      logoutWithError(res?.errorMessage)
    })
  }
  return (
    <main className="delimiter grid place-items-center h-[100vh]">
      <CenteredBoxLayout>
        <SectionTitle isCentered={true} text="Inicia Sesión" />
        <SectionSubtitle
          isCentered={true}
          className="mb-8"
          text="Accede a tu cuenta para iniciar."
        />
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            label="Correo electronico"
            id="email"
            type="email"
            value={email}
            handleChange={onInputChange}
            isRequired={true}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            handleChange={onInputChange}
            isRequired={true}
          />
          {error !== null && error !== '' && (
            <SecondaryDescription text={error} />
          )}
          {/* mensaje para mostrar si su cuenta aun no ha sido aprobada */}
          {(user?.uid !== null || user?.uid !== '') &&
            user?.role === USER_ROLES.pending && (
              <SecondaryDescription text="El administrador de tu organización aun no ha permitido tu acceso por lo que no puedes ingresar" />
            )}
          <PrimaryButton
            text="Iniciar sesión"
            className="w-full"
            isDisabled={status === AUTH_STATUS.checking}
          />
        </form>
        {status !== AUTH_STATUS.checking && (
          <PrimaryLink
            className="block mx-auto mt-4"
            text="¿No tienes una cuenta?"
            to="/crear-cuenta"
          />
        )}
      </CenteredBoxLayout>
    </main>
  )
}
