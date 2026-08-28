import { useAuth } from "../context/AuthContext";
import GuestRoutes from "./GuestRoutes";
import UserRoutes from "./UserRoutes";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user === null) {
    return <GuestRoutes />;
  }

  return <UserRoutes />;
}

export default AppRoutes;
