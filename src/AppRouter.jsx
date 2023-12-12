import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, SignUp } from "./pages";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/crear-cuenta" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
