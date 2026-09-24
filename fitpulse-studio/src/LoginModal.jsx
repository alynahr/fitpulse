import React, { useState } from "react";
import "./LoginModal.css";
import AppIcon from "./components/AppIcon";
import { addMemberToDB } from "./services/api";

// Firebase Imports
import { auth } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

const LoginModal = ({
  isOpen,
  onClose,
  onForgotPassword,
  onStaffLogin,
  onMemberLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState("Member");

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // HANDLE EMAIL & PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user?.email) {
        sessionStorage.setItem("fitpulse_member_email", user.email);
      }

      // 2. Trigger respective callback based on selected role
      if (loginAs === "Staff") {
        if (onStaffLogin) onStaffLogin();
      } else {
        if (onMemberLogin) onMemberLogin();
      }

      // Reset state and close modal
      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      // Format error message for display
      const message = err.message
        .replace("Firebase: ", "")
        .replace(/\(auth\/.*\)\.?/, "")
        .trim();
      setError(message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE GOOGLE SIGN IN
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // 1. Authenticate with Google via Firebase
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user?.email) {
        sessionStorage.setItem("fitpulse_member_email", user.email);
        // Ensure member record exists for Google sign-in
        const displayName = user.displayName || user.email.split("@")[0];
        await addMemberToDB({ name: displayName, email: user.email });
      }

      if (loginAs === "Staff") {
        if (onStaffLogin) onStaffLogin();
      } else {
        if (onMemberLogin) onMemberLogin();
      }

      onClose();
    } catch (err) {
      const message = err.message
        .replace("Firebase: ", "")
        .replace(/\(auth\/.*\)\.?/, "")
        .trim();
      setError(message || "Google authentication failed.");
    } finally {
      setLoading(false);
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
            onClick={handleGoogleLogin}
            disabled={loading}
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


        {/* ERROR DISPLAY */}
        {error && (
          <p className="login-error" style={{ color: "#ff4d4d", textAlign: "center", fontSize: "0.85rem", marginBottom: "10px" }}>
            {error}
          </p>
        )}


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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default LoginModal;