import React, { useState } from "react";
import "./AdminDashboard.css";
import MemberProfile from "./MemberProfile";
import CheckInKiosk from "./CheckInKiosk";
import AttendanceLog from "./AttendanceLog";
import ClassSchedule from "./ClassSchedule";
import ReportsDashboard from "./ReportsDashboard";
import AdminLayout from "./components/AdminLayout";
import AppIcon from "./components/AppIcon";

const members = [
  { id: "FP-9821", name: "Rene Butter", email: "reneB@gmail.com", plan: "Premium Plan", date: "Oct 12, 2022", status: "ACTIVE", tone: "active", initials: "RB" },
  { id: "FP-9540", name: "Marcus Vance", email: "m.vance@outlook.com", plan: "Basic Strength", date: "Jan 05, 2023", status: "ACTIVE", tone: "active", initials: "MV" },
  { id: "FP-9112", name: "Elena Rostova", email: "elena.ros@gmail.com", plan: "VIP Unlimited", date: "Jun 18, 2021", status: "SUSPENDED", tone: "suspended", initials: "ER" },
  { id: "FP-8921", name: "David Kross", email: "david.k@hotmail.com", plan: "Basic Strength", date: "Mar 22, 2023", status: "EXPIRED", tone: "expired", initials: "DK" },
  { id: "FP-8774", name: "Chloe Smith", email: "chloe.s@fitpulse.com", plan: "Trial Pass", date: "Sep 01, 2024", status: "PENDING", tone: "pending", initials: "CS" },
];

const stats = [
  ["Total Active", "1,240", "users", "blue"],
  ["New Joins (Month)", "48", "trending", "green"],
  ["Expired Plans", "14", "info", "red"],
  ["Class Capacity", "88%", "gauge", "purple"],
];

const AdminDashboard = ({ onLogout }) => {
  const [activeFilter, setActiveFilter] = useState("All Members");
  const [screen, setScreen] = useState("dashboard");

  const navigateTo = (page) => setScreen(page === "members" ? "dashboard" : page);

  if (screen !== "dashboard") {
    const common = { onBack: () => navigateTo("dashboard"), onCheckIn: () => navigateTo("checkin"), onAttendance: () => navigateTo("attendance"), onSchedule: () => navigateTo("schedule"), onReports: () => navigateTo("reports"), onLogout };
    const pages = {
      "member-profile": <MemberProfile {...common} />,
      checkin: <CheckInKiosk {...common} />,
      attendance: <AttendanceLog {...common} />,
      schedule: <ClassSchedule {...common} />,
      reports: <ReportsDashboard {...common} />,
      settings: <><header className="admin-header"><div className="admin-header-copy"><h1>Settings</h1><p>Staff Panel / Gym Management</p></div></header><section className="directory-panel"><h2>Workspace Settings</h2><p>Manage staff preferences and FitPulse Studio operations from this workspace.</p></section></>,
    };
    return <AdminLayout activePage={screen === "member-profile" ? "dashboard" : screen} onNavigate={navigateTo} onLogout={onLogout}>{pages[screen]}</AdminLayout>;
  }

  return (
    <AdminLayout activePage="dashboard" onNavigate={navigateTo} onLogout={onLogout}>
        <header className="admin-header">
          <div className="admin-header-copy"><h1>Member Directory</h1><p>Staff Panel / Gym Management</p></div>
          <div className="admin-profile"><span className="date"><AppIcon name="calendar" size={12} /> Oct 31, 2024</span><span><strong>Admin</strong><small>Gym Manager</small></span><span className="profile-avatar">A</span></div>
        </header>

        <section className="stat-grid">
          {stats.map(([label, value, icon, color]) => <div className="stat-card" key={label}><div><p>{label}</p><strong>{value}</strong></div><span className={`stat-icon ${color}`}><AppIcon name={icon} size={18} /></span></div>)}
        </section>

        <section className="directory-panel">
          <div className="directory-toolbar">
            <div className="search-filter"><label><span><AppIcon name="search" size={14} /></span><input placeholder="Search members by name, ID or email..." /></label><button className="btn btn-secondary"><AppIcon name="filter" size={14} /> Filter</button></div>
            <button className="add-member btn btn-primary" onClick={() => navigateTo("member-profile")}><AppIcon name="plus" size={15} /> Add Member</button>
          </div>
          <div className="member-filters">
            {["All Members", "Active", "Expired", "Pending", "Suspended"].map((filter) => <button className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}
          </div>
          <div className="table-wrap"><table><thead><tr><th>MEMBER ID</th><th>NAME</th><th>EMAIL</th><th>PLAN</th><th>JOIN DATE</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td className="member-id">{member.id}</td><td><span className="member-avatar">{member.initials}</span>{member.name}</td><td>{member.email}</td><td><span className="plan-tag">{member.plan}</span></td><td>{member.date}</td><td><span className={`status ${member.tone}`}>{member.status}</span></td><td className="actions"><AppIcon name="more" size={16} /></td></tr>)}</tbody></table></div>
          <footer className="directory-footer"><span>Showing 1-5 of 1,240 members</span><div className="pagination"><button>Previous</button><button className="current">1</button><button>2</button><button>3</button><button>Next</button></div></footer>
        </section>
    </AdminLayout>
  );
};

export default AdminDashboard;
