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

function GuestSideBarLink({ to, icon: Icon, activeIcon: ActiveIcon, text }) {
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

function GuestSidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [animating, setAnimating] = useState(null);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  const handleCollapse = useCallback(() => {
    if (animating) return;
    setAnimating("collapsing");
  }, [animating]);

  const handleExpand = useCallback(() => {
    if (animating) return;
    setAnimating("expanding");
  }, [animating]);

  const handleAnimationEnd = useCallback(() => {
    if (animating === "collapsing") {
      setCollapsed(true);
    } else if (animating === "expanding") {
      setCollapsed(false);
    }
    setAnimating(null);
  }, [animating]);

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
      <div
        className={wrapperClassName}
        onAnimationEnd={handleAnimationEnd}
      >
        <aside className="sidebar d-none d-sm-block flex-shrink-0">
          <div className="container-fluid">
            <button
              className="btn border-0 w-100 text-end"
              onClick={handleCollapse}
              aria-label="Collapse sidebar"
            >
              <ArrowLeft />
            </button>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <GuestSideBarLink
                to="/home"
                icon={HouseDoor}
                activeIcon={HouseDoorFill}
                text="Home"
              />
              <GuestSideBarLink
                to="/notification"
                icon={Bell}
                activeIcon={BellFill}
                text="Notifications"
              />
              <GuestSideBarLink
                to="/direct"
                icon={ChatDots}
                activeIcon={ChatDotsFill}
                text="Direct messages"
              />
              <GuestSideBarLink
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

export default GuestSidebar;
