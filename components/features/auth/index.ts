export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface SignUpFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateLogin = (form: LoginForm): LoginFormErrors => {
  const errors: LoginFormErrors = {};
  if (!form.email.trim()) errors.email = "Email is required";
  if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.password) errors.password = "Password is required";
  if (form.password && form.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  return errors;
};

export const validateSignUp = (form: SignUpForm): SignUpFormErrors => {
  const errors: SignUpFormErrors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  if (!form.password) errors.password = "Password is required";
  if (form.password.length < 6) errors.password = "At least 6 characters";
  if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};