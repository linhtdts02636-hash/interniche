import { useState } from "react";
import useLogin from "../hooks/useLogin";

function LoginForm() {
  const { signin, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signin(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your username"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
