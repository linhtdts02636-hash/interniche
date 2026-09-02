import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "../components/layouts/GuestLayout";
import SignupPage from "../pages/guest/SignupPage";
import LoginPage from "../pages/guest/LoginPage";
import LandingPage from "../pages/guest/LandingPage";

function GuestRoutes() {
  return (
    // testing
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default GuestRoutes;