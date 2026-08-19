import React, { useEffect, useState } from "react";
import "./JoinFlow.css";

const plans = [
  {
    id: "basic",
    name: "BASIC",
    price: 999,
    description: "Perfect for getting started with your fitness journey.",
    popular: false,
    features: [
      { text: "Access to gym", included: true },
      { text: "Basic equipment", included: true },
      { text: "Locker access", included: true },
      { text: "Group classes", included: false },
      { text: "Personal training", included: false },
      { text: "Nutrition guidance", included: false },
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 1499,
    description: "Ideal for those who want more from their workouts.",
    popular: true,
    features: [
      { text: "Access to gym", included: true },
      { text: "All group classes", included: true },
      { text: "Locker access", included: true },
      { text: "1 Personal training session", included: true },
      { text: "Nutrition guidance", included: true },
      { text: "Guest pass", included: false },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 2499,
    description: "The ultimate experience for serious results.",
    popular: false,
    features: [
      { text: "Access to gym", included: true },
      { text: "All group classes", included: true },
      { text: "Locker access", included: true },
      { text: "Unlimited personal training", included: true },
      { text: "Nutrition guidance", included: true },
      { text: "2 Guest passes / month", included: true },
    ],
  },
];

const JoinFlow = ({ isOpen, onClose, previewOnly = false }) => {
  const [step, setStep] = useState(previewOnly ? 2 : 1);

  useEffect(() => {
    if (isOpen) {
      setStep(previewOnly ? 2 : 1);
    }
  }, [isOpen, previewOnly]);

  const [selectedPlan, setSelectedPlan] = useState("premium");

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    password: "",
    confirmPassword: "",
    terms: false,

    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvc: "",
    saveCard: false,
  });

  if (!isOpen) return null;

  const selected = plans.find(
    (plan) => plan.id === selectedPlan
  );

  const registrationFee = 500;

  const subtotal =
    selected.price + registrationFee;

  const vat = subtotal * 0.12;

  const total = subtotal + vat;

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert(
        "Please agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    alert(
      `Payment submitted for ${selected.name} - ${formatCurrency(
        total
      )}`
    );
  };

  const closeFlow = () => {
    setStep(previewOnly ? 2 : 1);
    onClose();
  };

  return (
    <div
      className="join-flow-overlay"
      onClick={closeFlow}
    >
      <div
        className="join-flow-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}

        <button
          className="join-flow-close"
          onClick={closeFlow}
          aria-label="Close"
        >
          ×
        </button>


        {/* ===============================
            STEP INDICATOR
        =============================== */}

        {!previewOnly && <div className="join-step-indicator">

          <div
            className={`join-step ${
              step >= 1 ? "active" : ""
            }`}
          >
            <span>1</span>
            <p>MEMBER</p>
          </div>

          <div
            className={`join-step-line ${
              step >= 2 ? "active" : ""
            }`}
          />

          <div
            className={`join-step ${
              step >= 2 ? "active" : ""
            }`}
          >
            <span>2</span>
            <p>PLAN</p>
          </div>

          <div
            className={`join-step-line ${
              step >= 3 ? "active" : ""
            }`}
          />

          <div
            className={`join-step ${
              step >= 3 ? "active" : ""
            }`}
          >
            <span>3</span>
            <p>PAYMENT</p>
          </div>

        </div>}


        {/* ===============================
            STEP 1
        =============================== */}

        {step === 1 && (
          <form
            className="member-form"
            onSubmit={handleMemberSubmit}
          >

            <div className="join-card-header">

              <div className="join-header-icon">
                ♙
              </div>

              <div>
                <h2>JOIN AS MEMBER</h2>
                <p>
                  Fill in your details to get started
                  on your fitness journey.
                </p>
              </div>

            </div>


            <div className="join-section">

              <h3>PERSONAL INFORMATION</h3>

              <div className="form-row">

                <div className="form-field full">
                  <label>FULL NAME</label>

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      updateField(
                        "fullName",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

              </div>


              <div className="form-row">

                <div className="form-field">
                  <label>EMAIL ADDRESS</label>

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>


                <div className="form-field">
                  <label>PHONE NUMBER</label>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

              </div>


              <div className="form-row">

                <div className="form-field">
                  <label>DATE OF BIRTH</label>

                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      updateField(
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>


                <div className="form-field">
                  <label>GENDER</label>

                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      updateField(
                        "gender",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

              </div>

            </div>


            <div className="join-section">

              <h3>ADDRESS</h3>

              <div className="form-row">

                <div className="form-field full">
                  <label>ADDRESS</label>

                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

              </div>


              <div className="form-row">

                <div className="form-field">
                  <label>CITY</label>

                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      updateField(
                        "city",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>


                <div className="form-field">
                  <label>PROVINCE</label>

                  <input
                    type="text"
                    placeholder="Province"
                    value={formData.province}
                    onChange={(e) =>
                      updateField(
                        "province",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

              </div>


              <div className="form-row">

                <div className="form-field">
                  <label>POSTAL CODE</label>

                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) =>
                      updateField(
                        "postalCode",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>


                <div className="form-field">
                  <label>COUNTRY</label>

                  <select
                    value={formData.country}
                    onChange={(e) =>
                      updateField(
                        "country",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      Country
                    </option>

                    <option value="Philippines">
                      Philippines
                    </option>

                    <option value="United States">
                      United States
                    </option>

                    <option value="Canada">
                      Canada
                    </option>

                    <option value="Australia">
                      Australia
                    </option>
                  </select>
                </div>

              </div>

            </div>


            <div className="join-section">

              <h3>ACCOUNT INFORMATION</h3>

              <div className="form-row">

                <div className="form-field full">

                  <label>
                    CREATE PASSWORD
                  </label>

                  <div className="password-input">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create Password"
                      value={formData.password}
                      onChange={(e) =>
                        updateField(
                          "password",
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? "◉" : "◌"}
                    </button>

                  </div>

                </div>

              </div>


              <div className="form-row">

                <div className="form-field full">

                  <label>
                    CONFIRM PASSWORD
                  </label>

                  <div className="password-input">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm Password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={(e) =>
                        updateField(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? "◉" : "◌"}
                    </button>

                  </div>

                </div>

              </div>

            </div>


            <label className="terms-checkbox">

              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) =>
                  updateField(
                    "terms",
                    e.target.checked
                  )
                }
              />

              <span className="checkbox-box"></span>

              <span>
                I agree to the{" "}
                <a href="#terms">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#privacy">
                  Privacy Policy
                </a>
              </span>

            </label>


            <button
              type="submit"
              className="join-primary-btn"
            >
              CONTINUE TO SELECT PLAN
            </button>

          </form>
        )}


        {/* ===============================
            STEP 2
        =============================== */}

        {step === 2 && (
          <div className="plan-screen">

            <div className="join-card-header">

              <div className="join-header-icon">
                ▣
              </div>

              <div>
                <h2>CHOOSE YOUR PLAN</h2>
                <p>
                  Explore the membership plan that fits your goals.
                </p>
              </div>

            </div>


            <div className="plans-grid">

              {plans.map((plan) => (

                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan === plan.id
                      ? "selected"
                      : ""
                  }`}
                >

                  {plan.popular && (
                    <div className="popular-badge">
                      MOST POPULAR
                    </div>
                  )}


                  <h3>{plan.name}</h3>

                  <div className="plan-price">
                    <strong>
                      {formatCurrency(
                        plan.price
                      )}
                    </strong>

                    <span>/month</span>
                  </div>


                  <p className="plan-description">
                    {plan.description}
                  </p>


                  <div className="plan-divider"></div>


                  <ul className="plan-features">

                    {plan.features.map(
                      (feature, index) => (

                        <li
                          key={index}
                          className={
                            feature.included
                              ? "included"
                              : "excluded"
                          }
                        >

                          <span>
                            {feature.included
                              ? "✓"
                              : "×"}
                          </span>

                          {feature.text}

                        </li>

                      )
                    )}

                  </ul>


                  <button
                    className={
                      selectedPlan === plan.id
                        ? "plan-select selected-btn"
                        : "plan-select"
                    }
                    onClick={() =>
                      setSelectedPlan(plan.id)
                    }
                  >
                    SELECT PLAN
                  </button>

                </div>

              ))}

            </div>


            <div className="plan-benefits">

              <strong>
                ⓘ &nbsp; All plans include
              </strong>

              <div className="benefit-list">

                <span>
                  ♧ Modern Equipment
                </span>

                <span>
                  ♙ Expert Trainers
                </span>

                <span>
                  ✣ Clean Facilities
                </span>

                <span>
                  ♧ Supportive Community
                </span>

              </div>

            </div>


            {!previewOnly && <div className="plan-actions">

              <button
                className="back-btn"
                onClick={() => setStep(1)}
              >
                ← BACK
              </button>

              <button
                className="join-primary-btn"
                onClick={() => setStep(3)}
              >
                CONTINUE TO PAYMENT
              </button>

            </div>}

          </div>
        )}


        {/* ===============================
            STEP 3
        =============================== */}

        {step === 3 && (
          <div className="payment-screen">

            <div className="payment-layout">

              {/* ORDER SUMMARY */}

              <div className="order-summary">

                <h3>ORDER SUMMARY</h3>

                <div className="summary-plan">

                  <div className="summary-plan-top">

                    <span className="summary-plan-badge">
                      {selected.name} PLAN
                    </span>

                    <span className="summary-price">
                      {formatCurrency(
                        selected.price
                      )}
                      <small>/month</small>
                    </span>

                  </div>


                  <h4>
                    {selected.name === "BASIC"
                      ? "Basic Membership"
                      : selected.name === "PREMIUM"
                      ? "Premium Membership"
                      : "Elite Membership"}
                  </h4>

                  <p>
                    {selected.description}
                  </p>


                  <div className="summary-features">

                    <span>✓ Access to gym</span>

                    {selected.id !== "basic" && (
                      <span>
                        ✓ All group classes
                      </span>
                    )}

                    <span>✓ Locker access</span>

                    {selected.id !== "basic" && (
                      <span>✓ + 3 more</span>
                    )}

                  </div>

                </div>


                <div className="summary-lines">

                  <div>
                    <span>Monthly Plan</span>
                    <strong>
                      {formatCurrency(
                        selected.price
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Registration Fee (One-time)
                    </span>

                    <strong>
                      {formatCurrency(
                        registrationFee
                      )}
                    </strong>
                  </div>

                  <div className="summary-divider"></div>

                  <div>
                    <span>Subtotal</span>

                    <strong>
                      {formatCurrency(subtotal)}
                    </strong>
                  </div>

                  <div>
                    <span>VAT (12%)</span>

                    <strong>
                      {formatCurrency(vat)}
                    </strong>
                  </div>

                  <div className="summary-total">

                    <span>TOTAL</span>

                    <strong>
                      {formatCurrency(total)}
                    </strong>

                  </div>

                </div>


                <div className="secure-box">

                  <span>♧</span>

                  <p>
                    Secure checkout. Your payment
                    information is encrypted and
                    safe with us.
                  </p>

                </div>

              </div>


              {/* PAYMENT */}

              <form
                className="payment-box"
                onSubmit={handlePayment}
              >

                <div className="payment-title">

                  <h3>PAYMENT METHOD</h3>

                  <p>
                    Choose your preferred payment
                    method.
                  </p>

                </div>


                {/* PAYMENT OPTIONS */}

                <div className="payment-methods">

                  <button
                    type="button"
                    className={
                      paymentMethod === "card"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                  >

                    <span className="radio">
                      {paymentMethod === "card"
                        ? "●"
                        : ""}
                    </span>

                    <span>
                      ▭ &nbsp; Credit / Debit Card
                    </span>

                    <div className="card-brands">
                      VISA
                      <span>MASTERCARD</span>
                      AMEX
                    </div>

                  </button>


                  <button
                    type="button"
                    className={
                      paymentMethod === "gcash"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("gcash")
                    }
                  >

                    <span className="radio">
                      {paymentMethod === "gcash"
                        ? "●"
                        : ""}
                    </span>

                    <span>GCash</span>

                    <strong className="gcash">
                      G) GCash
                    </strong>

                  </button>


                  <button
                    type="button"
                    className={
                      paymentMethod === "maya"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("maya")
                    }
                  >

                    <span className="radio">
                      {paymentMethod === "maya"
                        ? "●"
                        : ""}
                    </span>

                    <span>Maya</span>

                    <strong className="maya">
                      maya
                    </strong>

                  </button>


                  <button
                    type="button"
                    className={
                      paymentMethod ===
                      "bank"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("bank")
                    }
                  >

                    <span className="radio">
                      {paymentMethod ===
                      "bank"
                        ? "●"
                        : ""}
                    </span>

                    <span>
                      Bank Transfer
                    </span>

                    <small>
                      BPI, BDO, Metrobank and more
                    </small>

                  </button>


                  <button
                    type="button"
                    className={
                      paymentMethod ===
                      "paypal"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("paypal")
                    }
                  >

                    <span className="radio">
                      {paymentMethod ===
                      "paypal"
                        ? "●"
                        : ""}
                    </span>

                    <span>PayPal</span>

                    <strong className="paypal">
                      PayPal
                    </strong>

                  </button>

                </div>


                {/* CARD DETAILS */}

                {paymentMethod === "card" && (
                  <div className="card-details">

                    <h3>CARD DETAILS</h3>


                    <div className="form-field full">

                      <label>
                        CARD NUMBER
                      </label>

                      <div className="input-with-icon">

                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={
                            formData.cardNumber
                          }
                          onChange={(e) =>
                            updateField(
                              "cardNumber",
                              e.target.value
                            )
                          }
                          required
                        />

                        <span>▭</span>

                      </div>

                    </div>


                    <div className="form-field full">

                      <label>
                        CARDHOLDER NAME
                      </label>

                      <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={
                          formData.cardholderName
                        }
                        onChange={(e) =>
                          updateField(
                            "cardholderName",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>


                    <div className="form-row">

                      <div className="form-field">

                        <label>
                          EXPIRY DATE
                        </label>

                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={
                            formData.expiryDate
                          }
                          onChange={(e) =>
                            updateField(
                              "expiryDate",
                              e.target.value
                            )
                          }
                          required
                        />

                      </div>


                      <div className="form-field">

                        <label>CVC</label>

                        <div className="input-with-icon">

                          <input
                            type="text"
                            placeholder="123"
                            value={
                              formData.cvc
                            }
                            onChange={(e) =>
                              updateField(
                                "cvc",
                                e.target.value
                              )
                            }
                            required
                          />

                          <span>ⓘ</span>

                        </div>

                      </div>

                    </div>


                    <label className="save-card">

                      <input
                        type="checkbox"
                        checked={
                          formData.saveCard
                        }
                        onChange={(e) =>
                          updateField(
                            "saveCard",
                            e.target.checked
                          )
                        }
                      />

                      <span>
                        Save card for faster
                        checkout next time
                      </span>

                    </label>

                  </div>
                )}


                {paymentMethod !== "card" && (
                  <div className="alternative-payment">

                    <div className="alternative-icon">
                      ✓
                    </div>

                    <h3>
                      {paymentMethod === "gcash"
                        ? "GCash Payment"
                        : paymentMethod ===
                          "maya"
                        ? "Maya Payment"
                        : paymentMethod ===
                          "bank"
                        ? "Bank Transfer"
                        : "PayPal Payment"}
                    </h3>

                    <p>
                      You will be redirected to
                      complete your payment securely.
                    </p>

                  </div>
                )}


                <button
                  type="submit"
                  className="pay-btn"
                >
                  <span>♧</span>

                  PAY {formatCurrency(total)}
                </button>


                <p className="payment-terms">
                  By clicking pay, you agree to our{" "}
                  <a href="#terms">
                    Terms & Conditions
                  </a>
                  .
                </p>

              </form>

            </div>


            <div className="payment-actions">

              <button
                className="back-btn"
                onClick={() => setStep(2)}
              >
                ← BACK TO PLAN
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default JoinFlow;