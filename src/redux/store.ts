import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appointmentReducer from './slices/appointmentSlice';
import professionalReducer from './slices/professionalSlice';
import healthInsuranceReducer from "@slices/healthInsuranceSlice";
import userReducer from "@slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    professionals: professionalReducer,
    healthInsurance: healthInsuranceReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
