import { NavLink } from "react-router-dom";
import "../styles/style.css";
import {
  ChatDots,
  ChatDotsFill,
  Gear,
  GearFill,
  Bell,
  BellFill,
  ArrowLeft
} from "react-bootstrap-icons";
function UserSidebar() {
  return (
    <div className="sidebar-wrapper secondary-color flex-shrink-0 d-none d-sm-block">
      <aside className="sidebar">
        <div className="container-fluid">
<button className="btn border-0 w-100 text-end"><ArrowLeft /></button>
        <ul className="list-unstyled   d-flex flex-column  gap-3 ">
          <li>
            <NavLink to="/home" className="icon-trigger">
              <ChatDots className="default-icon" />{" "}
              <ChatDotsFill className="hover-icon" />{" "}
              <span className="ms-3">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className="icon-trigger">
              <ChatDots className="default-icon" />{" "}
              <ChatDotsFill className="hover-icon" />{" "}
              <span className="ms-3">Direct Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className="icon-trigger">
              <Bell className="default-icon" />{" "}
              <BellFill className="hover-icon" />{" "}
              <span className="ms-3">Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className="icon-trigger">
              <Gear className="default-icon" />{" "}
              <GearFill className="hover-icon" />{" "}
              <span className="ms-3">Settings</span>
            </NavLink>
          </li>
          <hr className="border border-light" />
          <li>
            <NavLink to="/home" className="icon-trigger">
              <ChatDots className="default-icon" />{" "}
              <ChatDotsFill className="hover-icon" /> <span>Home</span>
            </NavLink>
          </li>
            </ul>
        </div>
        
      </aside>
    </div>
  );
}
export default UserSidebar;
