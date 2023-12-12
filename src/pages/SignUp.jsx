import {
  Input,
  PrimaryButton,
  SectionSubtitle,
  SectionTitle
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { useForm } from '../hooks'
import { CenteredBoxLayout } from '../layouts'

export const SignUp = () => {
  const { displayName, email, password, confirmPassword, onInputChange } =
    useForm({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(displayName, email, password, confirmPassword)
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
          />
          <Input
            label="Correo electronico"
            id="email"
            type="email"
            value={email}
            handleChange={onInputChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            value={password}
            handleChange={onInputChange}
          />
          <Input
            className="mb-8"
            label="Confirmar contraseña"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChange={onInputChange}
          />
          <PrimaryButton text="Crear cuenta" className="w-full" />
        </form>
        <PrimaryLink
          className="block mx-auto mt-4"
          text="¿Ya tienes una cuenta?"
          to="/iniciar-sesion"
        />
      </CenteredBoxLayout>
    </main>
  )
}
