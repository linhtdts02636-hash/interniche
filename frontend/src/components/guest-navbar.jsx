import { NavLink } from "react-router-dom";
import "../styles/style.css";
import { Search, Bell, PersonCircle } from "react-bootstrap-icons";

function GuestNavbar() {
  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
    >
      <div className="container-fluid">
        {/* brand section, for interniche logo */}
        <a className="navbar-brand" href="#">
          [placeholder logo]
        </a>

        {/* search bar */}
        <search>
          <form
            className="d-flex position-absolute top-50 start-50 translate-middle w-50 input-group bg-dark rounded-gradient-border"
            role="search"
          >
            <input
              className="form-control border-0 bg-transparent"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn border-0" type="submit">
              <Search size={18} className="" />
            </button>
          </form>
        </search>

        {/* right-side buttons */}
        <div className="ms-auto rounded-gradient-border d-flex">
          {/* sign in button */}
          <NavLink to="/login" className="btn btn-linkbtn bg-transparent border-0 text-decoration-none">
            <PersonCircle size={18} className="me-2" />
            Sign in
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default GuestNavbar;
