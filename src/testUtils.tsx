import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Import all slices
import authSlice from '@slices/authSlice';
import userSlice from '@slices/userSlice';
import appointmentSlice from '@slices/appointmentSlice';
import healthInsuranceSlice from '@slices/healthInsuranceSlice';
import notificationSlice from '@slices/notificationSlice';
import professionalSlice from '@slices/professionalSlice';

// Mock theme provider
const MockThemeProvider = ({ children }: { readonly children: React.ReactNode }) => {
  return <>{children}</>;
};

export function createTestStore(initialState = {}) {
  return configureStore({
    reducer: {
      auth: authSlice,
      user: userSlice,
      appointment: appointmentSlice,
      healthInsurance: healthInsuranceSlice,
      notification: notificationSlice,
      professional: professionalSlice,
    },
    preloadedState: initialState,
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialState = {},
    store = createTestStore(initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { readonly children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MockThemeProvider>
          {children}
        </MockThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Helper para mock de usuarios
export const mockUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  firstName: 'Test',
  lastName: 'User',
  phone: '+1234567890',
  birthDate: '1990-01-01',
};

// Helper para mock de citas
export const mockAppointment = {
  id: 1,
  patientId: 1,
  professionalId: 1,
  date: '2025-07-15',
  time: '10:00',
  status: 'scheduled',
  notes: 'Test appointment',
};

// Helper para mock de profesionales
export const mockProfessional = {
  id: 1,
  name: 'Dr. Test',
  specialty: 'Cardiology',
  email: 'doctor@example.com',
  phone: '+1234567890',
};

// Helper para mock de obras sociales
export const mockHealthInsurance = {
  id: 1,
  name: 'Test Insurance',
  code: 'TEST001',
  isActive: true,
};

// Helper para crear estados iniciales de prueba
export const createMockState = {
  auth: (overrides = {}) => ({
    user: null,
    loading: false,
    initialLoading: false,
    error: null,
    ...overrides,
  }),
  
  user: (overrides = {}) => ({
    profile: null,
    loading: false,
    error: null,
    ...overrides,
  }),
  
  appointment: (overrides = {}) => ({
    appointments: [],
    nextAppointment: null,
    loading: false,
    error: null,
    ...overrides,
  }),
  
  healthInsurance: (overrides = {}) => ({
    insurances: [],
    selectedInsurance: null,
    loading: false,
    error: null,
    ...overrides,
  }),
  
  notification: (overrides = {}) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    ...overrides,
  }),
  
  professional: (overrides = {}) => ({
    professionals: [],
    selectedProfessional: null,
    loading: false,
    error: null,
    ...overrides,
  }),
};

// Re-export testing utilities
export * from '@testing-library/react-native';
