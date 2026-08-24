import { NavLink } from "react-router-dom";
import "../styles/style.css";
import { Search, Bell, PersonCircle } from "react-bootstrap-icons";

function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-lg secondary-color ">
      <div className="container-fluid">
        {/* brand section, for interniche logo */}
        <a className="navbar-brand" href="#">
          [placeholder logo]
        </a>

        {/* search bar container */}
        <div className="d-none d-sm-block w-50 w-md-33 position-absolute top-50 start-50 translate-middle">
          <form
            className="d-flex input-group bg-dark rounded-gradient-border w-100"
            role="search"
          >
            <input
              className="form-control border-0 bg-transparent text-white"
              type="search"
              placeholder="Search"
            />
            <button className="btn border-0 shadow-none" type="submit">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* right-side buttons (notification and profile dropdowns) */}
        <div className="ms-auto rounded-gradient-border d-flex">
          {/* mobile search trigger button */}
          <div className="d-sm-none">
            <button className="btn border-0 shadow-none " type="button">
              <Search size={18} />
            </button>
          </div>
          {/* notifications */}
          <div className="dropdown">
            <button
              className="btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Bell size={18} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>

          {/* profile */}
          <div className="dropdown">
            <button
              className="btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <PersonCircle size={18} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
