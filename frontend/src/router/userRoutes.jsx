import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../components/layouts/UserLayout";
import DiscoveryPage from "../pages/user/DiscoveryPage";

function UserRoutes() {
  return (
    // testing
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/discovery" element={<DiscoveryPage></DiscoveryPage>} />
      </Route>
      <Route path="*" element={<Navigate to="/discovery" replace />} />
    </Routes>
  );
}

export default UserRoutes;