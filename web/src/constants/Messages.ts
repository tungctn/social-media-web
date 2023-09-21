export const FORM: any = {
  username: {
    required: "Please enter username!",
    pattern:
      'Username contains at least 8 characters, maximum 27 characters, alphanumeric characters and "_" character.',
  },
  password: {
    required: "Please enter password!",
    pattern:
      "Please enter minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
  },
  email: {
    required: "Please enter email!",
    pattern: "Please enter the correct email format!",
  },
  repassword: {
    required: "Please enter password again!",
    incorrect: "Confirmed password is incorrect!",
  },
};
