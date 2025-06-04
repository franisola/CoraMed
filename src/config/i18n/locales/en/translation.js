import { deleteAccount } from "@/api/auth";
import { changeLanguage } from "i18next";

const translations = {
  greeting: "Hello guys",
  farewell: "Goodbye",

  screenTitles: {
    home: "Home",
    profile: "My profile",
    myData: "My data",
    myHealthInsurance: "My health insurance",
    addHealthInsurance: "Add health insurance",
    language: "Language",
    notifications: "Notifications",
    addAppointment: "Add appointment",
    myAppointments: "My appointments",
    myPastAppointments: "Past appointments",
    myNextAppointments: "Next appointments",
    appointmentInfo: "Appointment info",
    results: "Results",
    subtitlePersonal: "Personal",
    subtitleAccount: "Account",
  },

  settings: {
    changeLanguage: "Switch to Spanish",
    darkMode: "Dark mode",
  },
  
  inputPlaceholder: {
    email: "Email",
    password: "Password",
    fullName: "Full name",
    dni: "DNI",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    birthDate: "Birth date",
    gender: "Select your gender",
    phone: "Phone",
    address: "Address",
  },

  genderPick: {
    male: "Male",
    female: "Female",
    other: "Other",
  },

  button: {
    login: "Login",
    register: "Register",
    recover: "Send email",
    changePassword: "Change password",
    logOut: "LogOut",
    deleteAccount: "Delete account",
  },

  authTitles: {
    login: "Login",
    register: "Register",
    recover: "Recover password",
    changePassword: "Change password",
    forgotPassword: "Forgot your password?",
    linkForgotPassword: "Recover it here",
  },

  authFooterText: {
    noAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    register: "Register",
  },

  errorInputEmail: "Invalid email",
  errorInputPassword: "Invalid password",
  errorInputFullName: "Invalid full name",
  errorInputDNI: "Invalid DNI",
  errorInputNewPassword: "Invalid new password",
  errorInputConfirmPassword: "Invalid confirm password",
  errorInputBirthDate: "Invalid birth date",
  errorInputGender: "Invalid gender",
  errorInputPhone: "Invalid phone",
  errorInputAddress: "Invalid address",

  errorInputRequired: "Required field",
  errorInputMinLength: "Minimum {{min}} characters",
  errorInputMaxLength: "Maximum {{max}} characters",
};

export default translations;
