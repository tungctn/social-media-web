export const FORM: any = {
  first_name: {
    required: "Please enter first name!",
  },
  last_name: {
    required: "Please enter first name!",
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
