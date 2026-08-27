import { useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import AuthProvider from "./context/AuthContext";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
