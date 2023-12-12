import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
