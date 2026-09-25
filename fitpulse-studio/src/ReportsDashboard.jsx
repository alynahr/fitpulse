import React, { useState } from "react";
import "./ReportsDashboard.css";

const reportTabs = ["Attendance Summary Report", "Membership Status & Renewal", "Class Popularity & Capacity"];

const ReportsDashboard = () => {
  const [activeReport, setActiveReport] = useState(0);

  return (
    <div className="reports-page">
        <header className="reports-header"><div><span>REPORTS</span><h1>Reports Dashboard</h1><p>Generate, preview, and export reports to keep your gym running smoothly.</p></div><div className="reports-user"><b>o</b><span className="report-avatar">JS</span><strong>John Stafford<small>Admin</small></strong></div></header>
        <div className="reports-content">
          <div className="report-toolbar"><nav>{reportTabs.map((tab, index) => <button className={activeReport === index ? "active" : ""} onClick={() => setActiveReport(index)} key={tab}>{tab}</button>)}</nav><button className="export-all">Download All Reports</button><button className="generate-report">+ &nbsp; Generate New Report</button></div>
          <div className="report-grid">
            <ReportCard title="ATTENDANCE SUMMARY REPORT" type="attendance" />
            <ReportCard title="MEMBERSHIP STATUS & RENEWAL REPORT" type="membership" />
            <ReportCard title="CLASS POPULARITY & UTILIZATION REPORT" type="classes" />
          </div>
          <div className="reports-note">i &nbsp; Reports are optimized for printing on A4/Letter size. Click Export to download a print-ready PDF.</div>
        </div>
    </div>
  );
};

const ReportCard = ({ title, type }) => (
  <article className="report-card">
    <header><strong>FITPULSE</strong><span>GENERATED ON<br /><b>May 24, 2024 10:24 AM</b></span></header>
    <h2>{title}</h2>
    {type === "attendance" && <><div className="report-summary"><span>DATE RANGE<strong>May 1 - May 24, 2024</strong></span><span>TOTAL MEMBERS<strong>128</strong></span><span>FILTER<strong>All Classes</strong></span><span>UNIQUE CHECKED-IN<strong>95</strong></span></div><h3>SUMMARY</h3><div className="report-table"><p>Metric <b>Total</b></p><p>Total Check-ins <b>1,248</b></p><p>Average Daily Check-ins <b>52</b></p><p>Highest Daily Check-ins <b>88 (May 15, 2024)</b></p><p>Lowest Daily Check-ins <b>24 (May 5, 2024)</b></p></div><h3>DAILY CHECK-IN OVERVIEW</h3><div className="bar-chart">{[30, 45, 34, 58, 42, 76, 62, 48, 55, 66, 38, 72, 88, 61, 52, 70, 46, 64, 58, 44].map((height, index) => <i style={{ height: `${height}%` }} key={index}></i>)}</div></>}
    {type === "membership" && <><p className="as-of">As of Date: May 24, 2024</p><div className="donut-wrap"><div className="donut"><strong>128<small>TOTAL MEMBERS</small></strong></div><ul><li>Active: &nbsp; <b>98 (77%)</b></li><li>Expiring 30 Days: &nbsp; <b>18 (14%)</b></li><li>Expiring 90 Days: &nbsp; <b>10 (8%)</b></li><li>Expired: &nbsp; <b>2 (1%)</b></li></ul></div><h3>UPCOMING EXPIRATIONS</h3><div className="mini-table"><p>Member <b>Plan</b><b>Expiry Date</b></p>{["Abigail Royer", "Maria Cole", "Sophia Gard", "Brian Villen", "Julie Ann Sa..."].map((name, index) => <p key={name}>{name}<span>{index % 2 ? "Standard Plan" : "Premium Plan"}</span><span>May {30 + index * 2}, 2024</span></p>)}</div></>}
    {type === "classes" && <><div className="report-summary"><span>DATE RANGE<strong>May 1 - May 24, 2024</strong></span><span>TOTAL SESSIONS<strong>48</strong></span><span>FILTER<strong>All Classes</strong></span><span>AVERAGE UTILIZATION<strong>76.2%</strong></span></div><h3>TOP PERFORMING CLASSES</h3><div className="class-report-table"><p>Class <b>Bookings &nbsp; Capacity &nbsp; Utilization</b></p>{[["HIIT Training", "154       20       95%"], ["Strength Training", "142       15       88%"], ["Yoga Flow", "118       20       78%"], ["Pilates Core", "105       15       70%"], ["Spin Class", "84       20       65%"]].map(([name, data]) => <p key={name}>{name}<b>{data}</b></p>)}</div><h3>CAPACITY UTILIZATION BY TIME SLOT</h3><div className="capacity-chart">{[78, 92, 85, 40, 70, 95, 82].map((height, index) => <i key={index}><b style={{ height: `${height}%` }}></b><small>{height}%</small></i>)}</div></>}
    <footer>Page 1 of 1</footer>
  </article>
);

export default ReportsDashboard;
