import React, { useState } from "react";
import "./Hero.css";
import LoginModal from "./LoginModal";
import JoinFlow from "./JoinFlow";
import AdminDashboard from "./AdminDashboard";
import ResetPassword from "./ResetPassword";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [membershipPreview, setMembershipPreview] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const openJoinFlow = () => {
    setMembershipPreview(false);
    setJoinOpen(true);
  };

  const openMembershipPreview = () => {
    setMembershipPreview(true);
    setJoinOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (adminView) {
    return <AdminDashboard onLogout={() => setAdminView(false)} />;
  }
  if (resetPasswordOpen) {
  return (
    <ResetPassword
      onBack={() => {
        setResetPasswordOpen(false);
        setLoginOpen(true);
      }}
    />
  );
}
  return (
    <div className="fitpulse-page">

      {/* =====================================
          MOBILE HEADER
      ===================================== */}

      <header className="mobile-header">

        <img
          src="/fitpulsetext.png"
          alt="FitPulse Studio"
          className="mobile-logo"
        />

        <div className="header-actions">

          <button className="header-join" onClick={openJoinFlow}>
            JOIN NOW
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

      </header>


      {/* =====================================
          MOBILE SIDE NAVIGATION
      ===================================== */}

      <div
        className={`menu-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      <aside
        className={`mobile-drawer ${menuOpen ? "open" : ""}`}
      >

        <div className="drawer-header">

          <img
            src="/fitpulsetext.png"
            alt="FitPulse Studio"
            className="drawer-logo"
          />

          <button
            className="drawer-close"
            onClick={closeMenu}
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        <div className="drawer-divider"></div>


        <nav className="drawer-navigation">

          <a
            href="#home"
            className="drawer-active"
            onClick={closeMenu}
          >
            HOME
          </a>

          <a
            href="#classes"
            onClick={closeMenu}
          >
            CLASSES
          </a>

          <a
            href="#membership"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              openMembershipPreview();
            }}
          >
            MEMBERSHIP
          </a>

          <a
            href="#trainers"
            onClick={closeMenu}
          >
            TRAINERS
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            ABOUT US
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            CONTACT
          </a>

        </nav>


        <div className="drawer-bottom">

          <p>
            Ready to start your fitness journey?
          </p>

          <button className="drawer-join" onClick={openJoinFlow}>
            JOIN NOW
          </button>

        </div>

      </aside>


      {/* =====================================
          DESKTOP HEADER
      ===================================== */}

      <header className="desktop-header">

        <img
          src="/fitpulsetext.png"
          alt="FitPulse Studio"
          className="desktop-logo"
        />

        <nav>

          <a className="active" href="#home">
            HOME
          </a>

          <a href="#classes">
            CLASSES
          </a>

          <a
            href="#membership"
            onClick={(event) => {
              event.preventDefault();
              openMembershipPreview();
            }}
          >
            MEMBERSHIP
          </a>

          <a href="#trainers">
            TRAINERS
          </a>

          <a href="#about">
            ABOUT US
          </a>

          <a href="#contact">
            CONTACT
          </a>

        </nav>

        <div className="desktop-actions">

          <button className="login-btn" onClick={() => setLoginOpen(true)}>
            LOGIN
          </button>

          <button className="desktop-join" onClick={openJoinFlow}>
            JOIN NOW
          </button>

        </div>

      </header>


      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero-section" id="home">

        <div className="hero-content">

          <h1>
            TRAIN.
            <br />
            PERFORM.
            <br />
            <span>LIVE BETTER.</span>
          </h1>

          <p className="hero-description">
            FitPulse Studio is more than a gym—it's a community
            designed to push your limits and help you become the
            strongest version of yourself.
          </p>

          <div className="hero-buttons">

            <button className="hero-join" onClick={openJoinFlow}>
              JOIN NOW
            </button>

            <button className="hero-login" onClick={() => setLoginOpen(true)}>
              LOGIN
            </button>

          </div>

        </div>


        {/* =====================================
            FEATURES
        ===================================== */}

        <div className="feature-grid" id="classes">

          <FeatureCard
            icon="⚒"
            title="MODERN EQUIPMENT"
            description="Train with state-of-the-art machines and facilities."
          />

          <FeatureCard
            icon="●"
            title="EXPERT TRAINERS"
            description="Certified professionals here to guide you."
          />

          <FeatureCard
            icon="■"
            title="DIVERSE CLASSES"
            description="From HIIT to Yoga, find the class that fits you."
          />

          <FeatureCard
            icon="●"
            title="STRONG COMMUNITY"
            description="Join a supportive community that motivates you."
          />

        </div>

      </section>


      {/* =====================================
          RESULTS
      ===================================== */}

      <section className="results-section">

        <div className="results-heading">

          <span>
            WHY CHOOSE US
          </span>

          <h2>
            DESIGNED FOR RESULTS
          </h2>

          <div className="heading-line"></div>

          <p>
            At FitPulse Studio, we combine premium equipment,
            expert coaching, and a motivating community to help
            you achieve your fitness goals.
          </p>

        </div>


        <div className="stats-grid">

          <StatCard
            icon="●"
            number="2,500+"
            label="ACTIVE MEMBERS"
          />

          <StatCard
            icon="⚒"
            number="60+"
            label="WEEKLY CLASSES"
          />

          <StatCard
            icon="●"
            number="20+"
            label="EXPERT TRAINERS"
          />

          <StatCard
            icon="★"
            number="4.9/5"
            label="MEMBER RATING"
          />

        </div>

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer" id="contact">

        <div className="footer-main">


          {/* =================================
              BRAND
          ================================= */}

          <div className="footer-brand">

            <img
            src="/fitpulsetext.png"
            alt="FitPulse Studio"
            className="footer-logo"
            />

            <p>
              FitPulse Studio is more than a gym—it's a
              community designed to help you achieve your goals.
            </p>

            <div className="social-icons">

              <a href="#" aria-label="Facebook">
                f
              </a>

              <a href="#" aria-label="Instagram">
                ◎
              </a>

              <a href="#" aria-label="Twitter">
                ♥
              </a>

              <a href="#" aria-label="YouTube">
                ▶
              </a>

            </div>

          </div>


          {/* =================================
              QUICK LINKS
          ================================= */}

          <div className="footer-column">

            <h4>
              QUICK LINKS
            </h4>

            <div className="footer-links">

              <a href="#home">
                Home
              </a>

              <a href="#classes">
                Classes
              </a>

              <a
                href="#membership"
                onClick={(event) => {
                  event.preventDefault();
                  openMembershipPreview();
                }}
              >
                Membership
              </a>

              <a href="#trainers">
                Trainers
              </a>

              <a href="#about">
                About Us
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

          </div>


          {/* =================================
              CLASSES
          ================================= */}

          <div className="footer-column">

            <h4>
              OUR CLASSES
            </h4>

            <div className="footer-links">

              <a href="#">
                HIIT Training
              </a>

              <a href="#">
                Strength & Conditioning
              </a>

              <a href="#">
                Yoga & Mindfulness
              </a>

              <a href="#">
                Cycling
              </a>

              <a href="#">
                Boxing
              </a>

              <a href="#">
                Pilates
              </a>

            </div>

          </div>


          {/* =================================
              CONTACT
          ================================= */}

          <div className="footer-column contact-column">

            <h4>
              CONTACT INFO
            </h4>

            <div className="contact-info">

              <p>
                <span>⌖</span>
                123 Fitness Ave, NY
              </p>

              <p>
                <span>✉</span>
                hello@fitpulsetudio.com
              </p>

              <p>
                <span>☎</span>
                +63 912 345 6789
              </p>

            </div>

            <button className="footer-join">
              JOIN NOW
            </button>

          </div>

        </div>


        {/* =====================================
            FOOTER BOTTOM
        ===================================== */}

        <div className="footer-bottom">

          <p>
            © 2026 FitPulse Studio. All rights reserved.
          </p>

          <div className="legal-links">

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms of Service
            </a>

            <a href="#">
              Cookies
            </a>

          </div>

        </div>

      </footer>
       <LoginModal
      isOpen={loginOpen}
      onClose={() => setLoginOpen(false)}

      onStaffLogin={() => {
      setLoginOpen(false);
      setAdminView(true);
      }}

      onForgotPassword={() => {
      setLoginOpen(false);
      setResetPasswordOpen(true);
      }}
      />

        <JoinFlow
        isOpen={joinOpen}
        onClose={() => setJoinOpen(false)}
        previewOnly={membershipPreview}
        />     
    </div>
  );
};


/* =========================================
   FEATURE CARD
========================================= */

const FeatureCard = ({
  icon,
  title,
  description
}) => {

  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
};


/* =========================================
   STAT CARD
========================================= */

const StatCard = ({
  icon,
  number,
  label
}) => {

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <strong>
        {number}
      </strong>

      <span>
        {label}
      </span>
        
    </div>
  );
};


export default Hero;