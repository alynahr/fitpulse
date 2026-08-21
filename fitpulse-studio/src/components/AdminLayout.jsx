import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AppIcon from "./AppIcon";
import "./Sidebar.css";

const AdminLayout = ({ activePage, onNavigate, onLogout, children }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="admin-page unified-admin-page">
      <button className="fp-mobile-menu" onClick={() => setNavOpen(true)} aria-label="Open staff navigation"><AppIcon name="menu" size={19} /></button>
      <AdminSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} open={navOpen} onClose={() => setNavOpen(false)} />
      <main className="admin-main fp-shell-main">{children}</main>
    </div>
  );
};

export default AdminLayout;
