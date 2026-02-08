//Validator.ts
/* ===============================
   USERNAME
================================ */
export const validateUsername = (value: string): string | null => {
  if (!value) return "Username is required";
  if (value.length < 3) return "Username must be at least 3 characters";
  return null;
};

/* ===============================
   EMAIL
================================ */
export const validateEmail = (value: string): string | null => {
  if (!value) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }

  return null;
};

/* ===============================
   CONTACT NUMBER (10 digits only)
================================ */
export const validateContactNo = (value: string): string | null => {
  if (!value) return "Contact number is required";

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(value)) {
    return "Please enter valid phone number";
  }

  return null;
};

/* ===============================
   NUMBER (with flags)
   allowNegative → true/false
   allowZero     → true/false
================================ */
export const validateNumber = (
  value: string,
  allowNegative: boolean = true,
  allowZero: boolean = true
): string | null => {
  if (!value) return "Number is required";

  if (isNaN(Number(value))) {
    return "Only numbers are allowed";
  }

  const num = Number(value);

  if (!allowZero && num === 0) {
    return "Zero is not allowed";
  }

  if (!allowNegative && num < 0) {
    return "Negative numbers are not allowed";
  }

  return null;
};

/* ===============================
   TEXT FIELD
================================ */
export const validateText = (
  value: string,
  minLength: number = 5
): string | null => {
  if (!value) return "This field is required";
  if (value.length < minLength) {
    return `Minimum ${minLength} characters required`;
  }
  return null;
};

/* ===============================
   PASSWORD
================================ */
export const validatePassword = (value: string): string | null => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/(?=.*[A-Z])/.test(value))
    return "Password must contain one uppercase letter";
  if (!/(?=.*\d)/.test(value))
    return "Password must contain one number";
  return null;
};

/* ===============================
   CONFIRM PASSWORD
================================ */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return "Confirm password is required";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};


// //Call the function
// validateNumber("10", false, false); // quantity (no zero, no negative)
// validateNumber("0", false, true);   // percentage
// validateContactNo("+(93)61502289"); // ❌ invalid
// validateEmail("test@gmail.com");    // ✅ valid
