import React from "react";
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
      {open && <button className="fp-sidebar-overlay" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`fp-sidebar fp-member-sidebar ${open ? "open" : ""}`}>
        <div className="fp-sidebar-brand">
          <span className="fp-logo-fallback"><AppIcon name="dumbbell" size={16} /></span>
          <img src="/fitpulselogo.png" alt="" onLoad={(event) => { event.currentTarget.previousElementSibling.style.display = "none"; }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <img className="fp-brand-text" src="/fitpulsetext.png" alt="FitPulse Studio" />
          <button className="fp-sidebar-close" onClick={onClose} aria-label="Close menu"><AppIcon name="x" size={16} /></button>
        </div>
        <p className="fp-sidebar-label">MEMBER AREA</p>
        <nav className="fp-sidebar-nav" aria-label="Member navigation">
          {MEMBER_NAV.map(([key, label, icon]) => (
            <button key={key} className={`fp-sidebar-item ${activePage === key ? "active" : ""}`} onClick={() => navigate(key)}>
              <span aria-hidden="true"><AppIcon name={icon} size={17} /></span>{label}
            </button>
          ))}
        </nav>
        <button className="fp-sidebar-item fp-sidebar-logout" onClick={onLogout}><span aria-hidden="true"><AppIcon name="logOut" size={17} /></span>Logout</button>
      </aside>
    </>
  );
};

export default MemberSidebar;
