import { useState, useEffect, useRef } from "react";

// Plain React dropdown — replaces Bootstrap JS's data-bs-toggle behavior.
// Rendering is gated on `open`, so no show/hide class juggling is needed.
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
        <ul
          className="dropdown-menu dropdown-menu-end show"
          data-bs-popper="none"
        >
          {children}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;