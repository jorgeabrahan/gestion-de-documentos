import {
  Input,
  PrimaryButton,
  GoogleSignInButton,
  SectionTitle,
  SectionSubtitle,
  SecondaryDescription
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { loginWithEmailAndPassword } from '../firebase/auth'
import { useForm } from '../hooks'
import { useAuth } from '../hooks/auth/useAuth'
import { CenteredBoxLayout } from '../layouts'
import { AUTH_STATUS, authStore } from '../stores'

export const LoginPage = () => {
  const { status, error, setError } = authStore(store => store)
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })
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
        login({ uid: res?.uid, displayName: res?.displayName, email })
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
          {(error !== null && error !== '') && <SecondaryDescription text={error} />}
          <PrimaryButton text="Iniciar sesión" className="w-full" isDisabled={status === AUTH_STATUS.checking} />
          <GoogleSignInButton isDisabled={status === AUTH_STATUS.checking} />
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
