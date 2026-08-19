import React, { useState } from "react";
import "./AdminDashboard.css";
import MemberProfile from "./MemberProfile";
import CheckInKiosk from "./CheckInKiosk";
import AttendanceLog from "./AttendanceLog";
import ClassSchedule from "./ClassSchedule";
import ReportsDashboard from "./ReportsDashboard";

const members = [
  { id: "FP-9821", name: "Rene Butter", email: "reneB@gmail.com", plan: "Premium Plan", date: "Oct 12, 2022", status: "ACTIVE", tone: "active", initials: "RB" },
  { id: "FP-9540", name: "Marcus Vance", email: "m.vance@outlook.com", plan: "Basic Strength", date: "Jan 05, 2023", status: "ACTIVE", tone: "active", initials: "MV" },
  { id: "FP-9112", name: "Elena Rostova", email: "elena.ros@gmail.com", plan: "VIP Unlimited", date: "Jun 18, 2021", status: "SUSPENDED", tone: "suspended", initials: "ER" },
  { id: "FP-8921", name: "David Kross", email: "david.k@hotmail.com", plan: "Basic Strength", date: "Mar 22, 2023", status: "EXPIRED", tone: "expired", initials: "DK" },
  { id: "FP-8774", name: "Chloe Smith", email: "chloe.s@fitpulse.com", plan: "Trial Pass", date: "Sep 01, 2024", status: "PENDING", tone: "pending", initials: "CS" },
];

const stats = [
  ["Total Active", "1,240", "users", "blue"],
  ["New Joins (Month)", "48", "trend", "green"],
  ["Expired Plans", "14", "alert", "red"],
  ["Class Capacity", "88%", "pulse", "purple"],
];

const AdminDashboard = ({ onLogout }) => {
  const [activeFilter, setActiveFilter] = useState("All Members");
  const [showAddMember, setShowAddMember] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const navigateTo = (screen) => {
    setShowAddMember(screen === "member-profile");
    setShowCheckIn(screen === "checkin");
    setShowAttendance(screen === "attendance");
    setShowSchedule(screen === "schedule");
    setShowReports(screen === "reports");
  };

  if (showAddMember) {
    return <MemberProfile onBack={() => navigateTo("members")} onCheckIn={() => navigateTo("checkin")} onAttendance={() => navigateTo("attendance")} onSchedule={() => navigateTo("schedule")} onReports={() => navigateTo("reports")} onLogout={onLogout} />;
  }

  if (showCheckIn) {
    return <CheckInKiosk onBack={() => navigateTo("members")} onAttendance={() => navigateTo("attendance")} onSchedule={() => navigateTo("schedule")} onReports={() => navigateTo("reports")} onLogout={onLogout} />;
  }

  if (showAttendance) {
    return <AttendanceLog onBack={() => navigateTo("members")} onCheckIn={() => navigateTo("checkin")} onSchedule={() => navigateTo("schedule")} onReports={() => navigateTo("reports")} onLogout={onLogout} />;
  }

  if (showSchedule) {
    return <ClassSchedule onBack={() => navigateTo("members")} onCheckIn={() => navigateTo("checkin")} onAttendance={() => navigateTo("attendance")} onReports={() => navigateTo("reports")} onLogout={onLogout} />;
  }

  if (showReports) {
    return <ReportsDashboard onBack={() => navigateTo("members")} onCheckIn={() => navigateTo("checkin")} onAttendance={() => navigateTo("attendance")} onSchedule={() => navigateTo("schedule")} onLogout={onLogout} />;
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">+</span><strong>FITPULSE</strong><small>STUDIO</small></div>
        <p className="sidebar-label">STAFF PANEL</p>
        <nav className="admin-nav">
          <button className="admin-nav-item selected"><span>##</span>Members</button>
          <button className="admin-nav-item" onClick={() => setShowCheckIn(true)}><span>四</span>Check-In</button>
          <button className="admin-nav-item" onClick={() => setShowAttendance(true)}><span>[]</span>Attendance Log</button>
          <button className="admin-nav-item" onClick={() => setShowSchedule(true)}><span>--</span>Class Schedule</button>
          <button className="admin-nav-item" onClick={() => setShowReports(true)}><span>||</span>Reports</button>
          <button className="admin-nav-item"><span>*</span>Settings</button>
        </nav>
        <button className="admin-logout" onClick={onLogout}><span>&lt;-</span>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-copy"><h1>Member Directory</h1><p>Staff Panel / Gym Management</p></div>
          <div className="admin-profile"><span className="date">[ ] &nbsp; Oct 31, 2024</span><span><strong>Admin</strong><small>Gym Manager</small></span><span className="profile-avatar">A</span></div>
        </header>

        <section className="stat-grid">
          {stats.map(([label, value, icon, color]) => <div className="stat-card" key={label}><div><p>{label}</p><strong>{value}</strong></div><span className={`stat-icon ${color}`}>{icon}</span></div>)}
        </section>

        <section className="directory-panel">
          <div className="directory-toolbar">
            <div className="search-filter"><label><span>?</span><input placeholder="Search members by name, ID or email..." /></label><button>[=] &nbsp; Filter</button></div>
            <button className="add-member" onClick={() => setShowAddMember(true)}>+ &nbsp; Add Member</button>
          </div>
          <div className="member-filters">
            {["All Members", "Active", "Expired", "Pending", "Suspended"].map((filter) => <button className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}
          </div>
          <div className="table-wrap"><table><thead><tr><th>MEMBER ID</th><th>NAME</th><th>EMAIL</th><th>PLAN</th><th>JOIN DATE</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td className="member-id">{member.id}</td><td><span className="member-avatar">{member.initials}</span>{member.name}</td><td>{member.email}</td><td><span className="plan-tag">{member.plan}</span></td><td>{member.date}</td><td><span className={`status ${member.tone}`}>{member.status}</span></td><td className="actions">[ ] &nbsp;:</td></tr>)}</tbody></table></div>
          <footer className="directory-footer"><span>Showing 1-5 of 1,240 members</span><div className="pagination"><button>Previous</button><button className="current">1</button><button>2</button><button>3</button><button>Next</button></div></footer>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
