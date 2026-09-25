import React, { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import "./MemberDashboard.css";
import MemberSidebar from "./components/MemberSidebar";
import AppIcon from "./components/AppIcon";

/* ---------------------------------------------------------- */
/* Legacy inline icon map retained only for compatibility.
// ----------------------------------------------------------
const ICONS = {
  grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></>,
  key: <><circle cx="7.5" cy="15.5" r="5.5" /><path d="M11 12 20 3" /><path d="M16 7l3 3" /><path d="M14 9l2.5 2.5" /></>,
  checkCircle: <><path d="M21 10.8V12a9 9 0 1 1-5.3-8.2" /><polyline points="21 4 12 13.01 9 10.01" /></>,
  card: <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.65 1.65 0 0 0-1.8-.3 1.65 1.65 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.65 1.65 0 0 0 .3-1.8 1.65 1.65 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.65 1.65 0 0 0 1.8.3H9a1.65 1.65 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 1 1.5 1.65 1.65 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.65 1.65 0 0 0-.3 1.8V9a1.65 1.65 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.65 1.65 0 0 0-1.5 1z" /></>,
  logOut: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  share: <><circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><line x1="8.3" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.3" y2="10.5" /></>,
  chevronLeft: <polyline points="15 18 9 12 15 6" />,
  chevronRight: <polyline points="9 18 15 12 9 6" />,
  mapPin: <><path d="M21 10c0 6.5-9 12.5-9 12.5S3 16.5 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
};
const Icon = ({ name, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {ICONS[name]}
  </svg>
);
*/
const Icon = AppIcon;

/* ---------------------------------------------------------- */
/* Data                                                        */
/* ---------------------------------------------------------- */
const MEMBER = {
  name: "User",
  fullName: "User Batumbakal",
  initials: "U",
  plan: "Premium Member",
  planName: "Premium Plan",
  memberId: "FP-0306-000123",
  validUntil: "May 31, 2026",
  nextBilling: "June 1, 2026",
  paymentMethod: "Visa ending in 4242",
  email: "batumbakal@email.com",
  phone: "0917 123 4567",
  dob: "Jan 15, 2000",
  address: "123 Purok Onse",
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

const ProfileBadge = () => (
  <div className="mv-profile-badge">
    <Button className="mv-icon-btn" aria-label="Notifications" variant="link"><Icon name="bell" /></Button>
    <div className="mv-avatar-wrap">
      <span className="mv-avatar">{MEMBER.initials}</span>
    </div>
    <div className="mv-profile-text">
      <strong>{MEMBER.name}</strong>
      <small>{MEMBER.plan}</small>
    </div>
  </div>
);

/* ---------------------------------------------------------- */
/* Dashboard                                                    */
/* ---------------------------------------------------------- */
const Dashboard = ({ go, bookingsCount }) => (
  <>
    <TopBar eyebrow="MEMBER WORKSPACE" title="Dashboard" sub="Let's crush your goals today." right={<ProfileBadge />} />
    <div className="mv-body">
      <h2 className="mv-greeting">Hello, {MEMBER.name}! 👋</h2>
      <p className="mv-greeting-sub">Your body can stand almost anything, it's your mind that needs convincing.</p>

      <div className="mv-dash-grid">
        <div className="mv-dash-col">
          <section className="mv-panel mv-plan-card">
            <div className="mv-plan-head">
              <span className="mv-panel-icon"><Icon name="award" /></span>
              <div>
                <p className="mv-label">CURRENT MEMBERSHIP</p>
                <strong>{MEMBER.planName}</strong>
              </div>
              <div className="mv-plan-valid">
                <p className="mv-label">VALID UNTIL</p>
                <strong>{MEMBER.validUntil}</strong>
              </div>
            </div>
            <Button className="mv-btn-primary mv-full" onClick={() => go("settings")} variant="primary">RENEW NOW</Button>
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
            <Button className="mv-btn-ghost mv-full" onClick={() => go("bookings")} variant="outline-light">VIEW BOOKING</Button>
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
              <Button onClick={() => go("schedule")} variant="link"><Icon name="plus" /> Book a Class</Button>
              <Button onClick={() => go("bookings")} variant="link"><Icon name="calendar" /> My Bookings</Button>
              <Button onClick={() => go("idpass")} variant="link"><Icon name="key" /> My ID Pass</Button>
              <Button onClick={() => go("billing")} variant="link"><Icon name="card" /> View Billing</Button>
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
        <Button className="mv-btn-primary" variant="primary">REFER NOW</Button>
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
        <Button className="mv-icon-btn" onClick={onClose} variant="link"><Icon name="x" /></Button>
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

        <Button
          className="mv-btn-primary mv-full"
          disabled={cls.spots >= cls.capacity || isBooked}
          onClick={() => onBook(cls)}
          variant="primary"
        >
          {isBooked ? "ALREADY BOOKED" : cls.spots >= cls.capacity ? "CLASS FULL" : "BOOK CLASS"}
        </Button>
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
            <Button className="mv-icon-btn" variant="link"><Icon name="chevronLeft" /></Button>
            <strong>May 2026</strong>
            <Button className="mv-icon-btn" variant="link"><Icon name="chevronRight" /></Button>
          </div>
          <div className="mv-view-toggle">
            <Button className={viewMode === "List" ? "active" : ""} onClick={() => setViewMode("List")} variant="link">List</Button>
            <Button className={viewMode === "Calendar" ? "active" : ""} onClick={() => setViewMode("Calendar")} variant="link">Calendar</Button>
          </div>
        </div>

        <div className="mv-week-strip">
          {WEEK_DAYS.map((d) => (
            <Button
              key={d.date}
              className={`mv-week-day ${selectedDate === d.date ? "active" : ""}`}
              onClick={() => setSelectedDate(d.date)}
              type="button"
              variant="link"
            >
              <span>{d.label}</span>
              <strong>{d.date}</strong>
            </Button>
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
                <Button
                  className={full ? "mv-btn-disabled" : "mv-btn-book"}
                  disabled={full}
                  onClick={() => setSelectedClass(cls)}
                  variant={full ? "secondary" : "primary"}
                >
                  {full ? "FULL" : booked ? "BOOKED" : "BOOK"}
                </Button>
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
          <Button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")} variant="link">
            Upcoming ({bookings.length})
          </Button>
          <Button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")} variant="link">
            Past Classes
          </Button>
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
                <Button className="mv-btn-ghost" variant="outline-light"><Icon name="calendar" size={13} /> Add to Cal</Button>
                <Button className="mv-btn-cancel" onClick={() => onCancel(b.id)} variant="outline-danger">Cancel</Button>
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
const MyIDPass = () => (
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
        <strong className="mv-id-name">{MEMBER.name}</strong>
        <p className="mv-id-number">{MEMBER.memberId}</p>
        <div className="mv-id-divider" />
        <p className="mv-id-valid">Valid until <strong>{MEMBER.validUntil}</strong></p>
        <p className="mv-muted">Show this code at the front desk</p>
        <Button className="mv-icon-btn mv-id-share" aria-label="Share pass" variant="link"><Icon name="share" /></Button>
      </div>
    </div>
  </>
);

/* ---------------------------------------------------------- */
/* Attendance                                                   */
/* ---------------------------------------------------------- */
const Attendance = () => {
  const [showAll, setShowAll] = useState(false);
  const firstWeekdayOffset = 3; // May 2024 starts on Wednesday
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < firstWeekdayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const visibleCheckins = showAll ? RECENT_CHECKINS : RECENT_CHECKINS.slice(0, 5);

  return (
    <>
      <TopBar eyebrow="ATTENDANCE" title="Attendance History" right={<><Button className="mv-btn-ghost" variant="outline-light">Export Report</Button><ProfileBadge /></>} />
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
                <Button className="mv-icon-btn" variant="link"><Icon name="chevronLeft" /></Button>
                <span>May 2024</span>
                <Button className="mv-icon-btn" variant="link"><Icon name="chevronRight" /></Button>
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
              <Button className="mv-link-btn" onClick={() => setShowAll(!showAll)} variant="link">{showAll ? "SHOW LESS" : "VIEW ALL"}</Button>
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
            <Button className="mv-btn-ghost mv-full" variant="outline-light">VIEW FULL HISTORY</Button>
          </section>
        </div>
      </div>
    </>
  );
};

/* ---------------------------------------------------------- */
/* Profile & Settings                                            */
/* ---------------------------------------------------------- */
const ProfileSettings = ({ activePlan, onSwitchPlan, go }) => {
  const [form, setForm] = useState({
    name: MEMBER.fullName,
    email: MEMBER.email,
    phone: MEMBER.phone,
    dob: MEMBER.dob,
    address: MEMBER.address,
  });
  const [saved, setSaved] = useState(false);
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <TopBar eyebrow="MEMBER WORKSPACE" title="Profile & Settings" sub="Manage your personal info, plan, and billing" right={<ProfileBadge />} />
      <div className="mv-body">
        <section className="mv-panel mv-profile-head">
          <span className="mv-avatar large">{MEMBER.initials}</span>
          <div className="mv-profile-head-text">
            <strong>{MEMBER.name}</strong>
            <div className="mv-profile-head-meta">
              <span className="mv-tag confirmed"><Icon name="award" size={11} /> {MEMBER.plan}</span>
              <span className="mv-muted">Member ID: {MEMBER.memberId}</span>
            </div>
          </div>
          <Button className="mv-btn-ghost" variant="outline-light"><Icon name="edit" size={13} /> EDIT PROFILE</Button>
        </section>

        <div className="mv-profile-grid">
          <section className="mv-panel">
            <strong className="mv-panel-title">Personal Information</strong>
            <label className="mv-field"><span>FULL NAME</span><input value={form.name} onChange={update("name")} /></label>
            <label className="mv-field"><span>EMAIL</span><input value={form.email} onChange={update("email")} /></label>
            <div className="mv-field-row">
              <label className="mv-field"><span>PHONE</span><input value={form.phone} onChange={update("phone")} /></label>
              <label className="mv-field"><span>DATE OF BIRTH</span><input value={form.dob} onChange={update("dob")} /></label>
            </div>
            <label className="mv-field"><span>ADDRESS</span><input value={form.address} onChange={update("address")} /></label>
            <Button className="mv-btn-primary" onClick={handleSave} variant="primary">SAVE CHANGES</Button>
            {saved && <span className="mv-saved-msg">Changes saved</span>}
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
            <Button className="mv-btn-primary mv-full" onClick={() => go("billing")} variant="primary">VIEW ALL TRANSACTIONS</Button>
          </section>

          <section className="mv-panel">
            <strong className="mv-panel-title">Current Subscription</strong>
            <div className="mv-current-plan">
              <span className="mv-panel-icon"><Icon name="award" /></span>
              <div>
                <p className="mv-label">CURRENT PLAN</p>
                <strong>{MEMBER.planName}</strong>
              </div>
              <div className="mv-plan-valid">
                <p className="mv-label">VALID UNTIL</p>
                <strong>{MEMBER.validUntil}</strong>
              </div>
            </div>
            <div className="mv-plan-rows">
              <span className="mv-muted">Next Billing Date</span><strong>{MEMBER.nextBilling}</strong>
              <span className="mv-muted">Payment Method</span><strong>{MEMBER.paymentMethod}</strong>
            </div>
            <div className="mv-sub-actions">
              <Button className="mv-btn-primary" variant="primary">RENEW NOW</Button>
              <Button className="mv-btn-danger" variant="danger">CANCEL MEMBERSHIP</Button>
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
                  <Button
                    className={activePlan === p.key ? "mv-btn-disabled" : "mv-btn-ghost"}
                    disabled={activePlan === p.key}
                    onClick={() => onSwitchPlan(p.key)}
                    variant={activePlan === p.key ? "secondary" : "outline-light"}
                  >
                    {activePlan === p.key ? "CURRENT PLAN" : "SWITCH PLAN"}
                  </Button>
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
const BillingHistoryFull = () => (
  <>
    <TopBar title="Billing History" sub="All charges and payments on your account" right={<ProfileBadge />} />
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
      case "dashboard": return <Dashboard go={go} bookingsCount={bookings.length} />;
      case "profile":
      case "settings":
      case "membership":
        return <ProfileSettings activePlan={activePlan} onSwitchPlan={setActivePlan} go={go} />;
      case "bookings": return <MyBookings bookings={bookings} onCancel={cancelBooking} />;
      case "schedule": return <ClassSchedule bookings={bookings} onAddBooking={addBooking} />;
      case "idpass": return <MyIDPass />;
      case "attendance": return <Attendance />;
      case "billing": return <BillingHistoryFull />;
      default: return <Dashboard go={go} bookingsCount={bookings.length} />;
    }
  };

  return (
    <div className="mv-page">
      <Button className="fp-mobile-menu" onClick={() => setNavOpen(true)} aria-label="Open menu" variant="link"><Icon name="menu" size={19} /></Button>
      <MemberSidebar activePage={view} onNavigate={selectNav} onLogout={onLogout} open={navOpen} onClose={() => setNavOpen(false)} />
      <main className="mv-main fp-shell-main">{renderView()}</main>
    </div>
  );
};

export default MemberDashboard;