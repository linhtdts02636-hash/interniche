import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, PersonCircle } from "react-bootstrap-icons";

function Dropdown({ trigger, triggerLabel, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="btn"
        type="button"
        aria-expanded={open}
        aria-label={triggerLabel}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open && (
        <ul className="dropdown-menu dropdown-menu-end show">
          {children}
        </ul>
      )}
    </div>
  );
}

function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-lg secondary-color">
      <div className="container-fluid">
        {/* Brand / logo */}
        <Link to="/" className="navbar-brand">
          [placeholder logo]
        </Link>

        {/* Search bar — centered via flex, hidden on mobile (replaced by trigger below) */}
        <div className="d-none d-sm-flex flex-grow-1 justify-content-center pe-3">
          <form
            className="d-flex input-group bg-dark rounded-gradient-border w-100"
            role="search"
          >
            <input
              className="form-control border-0 bg-transparent text-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn border-0 shadow-none" type="submit" aria-label="Submit search">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right-side action buttons */}
        <div className="ms-auto rounded-gradient-border d-flex">
          {/* Mobile-only search trigger */}
          <div className="d-sm-none">
            <button className="btn border-0 shadow-none" type="button" aria-label="Search">
              <Search size={18} />
            </button>
          </div>

          {/* Notifications dropdown */}
          <Dropdown trigger={<Bell size={18} />} triggerLabel="Notifications">
            <li><a className="dropdown-item" href="#">Test</a></li>
            <li><a className="dropdown-item" href="#">Test</a></li>
            <li><a className="dropdown-item" href="#">Test</a></li>
          </Dropdown>

          {/* Profile dropdown */}
          <Dropdown trigger={<PersonCircle size={18} />} triggerLabel="User profile">
            <li><a className="dropdown-item" href="#">Test</a></li>
            <li><a className="dropdown-item" href="#">Test</a></li>
            <li><a className="dropdown-item" href="#">Test</a></li>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
