import React, { useMemo, useState, useEffect } from "react";
import "./MemberDashboard.css";
import MemberSidebar from "./components/MemberSidebar";
import AppIcon from "./components/AppIcon";
import { auth } from "./firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getMemberFromDB, updateMemberInDB } from "./services/api";

const Icon = AppIcon;

/* ---------------------------------------------------------- */
/* Data Defaults & Fallbacks                                   */
/* ---------------------------------------------------------- */
const DEFAULT_MEMBER = {
  name: "User",
  fullName: "User",
  initials: "U",
  plan: "Premium Member",
  planName: "Premium Plan",
  memberId: "FP-0306-000123",
  validUntil: "May 31, 2026",
  nextBilling: "June 1, 2026",
  paymentMethod: "Visa ending in 4242",
  email: "",
  phone: "",
  dob: "",
  address: "",
};

const WEEK_DAYS = [
  { label: "MON", date: 12 },
  { label: "TUE", date: 13 },
  { label: "WED", date: 14 },
  { label: "THU", date: 15 },
  { label: "FRI", date: 16 },
  { label: "SAT", date: 17 },
  { label: "SUN", date: 18 },
];

const SCHEDULE = {
  12: [],
  13: [
    { id: "c-yoga-13", name: "Vinyasa Yoga", studio: "Studio B", instructor: "Coach Sarah", time: "9:00 AM - 10:00 AM", spots: 9, capacity: 15, about: "A flowing, breath-linked practice to build strength and flexibility.", experience: "8 yrs Exp" },
  ],
  14: [
    { id: "c-hiit-14", name: "HIIT Training", studio: "Studio A (Ground Floor)", instructor: "Coach Alex", time: "7:00 AM - 8:00 AM", duration: "60 minutes", spots: 8, capacity: 20, about: "High-intensity interval training to boost your endurance and burn calories. Suitable for all fitness levels. Bring water and a towel!", role: "HIIT Specialist", experience: "6 yrs Exp" },
    { id: "c-yoga-14", name: "Vinyasa Yoga", studio: "Studio B", instructor: "Coach Sarah", time: "9:00 AM - 10:00 AM", duration: "60 minutes", spots: 15, capacity: 15, about: "A flowing, breath-linked practice to build strength and flexibility.", role: "Yoga Instructor", experience: "8 yrs Exp" },
    { id: "c-core-14", name: "Core & Abs", studio: "Studio A", instructor: "Coach Marcus", time: "5:00 PM - 6:00 PM", duration: "60 minutes", spots: 6, capacity: 10, about: "Targeted core work to build a stronger, more stable midsection.", role: "Strength Coach", experience: "5 yrs Exp" },
    { id: "c-spin-14", name: "Spin Endurance", studio: "Studio C", instructor: "Coach Jessica", time: "6:30 PM - 7:30 PM", duration: "60 minutes", spots: 12, capacity: 20, about: "A high-energy ride built to push your cardio endurance to the next level.", role: "Cycling Coach", experience: "4 yrs Exp" },
  ],
  15: [],
  16: [
    { id: "c-spin-16", name: "Spin Endurance", studio: "Studio C", instructor: "Coach Jessica", time: "6:30 PM - 7:30 PM", spots: 10, capacity: 20, about: "A high-energy ride built to push your cardio endurance to the next level.", experience: "4 yrs Exp" },
  ],
  17: [],
  18: [],
};

const INITIAL_BOOKINGS = [
  { id: "b1", name: "HIIT Training", instructor: "Coach Alex", studio: "Studio A", date: "May 14, 2026", time: "7:00 AM", status: "CONFIRMED" },
  { id: "b2", name: "Spin Endurance", instructor: "Coach Jessica", studio: "Studio C", date: "May 16, 2026", time: "6:30 PM", status: "CONFIRMED" },
];

const PAST_BOOKINGS = [
  { id: "p1", name: "Yoga Flow", instructor: "Coach Sarah", studio: "Studio A", date: "May 23, 2024", time: "7:00 AM", status: "ATTENDED" },
  { id: "p2", name: "HIIT Blast", instructor: "Coach Alex", studio: "Studio B", date: "May 21, 2024", time: "8:00 PM", status: "ATTENDED" },
  { id: "p3", name: "Cardio Endurance", instructor: "Coach Alex", studio: "Main Gym", date: "May 17, 2024", time: "8:15 AM", status: "ATTENDED" },
];

