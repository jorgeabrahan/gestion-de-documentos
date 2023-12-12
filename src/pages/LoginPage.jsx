export const LoginPage = () => {
  return (
    <>
      <h1>Iniciar sesion</h1>
      <form>
        <label htmlFor="email">Correo:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Contraseña:</label>
        <input type="password" name="password" id="password" />
      </form>
    </>
  )
}
