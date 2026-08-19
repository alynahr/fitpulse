import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onStaffLogin }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState("Member");

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>

      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          className="login-close"
          onClick={onClose}
          aria-label="Close login"
        >
          ×
        </button>


        {/* =================================
            TABS
        ================================= */}

        <div className="login-tabs">

          <button
            className={activeTab === "login" ? "tab-active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={activeTab === "signup" ? "tab-active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>

        </div>


        {activeTab === "login" ? (

          <>
            {/* =================================
                SOCIAL LOGIN
            ================================= */}

            <div className="social-login">

              <button className="social-login-btn">
                <span className="google-icon">⊗</span>
                Continue with Google
              </button>

              <button className="social-login-btn">
                <span className="apple-icon">●</span>
                Continue with Apple
              </button>

            </div>


            {/* =================================
                OR DIVIDER
            ================================= */}

            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>


            {/* =================================
                LOGIN FORM
            ================================= */}

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (loginAs === "Staff") {
                  onStaffLogin();
                  return;
                }

                console.log("Member login submitted");
              }}
            >

              {/* LOGIN AS */}

              <div className="input-group">

                <label>
                  Login As
                </label>

                <div className="select-wrapper">

                  <select
                    value={loginAs}
                    onChange={(e) => setLoginAs(e.target.value)}
                  >
                    <option value="Member">
                      Member
                    </option>

                    <option value="Staff">
                      Staff
                    </option>
                  </select>

                  <span className="select-arrow">
                    ˅
                  </span>

                </div>

              </div>


              {/* EMAIL */}

              <div className="input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="input-group">

                <label>
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>

                </div>

              </div>


              {/* REMEMBER + FORGOT */}

              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                  />

                  <span className="custom-checkbox"></span>

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>


              {/* LOGIN */}

              <button
                type="submit"
                className="modal-login-btn"
              >
                LOGIN
              </button>

            </form>


            {/* FOOTER */}

            <p className="login-footer-text">
              Don't have an account?
              <button
                onClick={() => setActiveTab("signup")}
              >
                Sign up
              </button>
            </p>

          </>

        ) : (

          /* =================================
             SIGN UP
          ================================= */

          <div className="signup-content">

            <div className="signup-icon">
              +
            </div>

            <h2>
              Create Your Account
            </h2>

            <p>
              Join FitPulse Studio and start your
              fitness journey today.
            </p>

            <div className="signup-fields">

              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                />
              </div>

              <button className="modal-login-btn">
                CREATE ACCOUNT
              </button>

            </div>

            <p className="login-footer-text">
              Already have an account?
              <button
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default LoginModal;