import React, { useState } from "react";
import "./CheckInKiosk.css";

const recentCheckIns = [
  ["Renz Mendoza", "FP-2024-0137", "8:45 AM"],
  ["Angela Reyes", "FP-2024-0247", "8:40 AM"],
  ["Mark Dela Cruz", "FP-2024-0112", "8:35 AM"],
];

const CheckInKiosk = ({ onBack, onAttendance, onSchedule, onReports, onLogout }) => {
  const [memberId, setMemberId] = useState("");
  const [message, setMessage] = useState("");

  const addDigit = (digit) => {
    setMemberId((current) => `${current}${digit}`);
    setMessage("");
  };

  const checkIn = () => {
    if (!memberId.trim()) {
      setMessage("Enter a member ID first.");
      return;
    }
    setMessage(`Member ${memberId} checked in.`);
  };

  return (
    <div className="admin-page checkin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">+</span><strong>FITPULSE</strong><small>STUDIO</small></div>
        <p className="sidebar-label">STAFF PANEL</p>
        <nav className="admin-nav">
          <button className="admin-nav-item" onClick={onBack}><span>##</span>Members</button>
          <button className="admin-nav-item selected"><span>四</span>Check-In</button>
          <button className="admin-nav-item" onClick={onAttendance}><span>[]</span>Attendance Log</button>
          <button className="admin-nav-item" onClick={onSchedule}><span>--</span>Class Schedule</button>
          <button className="admin-nav-item" onClick={onReports}><span>||</span>Reports</button>
          <button className="admin-nav-item"><span>*</span>Settings</button>
        </nav>
        <button className="admin-logout" onClick={onLogout}><span>&lt;-</span>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="checkin-header">
          <div><span>CHECK-IN KIOSK</span><h1>Member Check-In</h1></div>
          <div className="checkin-user"><b>o</b><span className="kiosk-avatar">FP</span><strong>John Staff<small>Front Desk</small></strong></div>
        </header>

        <div className="checkin-content">
          <section className="scan-panel">
            <h2>SCAN MEMBER QR CODE</h2>
            <div className="qr-frame"><div className="qr-corners"><i></i><i></i><i></i><i></i></div><span>Align QR code inside frame</span></div>
            <div className="or-divider"><span></span>OR<span></span></div>
            <button className="manual-button">ENTER MEMBER ID MANUALLY</button>
          </section>

          <div className="checkin-side">
            <section className="manual-panel">
              <h2>MANUAL CHECK-IN</h2>
              <input value={memberId} onChange={(event) => setMemberId(event.target.value)} placeholder="Enter Member ID..." />
              <div className="keypad">{["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0"].map((key) => <button key={key} className={key === "back" ? "delete-key" : ""} aria-label={key === "back" ? "Delete last number" : `Enter ${key}`} onClick={() => key === "back" ? setMemberId((current) => current.slice(0, -1)) : addDigit(key)}>{key === "back" ? "DEL" : key}</button>)}<button className="checkin-submit" onClick={checkIn}>CHECK-IN</button></div>
              {message && <p className="checkin-message">{message}</p>}
            </section>
            <section className="recent-panel"><h2>RECENT CHECK-INS</h2>{recentCheckIns.map(([name, id, time]) => <div className="recent-row" key={id}><span className="recent-avatar"></span><div><strong>{name}</strong><small>{id}</small></div><time>{time}</time><em>CHECKED IN</em></div>)}</section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckInKiosk;
