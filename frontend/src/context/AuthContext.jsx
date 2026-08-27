import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, logoutUser, validateMe } from "../features/auth/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function login(idToken) {
    try {
      setLoading(true);
      setError(null);
      var result = await loginUser(idToken);

      if (result.code) {
        setError(result.error);
        return result.error;
      }

      setUser(result);
      return null;
    } catch (error) {
      setError(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  }

  async function register(idToken, username) {
    try {
      setLoading(true);
      setError(null);
      var result = await registerUser(idToken, username);

      if (result.code) {
        setError(result.error);
        return result.error;
      }

      setUser(result);
      return null;
    } catch (error) {
      setError(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      setError(null);
      var result = await logoutUser();

      if (result.code) {
        setError(result.error);
        return result.error;
      }

      setUser(null);
      return null;
    } catch (error) {
      setError(error.message);
      return error.message;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function validate() {
      try {
        setLoading(true);
        var result = await validateMe();

        if (result.code) {
          setUser(null);
        } else {
          setUser(result);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    validate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
export default AuthProvider;
