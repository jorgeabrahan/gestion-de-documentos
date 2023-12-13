import { useEffect } from 'react'
import {
  Input,
  PrimaryButton,
  SecondaryDescription,
  SectionSubtitle,
  SectionTitle
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { registerWithEmailAndPassword } from '../firebase/auth'
import { checkName, checkPassword } from '../helpers/auth'
import { useForm } from '../hooks'
import { useAuth } from '../hooks/auth/useAuth'
import { CenteredBoxLayout } from '../layouts'
import { AUTH_STATUS, USER_ROLES, authStore } from '../stores'
import { createUserColection } from '../firebase/database'

export const SignUp = () => {
  const { user, status, error, setError } = authStore(
    (store) => store
  )
  const { displayName, email, password, confirmPassword, onInputChange } =
    useForm({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  useEffect(() => setError(null), [setError])
  const { login, logoutWithError, startChecking } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      displayName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      setError('Porfavor llena todos los campos')
      return
    }
    const { isValid: isNameValid, error: nameError } = checkName(displayName)
    if (!isNameValid) {
      setError(nameError)
      return
    }
    const { isValid: isPasswordValid, error: passwordError } =
      checkPassword(password)
    if (!isPasswordValid) {
      setError(passwordError)
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    startChecking()
    registerWithEmailAndPassword({ email, password, displayName }).then(
      (res) => {
        if (res?.ok) {
          // cuando una cuenta esta recien creada debe ser aprobada por el administrador de la organización
          createUserColection(res?.uid, USER_ROLES.pending)
          login({ uid: res?.uid, displayName: res?.displayName, email, role: USER_ROLES.pending })
          return
        }
        logoutWithError(res?.errorMessage)
      }
    )
  }
  return (
    <main className="delimiter grid place-items-center h-[100vh]">
      <CenteredBoxLayout>
        <SectionTitle isCentered={true} text="Crear Cuenta" />
        <SectionSubtitle
          isCentered={true}
          className="mb-8"
          text="Crea una cuenta para iniciar."
        />
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre completo"
            id="displayName"
            value={displayName}
            handleChange={onInputChange}
            isRequired={true}
          />
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
          <Input
            label="Confirmar contraseña"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChange={onInputChange}
            isRequired={true}
          />
          {error !== null && error !== '' && (
            <SecondaryDescription text={error} />
          )}
          {/* mensaje para mostrar una vez se cree la cuenta */}
          {(user?.uid !== null || user?.uid !== '') &&
            user?.role === USER_ROLES.disabled && (
              <SecondaryDescription text="El administrador de tu organización fue notificado de la creación de tu cuenta, espera a que el te permita el acceso, una vez lo haga podras iniciar sesión con tus credenciales" />
            )}
          <PrimaryButton
            text="Crear cuenta"
            className="w-full"
            isDisabled={status === AUTH_STATUS.checking}
          />
        </form>
        {status !== AUTH_STATUS.checking && (
          <PrimaryLink
            className="block mx-auto mt-4"
            text="¿Ya tienes una cuenta?"
            to="/iniciar-sesion"
          />
        )}
      </CenteredBoxLayout>
    </main>
  )
}
