import { Outlet, NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import sidebarLinks from "./sidebarLinks";

function GuestLayout() {
  return (
    <>
      <Navbar
        actions={
          <NavLink
            to="/login"
            className="btn btn-link bg-transparent border-0 text-decoration-none"
          >
            <PersonCircle size={18} className="me-2" />
            Login
          </NavLink>
        }
      />
      <div className="app-body">
        <Sidebar links={sidebarLinks} />
        <div className="container">
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default GuestLayout;