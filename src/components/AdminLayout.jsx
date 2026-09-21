import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AdminSidebar from "./AdminSidebar";
import AppIcon from "./AppIcon";
import "./Sidebar.css";

const AdminLayout = ({ activePage, onNavigate, onLogout, children }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="admin-page unified-admin-page">
      <Button className="fp-mobile-menu" onClick={() => setNavOpen(true)} aria-label="Open staff navigation" variant="link"><AppIcon name="menu" size={19} /></Button>
      <AdminSidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} open={navOpen} onClose={() => setNavOpen(false)} />
      <main className="admin-main fp-shell-main">{children}</main>
    </div>
  );
};

export default AdminLayout;
