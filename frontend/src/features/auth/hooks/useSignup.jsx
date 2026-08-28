import { auth } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

function useSignup() {
  const { register, loading, setError, error } = useAuth();
  async function signup(username, email, password) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await credentials.user.getIdToken();
      const result = await register(idToken, username);
      return !result;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }
  return { signup, loading, error };
}

export default useSignup;