const ATTENDANCE_STATS = [
  { label: "Total Check-ins", sub: "This Month", value: 24, icon: "calendar" },
  { label: "Workouts", sub: "This Month", value: 18, icon: "trending" },
  { label: "Classes Attended", sub: "This Month", value: 12, icon: "users" },
  { label: "Day Streak", sub: "keep it up!", value: 8, icon: "flame" },
];

const ACTIVE_DAYS = [3, 5, 7, 9, 11, 13, 14, 15, 17, 19, 21, 23, 24, 27, 31];
const HOT_DAYS = [3, 19, 24, 31];

const RECENT_CHECKINS = [
  { name: "Strength Training", place: "Main Gym", when: "May 24, 2024 - 6:30 PM", type: "Workout" },
  { name: "Yoga Flow", place: "Studio A", when: "May 23, 2024 - 7:00 AM", type: "Class" },
  { name: "HIIT Blast", place: "Studio B", when: "May 21, 2024 - 8:00 PM", type: "Class" },
  { name: "Upper Body Strength", place: "Main Gym", when: "May 19, 2024 - 6:30 PM", type: "Workout" },
  { name: "Cardio Endurance", place: "Main Gym", when: "May 17, 2024 - 8:15 AM", type: "Workout" },
  { name: "Core & Abs", place: "Studio A", when: "May 15, 2024 - 5:00 PM", type: "Class" },
  { name: "Spin Endurance", place: "Studio C", when: "May 13, 2024 - 6:30 PM", type: "Class" },
];

