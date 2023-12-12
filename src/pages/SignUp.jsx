import { Input, PrimaryButton, SectionSubtitle, SectionTitle } from "../components";
import { PrimaryLink } from "../components/PrimaryLink";
import { CenteredBoxLayout } from "../layouts";

export const SignUp = () => {
  return (
    <main className="delimiter grid place-items-center h-[100vh]">
      <CenteredBoxLayout>
        <SectionTitle isCentered={true} text="Crear Cuenta" />
        <SectionSubtitle
          isCentered={true}
          className="mb-8"
          text="Crea una cuenta para iniciar."
        />
        <form className="grid gap-4">
          <Input label="Nombre completo" id="displayName" />
          <Input label="Correo electronico" id="email" type="email" />
          <Input
            label="Contraseña"
            id="password"
            type="password"
          />
          <Input
            className="mb-8"
            label="Confirmar contraseña"
            id="confirmPassword"
            type="confirmPassword"
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
  );
}
