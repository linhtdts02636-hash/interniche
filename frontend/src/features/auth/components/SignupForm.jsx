import { useState } from "react";
import useSignup from "../hooks/useSignup";

function SignupForm() {
  const { signup, loading, error } = useSignup();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(username, email, password);
  };

  return (
    <div>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