const BILLING_HISTORY = [
  { date: "May 1, 2026", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Apr 1, 2026", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Mar 1, 2026", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Feb 1, 2026", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Jan 1, 2026", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Dec 1, 2025", desc: "Premium Plan Monthly Tier", amount: "$49.99", status: "PAID" },
  { date: "Nov 1, 2025", desc: "Basic Plan Monthly Tier", amount: "$19.99", status: "PAID" },
];

const PLANS = [
  { key: "Basic", name: "Basic", price: "$19.99", features: ["Access to Gym Floor", "Locker Room Access", "1 Fitness Assessment"] },
  { key: "Premium", name: "Premium", price: "$49.99", features: ["All Basic Benefits", "Unlimited Group Classes", "Sauna & Steam Room"] },
  { key: "Elite", name: "Elite", price: "$79.99", features: ["All Premium Benefits", "2 Personal Training Sessions", "Guest Passes (2/mo)"] },
];

/* ---------------------------------------------------------- */
/* Shared layout bits                                          */
/* ---------------------------------------------------------- */
const TopBar = ({ eyebrow, title, sub, right }) => (
  <header className="mv-header">
    <div>
      {eyebrow && <span className="mv-eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
    <div className="mv-header-right">{right}</div>
  </header>
);

const ProfileBadge = ({ member }) => (
  <div className="mv-profile-badge">
    <button className="mv-icon-btn" aria-label="Notifications"><Icon name="bell" /></button>
    <div className="mv-avatar-wrap">
      <span className="mv-avatar">{member.initials}</span>
    </div>
    <div className="mv-profile-text">
      <strong>{member.name}</strong>
      <small>{member.plan}</small>
    </div>
  </div>
);

/* ---------------------------------------------------------- */
/* Dashboard                                                    */
/* ---------------------------------------------------------- */
const Dashboard = ({ go, bookingsCount, member }) => (
  <>
    <TopBar eyebrow="MEMBER WORKSPACE" title="Dashboard" sub="Let's crush your goals today." right={<ProfileBadge member={member} />} />
    <div className="mv-body">
      <h2 className="mv-greeting">Hello, {member.name}! 👋</h2>
      <p className="mv-greeting-sub">Your body can stand almost anything, it's your mind that needs convincing.</p>

      <div className="mv-dash-grid">
        <div className="mv-dash-col">
          <section className="mv-panel mv-plan-card">
            <div className="mv-plan-head">
              <span className="mv-panel-icon"><Icon name="award" /></span>
              <div>
                <p className="mv-label">CURRENT MEMBERSHIP</p>
                <strong>{member.planName}</strong>
              </div>
              <div className="mv-plan-valid">
                <p className="mv-label">VALID UNTIL</p>
                <strong>{member.validUntil}</strong>
              </div>
            </div>
            <button className="mv-btn-primary mv-full" onClick={() => go("settings")}>RENEW NOW</button>
          </section>

          <section className="mv-panel">
            <p className="mv-label">NEXT UPCOMING CLASS</p>
            <div className="mv-next-class">
              <div className="mv-next-thumb" />
              <div>
                <strong>HIIT Training</strong>
                <p className="mv-link-text">with Coach Alex</p>
                <div className="mv-next-meta">
                  <span><Icon name="calendar" size={12} /> May 14, 2026</span>
                  <span><Icon name="clock" size={12} /> 7:00 AM</span>
                  <span><Icon name="mapPin" size={12} /> Studio A</span>
                </div>
              </div>
            </div>
            <button className="mv-btn-ghost mv-full" onClick={() => go("bookings")}>VIEW BOOKING</button>
          </section>
        </div>

        <div className="mv-dash-col mv-dash-side">
          <div className="mv-mini-stats">
            <div className="mv-panel mv-mini-stat"><strong>12</strong><p>Classes Attended</p></div>
            <div className="mv-panel mv-mini-stat"><strong>{bookingsCount}</strong><p>Upcoming Bookings</p></div>
          </div>
          <section className="mv-panel">
            <p className="mv-label">QUICK ACTIONS</p>
            <div className="mv-quick-actions">
              <button onClick={() => go("schedule")}><Icon name="plus" /> Book a Class</button>
              <button onClick={() => go("bookings")}><Icon name="calendar" /> My Bookings</button>
              <button onClick={() => go("idpass")}><Icon name="key" /> My ID Pass</button>
              <button onClick={() => go("billing")}><Icon name="card" /> View Billing</button>
            </div>
          </section>
        </div>
      </div>

      <section className="mv-refer">
        <div>
          <span className="mv-eyebrow">REFER A FRIEND</span>
          <h3>Get 1 week FREE</h3>
          <p>For every successful referral that signs up for any premium tier plan.</p>
        </div>
        <button className="mv-btn-primary">REFER NOW</button>
      </section>
    </div>
  </>
);

/* ---------------------------------------------------------- */
/* Class Schedule + Detail Modal                                */
/* ---------------------------------------------------------- */
const ClassDetailModal = ({ cls, onClose, onBook, isBooked }) => (
  <div className="mv-modal-overlay" onClick={onClose}>
    <div className="mv-modal" onClick={(e) => e.stopPropagation()}>
      <div className="mv-modal-head">
        <span className="mv-eyebrow">CLASS DETAILS</span>
        <button className="mv-icon-btn" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="mv-modal-banner">
        <span>{cls.name}</span>
      </div>
      <div className="mv-modal-body">
        <h2>{cls.name}</h2>
        <p className="mv-link-text">with {cls.instructor}</p>

        <div className="mv-modal-meta">
          <span><Icon name="mapPin" size={13} /> {cls.studio}</span>
          <span><Icon name="calendar" size={13} /> Wednesday, May 14, 2026</span>
          <span><Icon name="clock" size={13} /> {cls.time} {cls.duration ? `(${cls.duration})` : ""}</span>
          <span><Icon name="users" size={13} /> {cls.spots} / {cls.capacity} slots available</span>
        </div>

        <h4>About this class</h4>
        <p className="mv-modal-about">{cls.about}</p>

        <div className="mv-modal-coach">
          <span className="mv-avatar small">{(cls.instructor || "").split(" ").map(w => w[0]).slice(-2).join("")}</span>
          <div>
            <strong>{cls.instructor}</strong>
            <p>{cls.role || "Instructor"} · {cls.experience}</p>
          </div>
        </div>

        <button
          className="mv-btn-primary mv-full"
          disabled={cls.spots >= cls.capacity || isBooked}
          onClick={() => onBook(cls)}
        >
          {isBooked ? "ALREADY BOOKED" : cls.spots >= cls.capacity ? "CLASS FULL" : "BOOK CLASS"}
        </button>
      </div>
    </div>
  </div>
);

const ClassSchedule = ({ bookings, onAddBooking }) => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [viewMode, setViewMode] = useState("List");
  const [selectedClass, setSelectedClass] = useState(null);
  const [justBooked, setJustBooked] = useState(null);

  const classesForDay = SCHEDULE[selectedDate] || [];
  const bookedNames = useMemo(() => new Set(bookings.map((b) => b.name)), [bookings]);

  const handleBook = (cls) => {
    onAddBooking(cls);
    setSelectedClass(null);
    setJustBooked(cls.name);
    setTimeout(() => setJustBooked(null), 3000);
  };

  return (
    <>
      <TopBar
        title="Class Schedule"
        sub="Find and book your next sweat session"
        right={
          <>
            <select className="mv-select"><option>All Instructors</option></select>
            <select className="mv-select"><option>All Studios</option></select>
          </>
        }
      />
      <div className="mv-body">
        {justBooked && <div className="mv-toast">Booked “{justBooked}” — see it under My Bookings.</div>}

        <div className="mv-schedule-toolbar">
          <div className="mv-month-nav">
            <button className="mv-icon-btn"><Icon name="chevronLeft" /></button>
            <strong>May 2026</strong>
            <button className="mv-icon-btn"><Icon name="chevronRight" /></button>
          </div>
          <div className="mv-view-toggle">
            <button className={viewMode === "List" ? "active" : ""} onClick={() => setViewMode("List")}>List</button>
            <button className={viewMode === "Calendar" ? "active" : ""} onClick={() => setViewMode("Calendar")}>Calendar</button>
          </div>
        </div>

        <div className="mv-week-strip">
          {WEEK_DAYS.map((d) => (
            <button
              key={d.date}
              className={`mv-week-day ${selectedDate === d.date ? "active" : ""}`}
              onClick={() => setSelectedDate(d.date)}
            >
              <span>{d.label}</span>
              <strong>{d.date}</strong>
            </button>
          ))}
        </div>

        <div className="mv-class-list">
          {classesForDay.length === 0 && (
            <div className="mv-empty">No classes scheduled for this day yet — check another date.</div>
          )}
          {classesForDay.map((cls) => {
            const full = cls.spots >= cls.capacity;
            const booked = bookedNames.has(cls.name);
            return (
              <div className="mv-class-row" key={cls.id}>
                <div>
                  <strong>{cls.name}</strong>
                  <p className="mv-link-text"><Icon name="mapPin" size={11} /> {cls.studio}</p>
                </div>
                <div>
                  <p>{cls.time}</p>
                  <p className="mv-muted">{cls.instructor}</p>
                </div>
                <div className={`mv-spots ${full ? "full" : ""}`}>
                  <Icon name="users" size={13} /> {cls.spots}/{cls.capacity}
                </div>
                <button
                  className={full ? "mv-btn-disabled" : "mv-btn-book"}
                  disabled={full}
                  onClick={() => setSelectedClass(cls)}
                >
                  {full ? "FULL" : booked ? "BOOKED" : "BOOK"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedClass && (
        <ClassDetailModal
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
          onBook={handleBook}
          isBooked={bookedNames.has(selectedClass.name)}
        />
      )}
    </>
  );
};

/* ---------------------------------------------------------- */
/* My Bookings                                                  */
/* ---------------------------------------------------------- */
const MyBookings = ({ bookings, onCancel }) => {
  const [tab, setTab] = useState("upcoming");
  const list = tab === "upcoming" ? bookings : PAST_BOOKINGS;

  return (
    <>
      <TopBar
        title="My Bookings"
        sub="Manage your upcoming workout calendar"
        right={
          <>
            <select className="mv-select"><option>All Instructors</option></select>
            <select className="mv-select"><option>All Studios</option></select>
          </>
        }
      />
      <div className="mv-body">
        <div className="mv-tabs">
          <button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
            Upcoming ({bookings.length})
          </button>
          <button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>
            Past Classes
          </button>
        </div>

        {list.length === 0 && <div className="mv-empty">Nothing here yet — book a class to see it show up.</div>}

        {list.map((b) => (
          <div className="mv-booking-card" key={b.id}>
            <div className="mv-booking-top">
              <span className={`mv-tag ${b.status === "CONFIRMED" ? "confirmed" : "attended"}`}>{b.status}</span>
              <span className="mv-muted">{b.studio}</span>
            </div>
            <strong>{b.name}</strong>
            <p className="mv-link-text">With {b.instructor}</p>
            <p className="mv-booking-time"><Icon name="clock" size={13} /> {b.date} · {b.time}</p>
            {tab === "upcoming" && (
              <div className="mv-booking-actions">
                <button className="mv-btn-ghost"><Icon name="calendar" size={13} /> Add to Cal</button>
                <button className="mv-btn-cancel" onClick={() => onCancel(b.id)}>Cancel</button>
              </div>
            )}
          </div>
        ))}

        {tab === "upcoming" && (
          <div className="mv-notice">
            <Icon name="info" />
            <div>
              <strong>Cancellation Policy</strong>
              <p>Please cancel at least 2 hours before class starts to avoid a late-cancellation fee.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/* ---------------------------------------------------------- */
/* My ID Pass                                                   */
/* ---------------------------------------------------------- */
const MyIDPass = ({ member }) => (
  <>
    <TopBar title="My ID Pass" sub="Your digital membership card" right={<span className="mv-tag confirmed"><Icon name="info" size={12} /> Ready to Scan</span>} />
    <div className="mv-body mv-center">
      <div className="mv-id-card">
        <p className="mv-id-tier">PREMIUM MEMBER</p>
        <p className="mv-id-brand">FITPULSE STUDIO</p>
        <div className="mv-id-code">
          {Array.from({ length: 100 }).map((_, i) => (
            <span key={i} style={{ opacity: Math.random() > 0.5 ? 1 : 0.15 }} />
          ))}
        </div>
        <strong className="mv-id-name">{member.fullName}</strong>
        <p className="mv-id-number">{member.memberId}</p>
        <div className="mv-id-divider" />
        <p className="mv-id-valid">Valid until <strong>{member.validUntil}</strong></p>
        <p className="mv-muted">Show this code at the front desk</p>
        <button className="mv-icon-btn mv-id-share" aria-label="Share pass"><Icon name="share" /></button>
      </div>
    </div>
  </>
);

/* ---------------------------------------------------------- */
/* Attendance                                                   */
/* ---------------------------------------------------------- */
const Attendance = ({ member }) => {
  const [showAll, setShowAll] = useState(false);
  const firstWeekdayOffset = 3;
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < firstWeekdayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const visibleCheckins = showAll ? RECENT_CHECKINS : RECENT_CHECKINS.slice(0, 5);

  return (
    <>
      <TopBar eyebrow="ATTENDANCE" title="Attendance History" right={<><button className="mv-btn-ghost">Export Report</button><ProfileBadge member={member} /></>} />
      <div className="mv-body">
        <div className="mv-stat-grid">
          {ATTENDANCE_STATS.map((s) => (
            <div className="mv-panel mv-stat-card" key={s.label}>
              <span className="mv-panel-icon"><Icon name={s.icon} /></span>
              <div>
                <strong>{s.value}</strong>
                <p>{s.label}</p>
                <small>{s.sub}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="mv-attendance-grid">
          <section className="mv-panel">
            <div className="mv-cal-head">
              <strong className="mv-panel-title mv-eyebrow-title">ACTIVITY CALENDAR</strong>
              <div className="mv-month-nav small">
                <button className="mv-icon-btn"><Icon name="chevronLeft" /></button>
                <span>May 2024</span>
                <button className="mv-icon-btn"><Icon name="chevronRight" /></button>
              </div>
              <div className="mv-legend"><span className="mv-muted">Less</span><i className="l1" /><i className="l2" /><i className="l3" /><span className="mv-muted">More</span></div>
            </div>
            <div className="mv-cal-grid">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => <span className="mv-cal-dow" key={d}>{d}</span>)}
              {cells.map((day, i) => {
                if (!day) return <span key={`b${i}`} />;
                const active = ACTIVE_DAYS.includes(day);
                const hot = HOT_DAYS.includes(day);
                return (
                  <span key={day} className={`mv-cal-cell ${active ? (hot ? "hot" : "active") : ""}`}>
                    {day}
                  </span>
                );
              })}
            </div>
            <div className="mv-cal-foot">
              <div><Icon name="trending" size={13} /> <strong>75%</strong><p>Monthly Consistency</p></div>
              <div><Icon name="clock" size={13} /> <strong>22h 30m</strong><p>Total Time Spent</p></div>
              <div className="up"><Icon name="trending" size={13} /> <strong>+18%</strong><p>vs Last Month</p></div>
            </div>
          </section>

          <section className="mv-panel">
            <div className="mv-panel-title-row">
              <strong className="mv-panel-title mv-eyebrow-title">RECENT CHECK-INS</strong>
              <button className="mv-link-btn" onClick={() => setShowAll(!showAll)}>{showAll ? "SHOW LESS" : "VIEW ALL"}</button>
            </div>
            <div className="mv-checkin-list">
              {visibleCheckins.map((c, i) => (
                <div className="mv-checkin-row" key={i}>
                  <span className="mv-panel-icon small"><Icon name={c.type === "Workout" ? "trending" : "users"} size={13} /></span>
                  <div>
                    <strong>{c.name}</strong>
                    <p className="mv-muted">{c.place} · {c.when}</p>
                  </div>
                  <span className="mv-tag">{c.type}</span>
                </div>
              ))}
            </div>
            <button className="mv-btn-ghost mv-full">VIEW FULL HISTORY</button>
          </section>
        </div>
      </div>
    </>
  );
};

/* ---------------------------------------------------------- */
/* Profile & Settings                                            */
/* ---------------------------------------------------------- */
const ProfileSettings = ({ activePlan, onSwitchPlan, go, member, onUpdateMember }) => {
  const [form, setForm] = useState({
    name: member?.fullName || "",
    email: member?.email || "",
    phone: member?.phone || "",
    dob: member?.dob || "",
    address: member?.address || "",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (member) {
      setForm({
        name: member.fullName || "",
        email: member.email || "",
        phone: member.phone || "",
        dob: member.dob || "",
        address: member.address || "",
      });
    }
  }, [member]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    const userEmail =
      String(form.email || member?.email || auth.currentUser?.email || sessionStorage.getItem("fitpulse_member_email") || "").trim();

    const updatedData = {
      email: userEmail,
      name: form.name,
      fullName: form.name,
      phone: form.phone,
      dob: form.dob,
      address: form.address,
      gender: member?.gender || "",
      city: member?.city || "",
      province: member?.province || "",
      postal_code: member?.postal_code || member?.postalCode || "",
      country: member?.country || "",
    };

    try {
      // 1. Update Firebase Authentication Profile (displayName)
      if (auth.currentUser && form.name) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: form.name,
          });
          console.log("Firebase Auth displayName updated successfully:", form.name);
        } catch (firebaseErr) {
          console.error("Firebase updateProfile error:", firebaseErr);
        }
      }

      // 2. Update AwardSpace MySQL members table
      if (typeof updateMemberInDB === "function" && userEmail) {
        const dbResult = await updateMemberInDB(updatedData);
        console.log("AwardSpace update result:", dbResult);
      }

      // 3. Update dashboard UI state
      if (onUpdateMember) {
        onUpdateMember(updatedData);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TopBar eyebrow="MEMBER WORKSPACE" title="Profile & Settings" sub="Manage your personal info, plan, and billing" right={<ProfileBadge member={member} />} />
      <div className="mv-body">
        <section className="mv-panel mv-profile-head">
          <span className="mv-avatar large">{member.initials}</span>
          <div className="mv-profile-head-text">
            <strong>{member.name}</strong>
            <div className="mv-profile-head-meta">
              <span className="mv-tag confirmed"><Icon name="award" size={11} /> {member.plan}</span>
              <span className="mv-muted">Member ID: {member.memberId}</span>
            </div>
          </div>
        </section>

        <div className="mv-profile-grid">
          <section className="mv-panel">
            <strong className="mv-panel-title">Personal Information</strong>
            <label className="mv-field"><span>FULL NAME</span><input value={form.name} onChange={update("name")} /></label>
            <label className="mv-field"><span>EMAIL</span><input value={form.email} disabled /></label>
            <div className="mv-field-row">
              <label className="mv-field"><span>PHONE</span><input value={form.phone} onChange={update("phone")} /></label>
              <label className="mv-field"><span>DATE OF BIRTH</span><input value={form.dob} onChange={update("dob")} /></label>
            </div>
            <label className="mv-field"><span>ADDRESS</span><input value={form.address} onChange={update("address")} /></label>
            <button className="mv-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
            {saved && <span className="mv-saved-msg">✓ Changes saved successfully!</span>}
          </section>

          <section className="mv-panel">
            <div className="mv-panel-title-row">
              <strong className="mv-panel-title">Billing History</strong>
              <span className="mv-tag confirmed">● ACTIVE ACCOUNT</span>
            </div>
            {BILLING_HISTORY.slice(0, 4).map((b, i) => (
              <div className="mv-billing-row" key={i}>
                <div>
                  <strong>{b.date}</strong>
                  <p className="mv-muted">{b.desc}</p>
                </div>
                <div className="mv-billing-amount">
                  <strong>{b.amount}</strong>
                  <span className="mv-tag confirmed">{b.status}</span>
                </div>
              </div>
            ))}
            <button className="mv-btn-primary mv-full" onClick={() => go("billing")}>VIEW ALL TRANSACTIONS</button>
          </section>

          <section className="mv-panel">
            <strong className="mv-panel-title">Current Subscription</strong>
            <div className="mv-current-plan">
              <span className="mv-panel-icon"><Icon name="award" /></span>
              <div>
                <p className="mv-label">CURRENT PLAN</p>
                <strong>{member.planName}</strong>
              </div>
              <div className="mv-plan-valid">
                <p className="mv-label">VALID UNTIL</p>
                <strong>{member.validUntil}</strong>
              </div>
            </div>
            <div className="mv-plan-rows">
              <span className="mv-muted">Next Billing Date</span><strong>{member.nextBilling}</strong>
              <span className="mv-muted">Payment Method</span><strong>{member.paymentMethod}</strong>
            </div>
            <div className="mv-sub-actions">
              <button className="mv-btn-primary">RENEW NOW</button>
              <button className="mv-btn-danger">CANCEL MEMBERSHIP</button>
            </div>
          </section>

          <section className="mv-panel">
            <strong className="mv-panel-title">Compare Membership Plans</strong>
            <div className="mv-plans">
              {PLANS.map((p) => (
                <div className={`mv-plan-tile ${activePlan === p.key ? "active" : ""}`} key={p.key}>
                  {activePlan === p.key && <span className="mv-plan-badge">ACTIVE</span>}
                  <strong>{p.name}</strong>
                  <p className="mv-plan-price">{p.price}<span>/mo</span></p>
                  <ul>{p.features.map((f) => <li key={f}><Icon name="checkCircle" size={11} /> {f}</li>)}</ul>
                  <button
                    className={activePlan === p.key ? "mv-btn-disabled" : "mv-btn-ghost"}
                    disabled={activePlan === p.key}
                    onClick={() => onSwitchPlan(p.key)}
                  >
                    {activePlan === p.key ? "CURRENT PLAN" : "SWITCH PLAN"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

/* ---------------------------------------------------------- */
/* Billing History (full)                                       */
/* ---------------------------------------------------------- */
const BillingHistoryFull = ({ member }) => (
  <>
    <TopBar title="Billing History" sub="All charges and payments on your account" right={<ProfileBadge member={member} />} />
    <div className="mv-body">
      <section className="mv-panel">
        {BILLING_HISTORY.map((b, i) => (
          <div className="mv-billing-row" key={i}>
            <div>
              <strong>{b.date}</strong>
              <p className="mv-muted">{b.desc}</p>
            </div>
            <div className="mv-billing-amount">
              <strong>{b.amount}</strong>
              <span className="mv-tag confirmed">{b.status}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  </>
);

/* ---------------------------------------------------------- */
/* Root component                                                */
/* ---------------------------------------------------------- */
const MemberDashboard = ({ onLogout }) => {
  const [view, setView] = useState("dashboard");
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activePlan, setActivePlan] = useState("Premium");
  const [navOpen, setNavOpen] = useState(false);
  const [member, setMember] = useState(DEFAULT_MEMBER);

  useEffect(() => {
    let isMounted = true;

    const loadMemberInfo = async (userEmail, currentUser) => {
      if (!userEmail) return;
      try {
        const data = await getMemberFromDB(userEmail);
        if (!isMounted) return;

        if (data && !data.error) {
          const fullName =
            data.name ||
            data.fullName ||
            data.full_name ||
            currentUser?.displayName ||
            "User";
          const email = data.email || userEmail;
          const phone =
            data.phone ||
            data.phoneNumber ||
            data.phone_number ||
            data.contact ||
            "";
          const dob =
            data.dob ||
            data.dateOfBirth ||
            data.date_of_birth ||
            data.birthdate ||
            "";

          let addressStr = data.address || "";
          if (data.city && !addressStr.includes(data.city)) {
            const parts = [addressStr, data.city, data.province].filter(Boolean);
            addressStr = parts.join(", ");
          }

          const memberIdNumber =
            data.id || data.member_id || data.memberId || 1;
          const memberIdFormatted = `FP-0306-${String(memberIdNumber).padStart(6, "0")}`;

          setMember((prev) => ({
            ...prev,
            fullName: fullName,
            name: fullName.split(" ")[0] || "User",
            initials: (fullName.charAt(0) || "U").toUpperCase(),
            email: email,
            phone: phone,
            dob: dob,
            address: addressStr,
            gender: data.gender || prev.gender || "",
            plan: data.plan || data.membership_type || prev.plan,
            planName: data.planName || data.plan_name || prev.planName,
            memberId: memberIdFormatted,
          }));
        } else if (currentUser && isMounted) {
          const fallbackName =
            currentUser.displayName ||
            currentUser.email?.split("@")[0] ||
            "User";
          setMember((prev) => ({
            ...prev,
            fullName: fallbackName,
            name: fallbackName.split(" ")[0] || "User",
            initials: (fallbackName.charAt(0) || "U").toUpperCase(),
            email: currentUser.email || prev.email,
          }));
        }
      } catch (err) {
        console.error("Failed to load member profile:", err);
      }
    };

    const immediateUser = auth.currentUser;
    const storedEmail =
      sessionStorage.getItem("fitpulse_member_email") ||
      localStorage.getItem("fitpulse_member_email");

    if (immediateUser?.email) {
      loadMemberInfo(immediateUser.email, immediateUser);
    } else if (storedEmail) {
      loadMemberInfo(storedEmail, null);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        sessionStorage.setItem("fitpulse_member_email", user.email);
        loadMemberInfo(user.email, user);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleUpdateMember = (updatedData) => {
    setMember((prev) => ({
      ...prev,
      fullName: updatedData.name || prev.fullName,
      name: updatedData.name ? updatedData.name.split(" ")[0] : prev.name,
      initials: updatedData.name
        ? updatedData.name.charAt(0).toUpperCase()
        : prev.initials,
      phone: updatedData.phone !== undefined ? updatedData.phone : prev.phone,
      dob: updatedData.dob !== undefined ? updatedData.dob : prev.dob,
      address: updatedData.address !== undefined ? updatedData.address : prev.address,
    }));
  };

  const go = (v) => setView(v);
  const selectNav = (key) => {
    setView(key);
    setNavOpen(false);
  };

  const addBooking = (cls) => {
    setBookings((prev) => {
      if (prev.some((b) => b.name === cls.name)) return prev;
      return [
        ...prev,
        {
          id: cls.id,
          name: cls.name,
          instructor: cls.instructor,
          studio: cls.studio,
          date: "May 14, 2026",
          time: cls.time.split(" - ")[0],
          status: "CONFIRMED",
        },
      ];
    });
  };

  const cancelBooking = (id) => setBookings((prev) => prev.filter((b) => b.id !== id));

  const renderView = () => {
    switch (view) {
      case "dashboard": return <Dashboard go={go} bookingsCount={bookings.length} member={member} />;
      case "profile":
      case "settings":
      case "membership":
        return (
          <ProfileSettings
            activePlan={activePlan}
            onSwitchPlan={setActivePlan}
            go={go}
            member={member}
            onUpdateMember={handleUpdateMember}
          />
        );
      case "bookings": return <MyBookings bookings={bookings} onCancel={cancelBooking} />;
      case "schedule": return <ClassSchedule bookings={bookings} onAddBooking={addBooking} />;
      case "idpass": return <MyIDPass member={member} />;
      case "attendance": return <Attendance member={member} />;
      case "billing": return <BillingHistoryFull member={member} />;
      default: return <Dashboard go={go} bookingsCount={bookings.length} member={member} />;
    }
  };

  return (
    <div className="mv-page">
      <button className="fp-mobile-menu" onClick={() => setNavOpen(true)} aria-label="Open menu"><Icon name="menu" size={19} /></button>
      <MemberSidebar activePage={view} onNavigate={selectNav} onLogout={onLogout} open={navOpen} onClose={() => setNavOpen(false)} member={member} />
      <main className="mv-main fp-shell-main">{renderView()}</main>
    </div>
  );
};

export default MemberDashboard;