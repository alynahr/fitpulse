import React from "react";
import Button from "react-bootstrap/Button";
import "./Sidebar.css";
import AppIcon from "./AppIcon";

const MEMBER_NAV = [
  ["dashboard", "Dashboard", "grid"],
  ["bookings", "My Bookings", "calendarCheck"],
  ["schedule", "Class Schedule", "calendar"],
  ["idpass", "My Digital ID", "qrCode"],
  ["attendance", "Attendance", "clipboardCheck"],
  ["billing", "Billing History", "receipt"],
  ["settings", "Profile & Settings", "settings"],
];

const MemberSidebar = ({ activePage, onNavigate, onLogout, open = false, onClose }) => {
  const navigate = (page) => {
    onNavigate(page);
    onClose?.();
  };

  return (
    <>
      {open && <Button className="fp-sidebar-overlay" onClick={onClose} aria-label="Close navigation" variant="link" />}
      <aside className={`fp-sidebar fp-member-sidebar ${open ? "open" : ""}`}>
        <div className="fp-sidebar-brand">
          <span className="fp-logo-fallback"><AppIcon name="dumbbell" size={16} /></span>
          <img src="/fitpulselogo.png" alt="" onLoad={(event) => { event.currentTarget.previousElementSibling.style.display = "none"; }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <img className="fp-brand-text" src="/fitpulsetext.png" alt="FitPulse Studio" />
          <Button className="fp-sidebar-close" onClick={onClose} aria-label="Close menu" variant="link"><AppIcon name="x" size={16} /></Button>
        </div>
        <p className="fp-sidebar-label">MEMBER AREA</p>
        <nav className="fp-sidebar-nav" aria-label="Member navigation">
          {MEMBER_NAV.map(([key, label, icon]) => (
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

export default MemberSidebar;
