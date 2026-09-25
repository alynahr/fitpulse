import React, { useState } from "react";
import "./LoginModal.css";
import AppIcon from "./components/AppIcon";

const LoginModal = ({
  isOpen,
  onClose,
  onForgotPassword,
  onStaffLogin,
  onMemberLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState("Member");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();

    // STAFF LOGIN
    if (loginAs === "Staff") {
      if (onStaffLogin) {
        onStaffLogin();
      }
      return;
    }

    if (onMemberLogin) {
      onMemberLogin();
    }
  };

  return (
    <div
      className="login-overlay"
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="login-close"
          onClick={onClose}
          aria-label="Close login"
        >
          <AppIcon name="x" size={18} />
        </button>


        {/* LOGIN HEADER */}
        <div className="login-header">
          <h2>WELCOME BACK</h2>

          <p>
            Login to your FitPulse Studio account
          </p>
        </div>


        {/* SOCIAL LOGIN */}
        <div className="social-login">

          <button
            type="button"
            className="social-login-btn"
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>


          <button
            type="button"
            className="social-login-btn"
          >
            <span className="apple-icon">
              ●
            </span>

            Continue with Apple
          </button>

        </div>


        {/* DIVIDER */}
        <div className="login-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>


        {/* LOGIN FORM */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* LOGIN AS */}
          <div className="input-group">

            <label>
              Login As
            </label>

            <div className="select-wrapper">

              <select
                value={loginAs}
                onChange={(e) =>
                  setLoginAs(e.target.value)
                }
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
              >
                <AppIcon name={showPassword ? "eyeOff" : "eye"} size={16} />
              </button>

            </div>

          </div>


          {/* REMEMBER / FORGOT */}
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
              onClick={() => {
                if (onForgotPassword) {
                  onForgotPassword();
                }
              }}
            >
              Forgot password?
            </button>

          </div>


          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="modal-login-btn"
          >
            LOGIN
          </button>

        </form>

      </div>
    </div>
  );
};

export default LoginModal;