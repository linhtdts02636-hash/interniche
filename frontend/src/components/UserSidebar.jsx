import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  ChatDots,
  ChatDotsFill,
  Gear,
  GearFill,
  Bell,
  BellFill,
  ArrowLeft,
  ArrowRight,
  HouseDoor,
  HouseDoorFill,
} from "react-bootstrap-icons";

// Reusable sidebar nav link — swaps between outline/filled icon based on active route
function UserSideBarLink({ to, icon: Icon, activeIcon: ActiveIcon, text }) {
  return (
    <li>
      <NavLink to={to} className="icon-trigger nav-link">
        {({ isActive }) => (
          <>
            {isActive ? (
              <ActiveIcon className="default-icon" />
            ) : (
              <Icon className="active-icon" />
            )}
            <span className="ms-4">{text}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

function UserSidebar() {
  // collapsed: whether sidebar is fully hidden; persisted via localStorage
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  // animating: null | "collapsing" | "expanding" — drives the CSS animation class
  const [animating, setAnimating] = useState(null);

  // Persist collapsed state to localStorage on every change
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  // Guard against rapid clicks mid-animation
  const handleCollapse = useCallback(() => {
    if (animating) return;
    setAnimating("collapsing");
  }, [animating]);

  const handleExpand = useCallback(() => {
    if (animating) return;
    setAnimating("expanding");
  }, [animating]);

  // Finalize collapsed state once the CSS animation finishes
  const handleAnimationEnd = useCallback(() => {
    if (animating === "collapsing") {
      setCollapsed(true);
    } else if (animating === "expanding") {
      setCollapsed(false);
    }
    setAnimating(null);
  }, [animating]);

  // Build class string dynamically based on current animation state
  const wrapperClassName = [
    "sidebar-wrapper secondary-color",
    animating === "collapsing" ? "sidebar-animating sidebar-collapse-anim" : "",
    animating === "expanding" ? "sidebar-animating sidebar-expand-anim" : "",
    collapsed && !animating ? "sidebar-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Sidebar panel — animates left on collapse, right on expand */}
      <div
        className={wrapperClassName}
        onAnimationEnd={handleAnimationEnd}
      >
        <aside className="sidebar d-none d-sm-block flex-shrink-0">
          <div className="container-fluid">
            {/* Collapse trigger */}
            <button
              className="btn border-0 w-100 text-end"
              onClick={handleCollapse}
              aria-label="Collapse sidebar"
            >
              <ArrowLeft />
            </button>
            {/* Nav links */}
            <ul className="list-unstyled d-flex flex-column gap-3">
              <UserSideBarLink
                to="/home"
                icon={HouseDoor}
                activeIcon={HouseDoorFill}
                text="Home"
              />
              <UserSideBarLink
                to="/notification"
                icon={Bell}
                activeIcon={BellFill}
                text="Notifications"
              />
              <UserSideBarLink
                to="/direct"
                icon={ChatDots}
                activeIcon={ChatDotsFill}
                text="Direct messages"
              />
              <UserSideBarLink
                to="/setting"
                icon={Gear}
                activeIcon={GearFill}
                text="Settings"
              />
              <hr />
            </ul>
          </div>
        </aside>
      </div>

      {/* Expand toggle — fixed on left edge, only visible when sidebar is fully collapsed */}
      {collapsed && !animating && (
        <button
          className="sidebar-expand-btn secondary-color"
          onClick={handleExpand}
          title="Open sidebar"
          aria-label="Open sidebar"
        >
          <ArrowRight />
        </button>
      )}
    </>
  );
}

export default UserSidebar;
