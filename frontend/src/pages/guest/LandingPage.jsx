import { NavLink } from "react-router-dom";
function LandingPage() {
  return (
    <div className="container">
      {/* testing */}
      <NavLink to="/signup">
        <button className="btn">Sign up</button>
      </NavLink>

      <NavLink to="/login">
        <button className="btn">Login</button>
      </NavLink>
    </div>
  );
}

export default LandingPage;
