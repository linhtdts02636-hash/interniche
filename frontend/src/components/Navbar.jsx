import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

// Shared app navbar — renders brand + centered search bar + right-side actions.
// Pass the right-side content (links, dropdowns) as `actions`.
function Navbar({ actions }) {
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
            <button
              className="btn border-0 shadow-none"
              type="submit"
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right-side action buttons */}
        <div className="ms-auto rounded-gradient-border d-flex">
          {/* Mobile-only search trigger */}
          <div className="d-sm-none">
            <button
              className="btn border-0 shadow-none"
              type="button"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>

          {actions}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;