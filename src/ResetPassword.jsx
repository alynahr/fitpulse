import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ResetPassword.css";
import AppIcon from "./components/AppIcon";

const ResetPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Reset password for:", email);

    // Later:
    // Connect this to your backend/API
  };

  return (
    <main className="reset-page">

      {/* =====================================
          RESET CONTAINER
      ===================================== */}

      <div className="reset-container">
            <Button
  type="button"
  className="reset-back"
  onClick={onBack}
  variant="link"
>
  <><AppIcon name="chevronLeft" size={15} /> Back to Login</>
</Button>

        {/* =====================================
            PROGRESS STEPS
        ===================================== */}

        <div className="reset-progress">
            
          {/* STEP 1 */}

          <div className="reset-step active">

            <div className="step-circle">
            </div>

            <span>
              ENTER EMAIL
            </span>

          </div>


          <div className="step-line"></div>


          {/* STEP 2 */}

          <div className="reset-step">

            <div className="step-circle">
            </div>

            <span>
              RESET
            </span>

          </div>


          <div className="step-line"></div>


          {/* STEP 3 */}

          <div className="reset-step">

            <div className="step-circle">
            </div>

            <span>
              DONE
            </span>

          </div>

        </div>


        {/* =====================================
            HEADING
        ===================================== */}

        <div className="reset-heading">

          <h1>
            Reset Your Password
          </h1>

          <p>
            Enter your email address below and we'll reset your password.
          </p>

        </div>


        {/* =====================================
            FORM
        ===================================== */}

        <form
          className="reset-form"
          onSubmit={handleSubmit}
        >

          <div className="reset-input-group">

            <label htmlFor="reset-email">
              EMAIL ADDRESS
            </label>

            <div className="reset-input-wrapper">

              <span className="email-icon">
                <AppIcon name="mail" size={15} />
              </span>

              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                required
              />

            </div>

          </div>


          {/* =====================================
              RESET BUTTON
          ===================================== */}

          <Button
            type="submit"
            className="reset-button"
            variant="primary"
          >
            Reset Password
          </Button>

        </form>

      </div>

    </main>
  );
};

export default ResetPassword;