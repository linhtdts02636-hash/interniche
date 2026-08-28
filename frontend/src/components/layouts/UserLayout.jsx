import { Outlet } from "react-router-dom";
import { Bell, PersonCircle } from "react-bootstrap-icons";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Dropdown from "../Dropdown";
import sidebarLinks from "./sidebarLinks";
import useLogout from "../../features/auth/hooks/useLogout";

function UserLayout() {
  const { logout, loading } = useLogout();

  return (
    <>
      <Navbar
        actions={
          <>
            {/* Notifications dropdown */}
            <Dropdown trigger={<Bell size={18} />} triggerLabel="Notifications">
              <li>
                <a className="dropdown-item" href="#">
                  Test
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Test
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Test
                </a>
              </li>
            </Dropdown>

            {/* Profile dropdown */}
            <Dropdown
              trigger={<PersonCircle size={18} />}
              triggerLabel="User profile"
            >
              <li>
                <button className="dropdown-item text-danger" onClick={logout}>
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </li>
            </Dropdown>
          </>
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

export default UserLayout;