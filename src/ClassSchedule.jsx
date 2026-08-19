import React, { useState } from "react";
import "./ClassSchedule.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["08:00 AM", "10:00 AM", "12:00 PM", "05:30 PM"];
const events = [
  ["HIIT Focus", "Yoga Intro", "HIIT Focus", "Pilates", "Zumba"],
  ["No Class", "Spin Ride", "No Class", "Spin Ride", "No Class"],
  ["Barbell Progress", "Core Crush", "Barbell Progress", "Core Crush", "Barbell Progress"],
  ["Boxing 101", "Power Yoga", "Boxing 101", "Power Yoga", "Kickboxing"],
];

const ClassSchedule = ({ onBack, onCheckIn, onAttendance, onReports, onLogout }) => {
  const [online, setOnline] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("Barbell Progress");
  const [scheduleDate, setScheduleDate] = useState("2026-08-19");
  const [showEditor, setShowEditor] = useState(false);

  const scheduleDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date(`${scheduleDate}T00:00:00`));

  return (
    <div className="admin-page schedule-page">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">+</span><strong>FITPULSE</strong><small>STUDIO</small></div>
        <p className="sidebar-label">STAFF PANEL</p>
        <nav className="admin-nav">
          <button className="admin-nav-item" onClick={onBack}><span>##</span>Members</button>
          <button className="admin-nav-item" onClick={onCheckIn}><span>四</span>Check-In</button>
          <button className="admin-nav-item" onClick={onAttendance}><span>[]</span>Attendance Log</button>
          <button className="admin-nav-item selected"><span>--</span>Class Schedule</button>
          <button className="admin-nav-item" onClick={onReports}><span>||</span>Reports</button>
          <button className="admin-nav-item"><span>*</span>Settings</button>
        </nav>
        <button className="admin-logout" onClick={onLogout}><span>&lt;-</span>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="schedule-header"><div><div className="schedule-title-row"><h1>Class Schedule Manager</h1><span>ADMIN CONTROL</span></div><p>System timetable logs and course scheduling configurations</p></div><div className="schedule-user"><span className="user-photo">U</span><strong>User<small>PREMIUM MEMBER</small></strong></div></header>
        <div className="schedule-content">
          <section className="timetable-section"><div className="schedule-section-heading"><h2>Weekly Grid Timetable</h2><button onClick={() => setShowEditor(true)}>+ Add Custom Event</button></div><div className="timetable"><div className="timetable-days"><span></span>{days.map((day) => <strong key={day}>{day}</strong>)}</div>{times.map((time, rowIndex) => <div className="timetable-row" key={time}><time>{time}</time>{events[rowIndex].map((event, columnIndex) => <button key={`${time}-${columnIndex}`} className={event === "No Class" ? "empty-event" : "schedule-event"} onClick={() => event !== "No Class" && setSelectedEvent(event)}><strong>{event}</strong>{event !== "No Class" && <small>12 / 20 max</small>}</button>)}</div>)}</div></section>
          {showEditor && <div className="event-editor-overlay" onClick={() => setShowEditor(false)}><section className="event-editor" onClick={(event) => event.stopPropagation()}><button className="close-editor" onClick={() => setShowEditor(false)} aria-label="Close event editor">x</button><h2>EDIT CLASS EVENT</h2><label>CLASS NAME<input value={selectedEvent} onChange={(event) => setSelectedEvent(event.target.value)} /></label><label>INSTRUCTOR<input defaultValue="Coach David" /></label><label>DATE<input type="date" value={scheduleDate} onChange={(event) => setScheduleDate(event.target.value)} /><small className="schedule-day">{scheduleDay}</small></label><label>TIME INTERVAL<input defaultValue="12:00 PM - 1:00 PM" /></label><label>LOCATION / STUDIO<input defaultValue="Main Turf" /></label><label>MAX CAPACITY LIMIT<input defaultValue="12 members" /></label><div className="online-status"><strong>Event Online Status</strong><button className={online ? "on" : ""} onClick={() => setOnline(!online)} aria-label="Toggle event online status"><span></span></button></div><div className="event-actions"><button className="cancel-event" onClick={() => setShowEditor(false)}>Cancel</button><button className="save-event" onClick={() => setShowEditor(false)}>Save Event</button></div></section></div>}
        </div>
      </main>
    </div>
  );
};

export default ClassSchedule;
