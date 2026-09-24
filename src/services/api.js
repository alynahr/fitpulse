const API_BASE_URL = "http://fitpulse.atwebpages.com";

// Add / Insert member to AwardSpace DB
export const addMemberToDB = async (memberData, optionalEmail) => {
  try {
    const data =
      typeof memberData === "object" && memberData !== null
        ? memberData
        : { name: memberData, email: optionalEmail };

    const payload = {
      name: String(data.name || data.fullName || ""),
      fullName: String(data.name || data.fullName || ""),
      email: String(data.email || "").trim(),
      phone: String(data.phone || ""),
      dob: String(data.dob || data.dateOfBirth || ""),
      gender: String(data.gender || ""),
      address: String(data.address || ""),
      city: String(data.city || ""),
      province: String(data.province || ""),
      postal_code: String(data.postal_code || data.postalCode || ""),
      postalCode: String(data.postal_code || data.postalCode || ""),
      country: String(data.country || ""),
    };

    const params = new URLSearchParams();
    Object.keys(payload).forEach((key) => {
      params.append(key, payload[key]);
    });

    const response = await fetch(`${API_BASE_URL}/add_member.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await response.text();
    console.log("Raw Response from AwardSpace (add_member):", text);

    try {
      return JSON.parse(text);
    } catch (_parseError) {
      return { status: "success", message: text };
    }
  } catch (error) {
    console.error("API error during member save:", error);
    return { status: "error", message: error.message };
  }
};

// Get member profile by email from AwardSpace DB
export const getMemberFromDB = async (email) => {
  try {
    if (!email) return null;
    const cleanEmail = String(email).trim();
    const response = await fetch(
      `${API_BASE_URL}/get_member.php?email=${encodeURIComponent(cleanEmail)}`
    );
    const text = await response.text();
    console.log("Raw Response from AwardSpace (get_member):", text);

    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        return data.length > 0 ? data[0] : null;
      }
      if (data && data.member) {
        return data.member;
      }
      if (data && data.data) {
        return Array.isArray(data.data) ? data.data[0] : data.data;
      }
      return data;
    } catch (_parseError) {
      console.warn("Could not parse JSON from get_member.php:", text);
      return null;
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};

// Function to update member information in AwardSpace DB
export const updateMemberInDB = async (memberData) => {
  try {
    const payload = {
      name: String(memberData.name || memberData.fullName || ""),
      fullName: String(memberData.name || memberData.fullName || ""),
      email: String(memberData.email || "").trim(),
      phone: String(memberData.phone || ""),
      dob: String(memberData.dob || memberData.dateOfBirth || ""),
      gender: String(memberData.gender || ""),
      address: String(memberData.address || ""),
      city: String(memberData.city || ""),
      province: String(memberData.province || ""),
      postal_code: String(memberData.postal_code || memberData.postalCode || ""),
      postalCode: String(memberData.postal_code || memberData.postalCode || ""),
      country: String(memberData.country || ""),
    };

    const params = new URLSearchParams();
    Object.keys(payload).forEach((key) => {
      params.append(key, payload[key]);
    });

    const response = await fetch(`${API_BASE_URL}/update_member.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await response.text();
    console.log("Raw Response from AwardSpace (update_member):", text);

    try {
      return JSON.parse(text);
    } catch (_parseError) {
      return { status: "success", message: text };
    }
  } catch (error) {
    console.error("Error updating member:", error);
    return { error: true, message: error.message };
  }
};