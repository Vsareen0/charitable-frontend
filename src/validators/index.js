const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const htmlRegex = new RegExp(/<[^>]*>/g);

export const nameValidator = (value) =>
  value !== "" ? "" : "Please enter a name";

export const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

export const passwordValidator = (value) =>
  passwordRegex.test(value)
    ? ""
    : "Password should be 8 characters long and contains one numeric value and special character.";

export const requiredValidator = (value) =>
  value ? "" : "This field is required";
export const phoneValidator = (value) =>
  value && phoneRegex.test(value) ? "" : "Please enter valid phone number.";
export const biographyValidator = (value) =>
  value && value.replace(htmlRegex, "").length >= 50
    ? ""
    : "Biography must be at least 50 characters long.";
