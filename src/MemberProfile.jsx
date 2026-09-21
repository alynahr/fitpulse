import React, { useState } from "react";
import "./MemberProfile.css";

const MemberProfile = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [status, setStatus] = useState("Active");
  const [tier, setTier] = useState("Premium Plan");
  const [memberName, setMemberName] = useState("");

  return (
    <div className="member-profile-page">
        <header className="admin-header">
          <div className="admin-header-copy"><h1>Member Profile</h1><p>Staff Panel / Gym Management</p></div>
          <div className="admin-profile"><span className="date">[ ] &nbsp; Oct 31, 2024</span><span><strong>Admin</strong><small>Gym Manager</small></span><span className="profile-avatar">A</span></div>
        </header>

        <div className="member-profile-content">
          <button className="back-directory" onClick={onBack}>&lt;- &nbsp; Back to Member Directory</button>
          <div className="profile-layout">
            <section className="member-summary">
              <div className="member-photo-placeholder">+</div>
              <h2>{memberName || "New Member"}</h2>
              <span className="profile-status">ACTIVE</span>
              <div className="summary-divider"></div>
              <dl>
                <dt>MEMBER ID</dt><dd className="accent-text">Assigned on save</dd>
                <dt>MEMBERSHIP LEVEL</dt><dd>{tier}</dd>
                <dt>EMAIL ADDRESS</dt><dd>member@example.com</dd>
                <dt>PHONE NUMBER</dt><dd>+1 (555) 234-8921</dd>
              </dl>
            </section>

            <section className="profile-editor">
              <nav className="profile-tabs">
                {["Overview", "Membership", "Billing", "Notes"].map((tab) => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
              </nav>
              <div className="profile-form">
                <h2>Overview &amp; Plan Configuration</h2>
                <label className="member-name-field">Full Name<input type="text" placeholder="Enter member name" value={memberName} onChange={(event) => setMemberName(event.target.value)} /></label>
                <div className="profile-form-row">
                  <label>Join Date<input type="text" placeholder="October 31, 2024" /></label>
                  <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>Active</option><option>Pending</option><option>Suspended</option></select></label>
                </div>
                <fieldset>
                  <legend>Membership Dates <span>?</span></legend>
                  <div className="profile-form-row">
                    <label>Start Date<input type="text" placeholder="10 / 31 / 2024" /></label>
                    <label>End Date<input type="text" placeholder="10 / 31 / 2025" /></label>
                  </div>
                </fieldset>
                <div className="profile-form-row">
                  <label>Year of Contract<input type="text" placeholder="2024 (Year 1)" /></label>
                  <label>Membership Tier<select value={tier} onChange={(event) => setTier(event.target.value)}><option>Premium Plan</option><option>Basic Strength</option><option>VIP Unlimited</option></select></label>
                </div>
                <div className="profile-actions"><button className="profile-cancel btn btn-secondary" onClick={onBack}>Cancel</button><button className="profile-save btn btn-primary" onClick={onBack}>Save Changes</button></div>
              </div>
            </section>
          </div>
        </div>
    </div>
  );
};

export default MemberProfile;
