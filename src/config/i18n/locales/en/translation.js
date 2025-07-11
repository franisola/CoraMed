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
    noAppointmentsScheduled: "You have no appointments scheduled.",
   
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
    verificationCode: "Verification code",
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
    verifyCode: "Verify",
  },

  authTitles: {
    login: "Login",
    register: "Register",
    recover: "Recover password",
    changePassword: "Change password",
    forgotPassword: "Forgot your password?",
    linkForgotPassword: "Recover it here",
    codeVerification: "Verify code",
  },

  settings: {
    data: "My Data",
    myHealthInsurance: "My Health Insurance",
    language: "Language",
    darkMode: "Dark Mode",
    register: "Register",
    logOut: "Log Out",
    deleteAccount: "Delete account",
  },

  notificationsTxt: {
    noNotifications: "You have no notifications",
    noNextAppointmentCard: "No upcoming appointments.",
    deleteNotification: "Delete notification",
    deleteSure: "Are you sure about deleting this notification?"
  },

  homeTxt: {
    appointment: "Schedule appointment",
    myAppointments: "My appointments",
    myHealthInsurance: "My health insurance",
    welcomeMale: "Welcome",
    welcomeFemale: "Welcome",
    welcomeOther: "Welcome",
  },

  book: {
    selectSpecialty: "Select a specialty",
    selectDoctor: "Select a doctor",
    byName: "Search by name",
    selectDate: "Select date:",
    selectDateTime: "Select date and time",
    selectTime: "Select time:",
    errorAppointment: "An error occurred while creating the appointment.",
  },

  appointmentCardTxt: {
    professional: "Professional:",
    specialty: "Specialty:",
    date: "Date:",
    time: "Time:",
    reason: "Reason for visit:",
    placeholderText: "Write the reason for your visit...                              (min. 10 characters)",
    confirmButton: "Confirm appointment",
    cancelButton: "Cancel appointment",
    cancel: "Canceled",
    areYouSure: "Are you sure?",
    keepAppointment: "Keep appointment",
    cancelAppointmentQuestion: "Do you want to cancel your appointment?",
    status: "Status:",
    characters: "Characters"
  },

  authFooterText: {
    noAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    register: "Register",

  },

  insuranceTxt: {
    noInsurance: "You don’t have a health insurance associated.",
    addInsurance: "Add health insurance",
    deleteInsurance: "Delete health insurance",
    insuranceName: "Health Insurance Name",
    memberId: "Member ID",
    plan: "Plan",
    memberIdLabel: "Member ID"

  },

  menuTxt: {
    acc: "Account",
    myProfile: "My profile",
    myData: "My data",
    myHealthInsurance: "My health insurance",
    appointments: "Appointments",
    myAppointments: "My appointments",
    newAppointment: "New appointment",
    preferences: "Preferences",
    language: "Language",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    logOut: "Log out",
    sureLogOut: "Are you sure you want to log out?",
    myNotifications: "My notifications",
    deleteAccountTitle: "Delete Account",
    deleteAccountMessage: "This action will delete your account and all your personal data.\nAre you sure you want to proceed?",
  },

  myDataTxt: {
    fullName: "Full name",
    birthDate: "Birth date",
    gender: "Gender",
    phone: "Phone",
    address: "Address",
    noBirdthDate: "Birth date not provided",
    noGender: "Gender not provided",
    noPhone: "Phone number not provided",
    noAddress: "Address not provided",
    password: "Password",
    editProfile: "Edit profile",
  },

  editAccTxt: {
    editData: "Confirm",
    selectGender: "Select your gender",
    selectBirthDate: "Select your birth date",
    saving: "Saving...",
    cancel: "Cancel",
  },

  notificationsEdit: {
    deleteNotification: "Delete notification",
    deleteSure: "Are you sure you want to delete this notification?",
    confirmUpdate: "Confirm update",
    updatePasswordQuestion: "Do you want to update your password?",
    passwordUpdatedSuccess: "Password updated successfully",
    passwordUpdateError: "There was an error updating the password",
    saveChangesQuestion: "Do you want to save changes to your personal data?",
  },

  loading: "Loading..",

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

  errorCancel: "Could not cancel the appointment. Please try again.",
  cancelledTitle: "Appointment canceled",
  cancelledMessage: "The appointment has been successfully canceled.",
};

export default translations;
