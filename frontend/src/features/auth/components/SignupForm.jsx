import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { signup, loading, error } = useSignup();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const showMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    const ok = await signup(username, email, password);
    if (ok) navigate("/discovery");
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="email"
          placeholder="abc@mail.com"
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
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password
        </label>
        <input
          type="password"
          className={`form-control ${showMismatch ? "is-invalid" : ""}`}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Re-enter your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {showMismatch && (
          <div className="invalid-feedback d-block">Passwords do not match</div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;