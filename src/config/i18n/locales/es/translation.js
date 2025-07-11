import NextAppointmentCard from "@/ui/components/Appointments/NextAppointmentCard";
import { t } from "i18next";
import { identity } from "lodash";

const translations = {
  greeting: "Hola muchacho",
  farewell: "Adiós",

  screenTitles: {
    home: "Inicio",
    profile: "Mi perfil",
    myData: "Mis datos",
    myHealthInsurance: "Mi obra social",
    addHealthInsurance: "Agregar obra social",
    language: "Idioma",
    notifications: "Notificaciones",
    addAppointment: "Pedir turno",
    myAppointments: "Mis turnos",
    myPastAppointments: "Pasados",
    myNextAppointments: "Próximos",
    appointmentInfo: "Información del turno",
    results: "Resultados",
    subtitlePersonal: "Personal",
    subtitleAccount: "Cuenta",
    noAppointmentsScheduled: "No tienes turnos programados.",

  },




  inputPlaceholder: {
    email: "Email",
    password: "Contraseña",
    fullName: "Nombre completo",
    dni: "DNI",
    newPassword: "Nueva contraseña",
    confirmPassword: "Confirmar contraseña",
    birthDate: "Fecha de nacimiento",
    gender: "Selecciona tu género",
    phone: "Teléfono",
    address: "Dirección",
    verificationCode: "Código de verificación",
  },

  genderPick: {
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
  },

  button: {
    login: "Iniciar sesión",
    register: "Registrarse",
    recover: "Enviar email",
    changePassword: "Cambiar contraseña",
    verifyCode: "Verificar",
  },

  authTitles: {
    login: "Iniciar sesión",
    register: "Registro",
    recover: "Recuperar contraseña",
    changePassword: "Cambiar contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    linkForgotPassword: "Recuperala aquí",
    codeVerification: "Verificar código",
  },

  settings: {
    data: "Mis Datos",
    myHealthInsurance: "Mi Obra Social",
    language: "Idioma",
    darkMode: "Modo Oscuro",
    logOut: "Cerrar Sesión",
    deleteAccount: "Borrar Cuenta",
  },

  notificationsTxt: {
    noNotifications: "No tienes notificaciones",
    noNextAppointmentCard: "No hay turnos próximos.",
  },

  homeTxt: {
    appointment: "Solicitar turno",
    myAppointments: "Mis turnos",
    myHealthInsurance: "Mi obra social",
    welcomeMale: "Bienvenido",
    welcomeFemale: "Bienvenida",
    welcomeOther: "Bienvenide",
  },

  book: {
    selectSpecialty: "Elija una especialidad",
    selectDoctor: "Elija un doctor",
    byName: "Buscar por nombre",
    selectDate: "Seleccionar fecha:",
    selectDateTime: "Seleccionar fecha y hora",
    selectTime: "Seleccionar horario:",
  },

  appointmentCardTxt: {
    professional: "Profesional:",
    specialty: "Especialidad:",
    date: "Fecha:",
    time: "Hora:",
    reason: "Motivo de la consulta:",
    placeholderText: "Escriba aquí el motivo de su consulta...        (min. 10 caracteres)",
    confirmButton: "Confirmar turno",
    cancelButton: "Cancelar turno",
    cancel: "Cancelado",
    areYouSure: "¿Está seguro?",
    status: "Estado:",
    keepAppointment: "Mantener turno",
    cancelAppointmentQuestion: "¿Desea cancelar su turno?",
    characters: "Caracteres",
    errorAppointment: "Ocurrió un error al crear el turno.",

  },


  authFooterText: {
    noAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    login: "Inicia sesión",
    register: "Registrate",
  },

  insuranceTxt: {
    noInsurance: "No tienes una obra social vinculada.",
    addInsurance: "Agregar obra social",
    deleteInsurance: "Eliminar obra social",
    insuranceName: "Nombre de la Obra Social",
    memberId: "Número de socio",
    plan: "Plan",
    memberIdLabel: "Nro. Socio"
  },

  menuTxt: {
    acc: "Cuenta",
    myProfile: "Mi perfil",
    myData: "Mis datos",
    myHealthInsurance: "Mi obra social",
    appointments: "Turnos",
    myAppointments: "Mis turnos",
    newAppointment: "Nuevo turno",
    preferences: "Preferencias",
    language: "Idioma",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    notifications: "Notificaciones",
    logOut: "Cerrar sesión",
    sureLogOut: "¿Está seguro que desea cerrar sesión?",
    myNotifications: "Mis notificaciones",
    deleteAccountTitle: "Borrar Cuenta",
    deleteAccountMessage: "Esta acción eliminará su cuenta y todos sus datos personales.\n¿Está seguro de que desea continuar?",
  },


  myDataTxt: {
    fullName: "Nombre completo",
    birthDate: "Fecha de nacimiento",
    gender: "Género",
    phone: "Teléfono",
    address: "Dirección",
    noBirdthDate: "Sin fecha de nacimiento",
    noGender: "Sin género",
    noPhone: "Sin teléfono",
    noAddress: "Sin dirección",
    password: "Contraseña",
    editProfile: "Editar perfil",
  },

  editAccTxt: {
    editData: "Confirmar",
    selectGender: "Selecciona tu género",
    selectBirthDate: "Selecciona tu fecha de nacimiento",
    saving: "Guardando...",
    cancel: "Cancelar",
  },

  notificationsEdit: {
    deleteNotification: "Eliminar notificación",
    deleteSure: "¿Está seguro de que desea eliminar esta notificación?",
    confirmUpdate: "Confirmar actualización",
    updatePasswordQuestion:  "¿Querés actualizar tu contraseña?",
    passwordUpdatedSuccess: "Contraseña actualizada con éxito",
    passwordUpdateError: "Ocurrió un error al actualizar la contraseña",
    saveChangesQuestion: "Do you want to save changes to your personal data?",
  },


  loading: "Loading..",

  errorInputEmail: "Email inválido",
  errorInputPassword: "Contraseña inválida",
  errorInputFullName: "Nombre completo inválido",
  errorInputDNI: "DNI inválido",
  errorInputNewPassword: "Nueva contraseña inválida",
  errorInputConfirmPassword: "Confirmación de contraseña inválida",
  errorInputBirthDate: "Fecha de nacimiento inválida",
  errorInputGender: "Género inválido",
  errorInputPhone: "Teléfono inválido",
  errorInputAddress: "Dirección inválida",

  errorFullNameRequired: "El nombre completo es obligatorio.",
  errorDNIRequired: "El DNI es obligatorio.",
  errorEmailInvalid: "El correo electrónico no es válido.",
  errorPasswordTooShort: "La contraseña debe tener al menos 6 caracteres.",
  errorPasswordsDoNotMatch: "Las contraseñas no coinciden.",
  errorPasswordRequired: "La contraseña es obligatoria.",
  errorFixFields: "Por favor, corrige los campos marcados.",

  errorInputRequired: "Campo requerido",
  errorInputMinLength: "Mínimo {{min}} caracteres",
  errorInputMaxLength: "Máximo {{max}} caracteres",

  errorCancel: "No se pudo cancelar el turno. Intente nuevamente.",
  cancelledTitle: "Turno cancelado",
  cancelledMessage: "El turno fue cancelado correctamente.",

};

export default translations;
