import React, { useState } from "react";
import "./CheckInKiosk.css";

const recentCheckIns = [
  ["Renz Mendoza", "FP-2024-0137", "8:45 AM"],
  ["Angela Reyes", "FP-2024-0247", "8:40 AM"],
  ["Mark Dela Cruz", "FP-2024-0112", "8:35 AM"],
];

const CheckInKiosk = () => {
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
    <div className="checkin-page">
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
    </div>
  );
};

export default CheckInKiosk;
