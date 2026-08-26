import { auth } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

function useLogin() {
  const { login, loading, setError, error } = useAuth();
  async function signin(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await credentials.user.getIdToken();
      const result = await login(idToken);
      return !result;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }
  return { signin, loading, error };
}

export default useLogin;
