import React from "react";
import Button from "react-bootstrap/Button";
import "./Sidebar.css";
import AppIcon from "./AppIcon";

const ADMIN_NAV = [
  ["dashboard", "Dashboard", "grid"],
  ["checkin", "Check-In", "scanLine"],
  ["attendance", "Attendance Log", "clipboardList"],
  ["schedule", "Class Schedule", "calendar"],
  ["reports", "Reports", "chart"],
  ["settings", "Settings", "settings"],
];

const AdminSidebar = ({ activePage, onNavigate, onLogout, open = false, onClose }) => {
  const navigate = (page) => {
    onNavigate(page);
    onClose?.();
  };

  return (
    <>
      {open && <Button className="fp-sidebar-overlay" onClick={onClose} aria-label="Close navigation" variant="link" />}
      <aside className={`fp-sidebar fp-admin-sidebar ${open ? "open" : ""}`}>
        <div className="fp-sidebar-brand">
          <span className="fp-logo-fallback"><AppIcon name="dumbbell" size={16} /></span>
          <img src="public/fitpulselogo.png" alt="" onLoad={(event) => { event.currentTarget.previousElementSibling.style.display = "none"; }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <img className="fp-brand-text" src="public/fitpulsetext.png" alt="FitPulse Studio" />
          <Button className="fp-sidebar-close" onClick={onClose} aria-label="Close menu" variant="link"><AppIcon name="x" size={16} /></Button>
        </div>
        <p className="fp-sidebar-label">STAFF PANEL</p>
        <nav className="fp-sidebar-nav" aria-label="Admin navigation">
          {ADMIN_NAV.map(([key, label, icon]) => (
            <Button key={key} className={`fp-sidebar-item ${activePage === key ? "active" : ""}`} onClick={() => navigate(key)} variant="link">
              <span aria-hidden="true"><AppIcon name={icon} size={17} /></span>{label}
            </Button>
          ))}
        </nav>
        <Button className="fp-sidebar-item fp-sidebar-logout" onClick={onLogout} variant="link"><span aria-hidden="true"><AppIcon name="logOut" size={17} /></span>Logout</Button>
      </aside>
    </>
  );
};

export default AdminSidebar;
