import {
  Input,
  PrimaryButton,
  GoogleSignInButton,
  SectionTitle,
  SectionSubtitle
} from '../components'
import { PrimaryLink } from '../components/PrimaryLink'
import { CenteredBoxLayout } from '../layouts'

export const LoginPage = () => {
  return (
    <main className="delimiter grid place-items-center h-[100vh]">
      <CenteredBoxLayout>
        <SectionTitle isCentered={true} text="Inicia Sesión" />
        <SectionSubtitle
          isCentered={true}
          className="mb-8"
          text="Accede a tu cuenta para iniciar."
        />
        <form className="grid gap-4">
          <Input label="Correo electronico" id="email" />
          <Input
            className="mb-8"
            label="Contraseña"
            id="password"
            type="password"
          />
          <PrimaryButton text="Iniciar sesión" className="w-full" />
          <GoogleSignInButton />
        </form>
        <PrimaryLink
          className="block mx-auto mt-4"
          text="¿No tienes una cuenta?"
          to='/crear-cuenta'
        />
      </CenteredBoxLayout>
    </main>
  )
}
