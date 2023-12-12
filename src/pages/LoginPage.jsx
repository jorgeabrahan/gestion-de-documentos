import {
  Input,
  PrimaryButton,
  GoogleSignInButton,
  SectionTitle,
  SectionSubtitle
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { useForm } from '../hooks'
import { CenteredBoxLayout } from '../layouts'

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
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
            type='email'
            value={email}
            handleChange={onInputChange}
            isRequired={true}
          />
          <Input
            className="mb-8"
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            handleChange={onInputChange}
            isRequired={true}
          />
          <PrimaryButton text="Iniciar sesión" className="w-full" />
          <GoogleSignInButton />
        </form>
        <PrimaryLink
          className="block mx-auto mt-4"
          text="¿No tienes una cuenta?"
          to="/crear-cuenta"
        />
      </CenteredBoxLayout>
    </main>
  )
}
