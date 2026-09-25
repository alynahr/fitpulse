// Talks to the PHP backend in public/api/ (hosted on AwardSpace).
// During development, Vite forwards /api requests to your local PHP server
// (see vite.config.js), so the same code works in both places.

async function request(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(`/api/${path}`, {
      method,
      credentials: "same-origin",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Can't reach the server. Is the PHP backend running?");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // PHP printed something that isn't JSON (usually a PHP error)
  }

  if (!res.ok) {
    throw new Error(data?.error || `Server error (${res.status}). Check the PHP error log.`);
  }
  return data;
}

/* ---------- auth ---------- */
export const getCurrentUser = async () => (await request("me.php")).user;

export const register = async (form) =>
  (await request("register.php", { method: "POST", body: form })).user;

export const login = async (email, password) =>
  (await request("login.php", { method: "POST", body: { email, password } })).user;

export const logout = () => request("logout.php", { method: "POST" });

// next = "plan" (from the Join form) or "login" (from the Login modal)
export const continueWithGoogle = (next = "login") => {
  window.location.href = `/api/google-start.php?next=${next}`;
};

export const updateProfile = async (fields) =>
  (await request("profile.php", { method: "POST", body: fields })).user;

/* ---------- plans, payments ---------- */
export const getPlans = async () => (await request("plans.php")).plans;

// Sends the member to the plan's Stripe Payment Link.
export const startCheckout = async (planId) => {
  const { url } = await request("create-checkout-session.php", {
    method: "POST",
    body: { planId },
  });
  window.location.href = url;
};

// After returning from Stripe, the webhook usually lands within a few
// seconds. Check the membership a few times before giving up.
export const waitForActiveMembership = async (tries = 6, delayMs = 2000) => {
  for (let i = 0; i < tries; i++) {
    const { membership } = await request("checkout-status.php");
    if (membership?.status === "active") return membership;
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return null;
};

export const getMyBilling = () => request("my-billing.php"); // { membership, payments }

/* ---------- classes & bookings ---------- */
export const getClasses = async (from, to) =>
  (await request(`classes.php?from=${from}&to=${to}`)).classes;

export const getMyBookings = async () => (await request("bookings.php")).bookings;

export const bookClass = (classId) =>
  request("bookings.php", { method: "POST", body: { classId } });

export const cancelBooking = (bookingId) =>
  request("bookings.php", { method: "POST", body: { bookingId, action: "cancel" } });

/* ---------- staff ---------- */
export const getAllMembers = async () => (await request("admin-members.php")).members;

export const getCheckIns = async () => (await request("check-in.php")).checkIns;

export const checkInByMemberCode = (memberCode, location = "Main Gym") =>
  request("check-in.php", { method: "POST", body: { memberCode, location } });

export const addClass = (cls) => request("classes.php", { method: "POST", body: cls });
