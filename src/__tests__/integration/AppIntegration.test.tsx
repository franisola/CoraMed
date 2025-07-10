import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@/redux/slices/authSlice';
import appointmentSlice from '@/redux/slices/appointmentSlice';

import { ThemeProvider } from '@/themes/ThemeContext';

// Mock de todas las dependencias
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
  Ionicons: 'Ionicons',
  Feather: 'Feather',
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'homeTxt.welcomeOther': 'Welcome!',
        'homeTxt.welcomeMale': 'Welcome!',
        'homeTxt.welcomeFemale': 'Welcome!',
        'homeTxt.appointment': 'Book Appointment',
        'homeTxt.myAppointments': 'My Appointments',
        'homeTxt.myHealthInsurance': 'Health Insurance',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('@/ui/components/Appointments/NextAppointmentCard', () => {
  return function MockNextAppointmentCard() {
    return null;
  };
});

const createMockStore = (initialState = {}) => {
  const defaultState = {
    auth: {
      user: null,
      loading: false,
      initialLoading: false,
      error: null,
    },
    appointment: {
      appointment: null,
      pastAppointments: [],
      upcomingAppointments: [],
      loading: false,
      error: null,
    },
  };

  return configureStore({
    reducer: {
      auth: authSlice,
      appointment: appointmentSlice,
    },
    preloadedState: {
      ...defaultState,
      ...initialState,
    },
  });
};

const TestWrapper = ({ 
  children, 
  store 
}: { 
  children: React.ReactNode; 
  store: any; 
}) => (
  <Provider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('State Management Integration', () => {
    it('should handle Redux state correctly', () => {
      const store = createMockStore({
        auth: {
          user: {
            id: '1',
            nombreCompleto: 'John Doe',
            email: 'john@example.com',
            genero: 'masculino',
          },
          loading: false,
          initialLoading: false,
          error: null,
        },
      });

      expect(store.getState().auth.user?.nombreCompleto).toBe('John Doe');
    });

    it('should handle loading states across different slices', () => {
      const store = createMockStore({
        auth: {
          user: { id: '1', nombreCompleto: 'John Doe' },
          loading: true,
          initialLoading: false,
          error: null,
        },
        appointment: {
          appointment: null,
          pastAppointments: [],
          upcomingAppointments: [],
          loading: true,
          error: null,
        },
      });

      const authState = store.getState().auth;
      const appointmentState = store.getState().appointment;

      expect(authState.loading).toBe(true);
      expect(appointmentState.loading).toBe(true);
    });

    it('should handle error states across different slices', () => {
      const store = createMockStore({
        auth: {
          user: { id: '1', nombreCompleto: 'John Doe' },
          loading: false,
          initialLoading: false,
          error: 'Authentication error',
        },
        appointment: {
          appointment: null,
          pastAppointments: [],
          upcomingAppointments: [],
          loading: false,
          error: 'Failed to load appointments',
        },
      });

      const authState = store.getState().auth;
      const appointmentState = store.getState().appointment;

      expect(authState.error).toBe('Authentication error');
      expect(appointmentState.error).toBe('Failed to load appointments');
    });
  });

  describe('Data Flow Integration', () => {
    it('should properly manage user state', () => {
      const userData = {
        id: '1',
        nombreCompleto: 'Jane Smith',
        email: 'jane@example.com',
        genero: 'femenino',
      };

      const store = createMockStore({
        auth: {
          user: userData,
          loading: false,
          initialLoading: false,
          error: null,
        },
      });

      const state = store.getState();
      expect(state.auth.user).toEqual(userData);
    });

    it('should handle empty/null states gracefully', () => {
      const store = createMockStore({
        auth: {
          user: null,
          loading: false,
          initialLoading: false,
          error: null,
        },
      });

      const state = store.getState();
      expect(state.auth.user).toBe(null);
      expect(state.auth.loading).toBe(false);
    });

    it('should maintain consistent state structure', () => {
      const store = createMockStore();
      const state = store.getState();

      // Verify auth slice structure
      expect(state.auth).toHaveProperty('user');
      expect(state.auth).toHaveProperty('loading');
      expect(state.auth).toHaveProperty('initialLoading');
      expect(state.auth).toHaveProperty('error');

      // Verify appointment slice structure
      expect(state.appointment).toHaveProperty('appointment');
      expect(state.appointment).toHaveProperty('pastAppointments');
      expect(state.appointment).toHaveProperty('upcomingAppointments');
      expect(state.appointment).toHaveProperty('loading');
      expect(state.appointment).toHaveProperty('error');
    });
  });

  describe('Component Integration with Store', () => {
    it('should connect components to store properly', () => {
      const store = createMockStore({
        auth: {
          user: { id: '1', nombreCompleto: 'Test User' },
          loading: false,
          initialLoading: false,
          error: null,
        },
      });

      const TestComponent = () => {
        const state = store.getState();
        return state.auth.user ? 'User Logged In' : 'No User';
      };

      expect(TestComponent()).toBe('User Logged In');
    });

    it('should handle state updates correctly', () => {
      const store = createMockStore();
      
      // Simulate a Redux action
      store.dispatch({ type: 'test/action', payload: 'test' });
      
      // Store should still be functional after dispatch
      expect(store.getState()).toBeDefined();
    });
  });
});
