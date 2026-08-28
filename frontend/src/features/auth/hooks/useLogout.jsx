import { useAuth } from "../../../context/AuthContext";

function useLogout() {
  const { logout, loading, error } = useAuth();

  return { logout, loading, error };
}

export default useLogout;