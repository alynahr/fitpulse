import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import "./Hero.css";
import LoginModal from "./LoginModal";
import JoinFlow from "./JoinFlow";
import AdminDashboard from "./AdminDashboard";
import ResetPassword from "./ResetPassword";
import MemberDashboard from "./MemberDashboard";
import heroImage from "./assets/hero.png";
import AppIcon from "./components/AppIcon";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [membershipPreview, setMembershipPreview] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [memberView, setMemberView] = useState(false);
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
  if (memberView) {
    return <MemberDashboard onLogout={() => setMemberView(false)} />;
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

      <header className="public-header">
        <NavLink className="public-brand" to="/#home" aria-label="FitPulse Studio home">
          <img src="/fitpulsetext.png" alt="FitPulse Studio" />
        </NavLink>
        <Button className="public-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><AppIcon name="menu" size={19} /></Button>
        <nav className="public-navigation" aria-label="Public navigation">
          <NavLink className="active" to="/#home">HOME</NavLink>
          <NavLink to="/#classes">CLASSES</NavLink>
          <NavLink to="/#membership" onClick={(event) => { event.preventDefault(); openMembershipPreview(); }}>MEMBERSHIP</NavLink>
          <NavLink to="/#trainers">TRAINERS</NavLink>
          <NavLink to="/#about">ABOUT US</NavLink>
          <NavLink to="/#contact">CONTACT</NavLink>
        </nav>
        <div className="public-actions">
          <Button className="public-login" onClick={() => setLoginOpen(true)}>LOGIN</Button>
          <Button className="public-join" onClick={openJoinFlow}>JOIN NOW</Button>
        </div>
      </header>
      <div className={`public-menu-overlay ${menuOpen ? "show" : ""}`} onClick={closeMenu} />
      <aside className={`public-drawer ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <div className="public-drawer-head">
          <span className="public-drawer-title">FITPULSE STUDIO</span>
          <Button className="public-drawer-close" onClick={closeMenu} aria-label="Close navigation"><AppIcon name="x" size={18} /></Button>
        </div>
        <nav className="public-drawer-nav">
          <NavLink to="/#home" onClick={closeMenu}>HOME</NavLink>
          <NavLink to="/#classes" onClick={closeMenu}>CLASSES</NavLink>
          <NavLink to="/#membership" onClick={(event) => { event.preventDefault(); closeMenu(); openMembershipPreview(); }}>MEMBERSHIP</NavLink>
          <NavLink to="/#trainers" onClick={closeMenu}>TRAINERS</NavLink>
          <NavLink to="/#about" onClick={closeMenu}>ABOUT US</NavLink>
          <NavLink to="/#contact" onClick={closeMenu}>CONTACT</NavLink>
        </nav>
        <Button className="public-join public-drawer-join" onClick={openJoinFlow}>JOIN NOW</Button>
      </aside>


      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero-section" id="home">

        <div className="hero-content">
          <span className="hero-kicker">FITNESS <b>•</b> COMMUNITY <b>•</b> RESULTS</span>
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

            <Button className="hero-join" onClick={openJoinFlow}>
              JOIN NOW
            </Button>


          </div>

        </div>
        <div className="hero-visual" aria-label="FitPulse training atmosphere">
          <img src={heroImage} alt="Athletes training at FitPulse Studio" />
          <div className="hero-visual-badge"><strong>60+</strong><span>WEEKLY CLASSES</span></div>
        </div>


        {/* =====================================
            FEATURES
        ===================================== */}

        <div className="feature-grid" id="classes">

          <FeatureCard
            icon="dumbbell"
            title="MODERN EQUIPMENT"
            description="Train with state-of-the-art machines and facilities."
          />

          <FeatureCard
            icon="user"
            title="EXPERT TRAINERS"
            description="Certified professionals here to guide you."
          />

          <FeatureCard
            icon="calendar"
            title="DIVERSE CLASSES"
            description="From HIIT to Yoga, find the class that fits you."
          />

          <FeatureCard
            icon="users"
            title="STRONG COMMUNITY"
            description="Join a supportive community that motivates you."
          />

        </div>

      </section>


      {/* =====================================
          RESULTS
      ===================================== */}

      <section className="results-section" id="about">

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
            icon="users"
            number="2,500+"
            label="ACTIVE MEMBERS"
          />

          <StatCard
            icon="calendar"
            number="60+"
            label="WEEKLY CLASSES"
          />

          <StatCard
            icon="user"
            number="20+"
            label="EXPERT TRAINERS"
          />

          <StatCard
            icon="star"
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

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                f
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                ◎
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                ♥
              </a>

              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
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

              <Link to="/#home">
                Home
              </Link>

              <Link to="/#classes">
                Classes
              </Link>

              <Link
                to="/#membership"
                onClick={(event) => {
                  event.preventDefault();
                  openMembershipPreview();
                }}
              >
                Membership
              </Link>

              <Link to="/#trainers">
                Trainers
              </Link>

              <Link to="/#about">
                About Us
              </Link>

              <Link to="/#contact">
                Contact
              </Link>

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

              <Link to="/#classes">
                HIIT Training
              </Link>

              <Link to="/#classes">
                Strength & Conditioning
              </Link>

              <Link to="/#classes">
                Yoga & Mindfulness
              </Link>

              <Link to="/#classes">
                Cycling
              </Link>

              <Link to="/#classes">
                Boxing
              </Link>

              <Link to="/#classes">
                Pilates
              </Link>

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

            <Button className="footer-join" onClick={openJoinFlow}>
              JOIN NOW
            </Button>

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

            <Link to="/#about">
              Privacy Policy
            </Link>

            <Link to="/#about">
              Terms of Service
            </Link>

            <Link to="/#about">
              Cookies
            </Link>

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

      onMemberLogin={() => {
      setLoginOpen(false);
      setMemberView(true);
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
        <AppIcon name={icon} size={20} />
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
        <AppIcon name={icon} size={17} />
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