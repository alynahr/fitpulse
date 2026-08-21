import React, { useState } from "react";
import "./AttendanceLog.css";
import AppIcon from "./components/AppIcon";

const facilityMembers = [
  ["Renz Mendoza", "FP-2024-0155", "8:45 AM", "Main Gym"],
  ["Angela Reyes", "FP-2024-0247", "8:41 AM", "Studio A"],
  ["Mark Dela Cruz", "FP-2024-0112", "8:35 AM", "Main Gym"],
  ["Sophia Garcia", "FP-2024-0189", "8:28 AM", "Studio B"],
  ["Brian Villanueva", "FP-2024-0086", "8:25 AM", "Main Gym"],
];

const classes = [
  ["HIIT Training", "7:00 AM - 8:00 AM", "Coach Alex", "18/20 booked", "90%"],
  ["Yoga Flow", "8:30 AM - 9:30 AM", "Coach Mia", "12/15 booked", "80%"],
  ["Strength Training", "9:00 AM - 10:00 AM", "Coach John", "20/25 booked", "80%"],
  ["Pilates Core", "10:00 AM - 11:00 AM", "Coach Lisa", "10/15 booked", "67%"],
];

const AttendanceLog = () => {
  const [search, setSearch] = useState("");
  const visibleMembers = facilityMembers.filter(([name, id]) => `${name} ${id}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="attendance-page">
        <header className="attendance-header"><div><span>ATTENDANCE LOG</span><h1>Daily Attendance Log</h1></div><div className="checkin-user"><b>o</b><span className="kiosk-avatar">FP</span><strong>John Staff<small>Front Desk</small></strong></div></header>
        <div className="attendance-content">
          <div className="attendance-toolbar"><button>May 24, 2024</button><button>All Areas</button><label><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search member or ID..." /></label><button className="export-button">Export Report</button></div>
          <section className="attendance-stat-grid">{[["56", "Checked In Today", "+12 vs Yesterday", "users", "blue"], ["8", "In Facility Now", "Live Status", "home", "green"], ["12", "Classes Today", "Scheduled", "calendar", "blue"], ["92%", "Attendance Rate", "vs Capacity", "gauge", "blue"]].map(([value, label, sub, icon, tone]) => <div className="attendance-stat" key={label}><span className={`attendance-icon ${tone}`}><AppIcon name={icon} size={18} /></span><div><strong>{value}</strong><p>{label}</p><small>{sub}</small></div></div>)}</section>
          <div className="attendance-panels">
            <section className="facility-panel"><div className="attendance-panel-heading"><h2>CURRENTLY IN FACILITY (8)</h2><button>View All</button></div>{visibleMembers.map(([name, id, time, area]) => <div className="facility-row" key={id}><span className="facility-avatar"></span><div><strong>{name}</strong><small>{id}</small></div><time>{time}</time><span className="area-name">{area}</span><em>In Facility</em></div>)}</section>
            <section className="roster-panel"><div className="attendance-panel-heading"><h2>TODAY'S CLASS ROSTER</h2><button>View All Classes</button></div>{classes.map(([name, time, coach, booked, fill]) => <div className="class-row" key={name}><div><strong>{name}</strong><small>{time} &nbsp;•&nbsp; {coach}</small></div><span>{booked}</span><i><b style={{ width: fill }}></b></i></div>)}</section>
          </div>
        </div>
    </div>
  );
};

export default AttendanceLog;
