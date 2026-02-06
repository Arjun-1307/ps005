export function validateForm(email, password) {
  const errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}
