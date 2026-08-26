import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/guest/SignupPage";
import LoginPage from "../pages/guest/LoginPage";

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage></SignupPage>} />
      <Route path="/login" element={<LoginPage></LoginPage>} />
    </Routes>
  );
}
export default GuestRoutes;
