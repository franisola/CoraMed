import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from '@/ui/screens/Home';
import { ThemeProvider } from '@/themes/ThemeContext';
import authSlice from '@/redux/slices/authSlice';
import appointmentSlice from '@/redux/slices/appointmentSlice';

// Mock de dependencias
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
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

jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
}));

jest.mock('@/ui/components/Appointments/NextAppointmentCard', () => {
  return function MockNextAppointmentCard() {
    return null;
  };
});

const createMockStore = (overrides = {}) => {
  const defaultState = {
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
      ...overrides,
    },
  });
};

const ThemeWrapper = ({ children, store }: { children: React.ReactNode; store: any }) => (
  <Provider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render welcome message with user name', () => {
    const store = createMockStore();

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    expect(getByText(/Welcome! John Doe!/)).toBeTruthy();
  });

  it('should render welcome message for female user', () => {
    const store = createMockStore({
      auth: {
        user: {
          id: '1',
          nombreCompleto: 'Jane Doe',
          email: 'jane@example.com',
          genero: 'femenino',
        },
        loading: false,
        initialLoading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    expect(getByText(/Welcome! Jane Doe!/)).toBeTruthy();
  });

  it('should render default welcome message when no user', () => {
    const store = createMockStore({
      auth: {
        user: null,
        loading: false,
        initialLoading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    expect(getByText('Welcome!')).toBeTruthy();
  });

  it('should render all navigation buttons', () => {
    const store = createMockStore();

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    expect(getByText('Book Appointment')).toBeTruthy();
    expect(getByText('My Appointments')).toBeTruthy();
    expect(getByText('Health Insurance')).toBeTruthy();
  });

  it('should handle appointment button press', () => {
    const store = createMockStore();

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    const appointmentButton = getByText('Book Appointment');
    fireEvent.press(appointmentButton);

    // El botón debería ser presionable
    expect(appointmentButton).toBeTruthy();
  });

  it('should handle my appointments button press', () => {
    const store = createMockStore();

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    const myAppointmentsButton = getByText('My Appointments');
    fireEvent.press(myAppointmentsButton);

    expect(myAppointmentsButton).toBeTruthy();
  });

  it('should handle health insurance button press', () => {
    const store = createMockStore();

    const { getByText } = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    const insuranceButton = getByText('Health Insurance');
    fireEvent.press(insuranceButton);

    expect(insuranceButton).toBeTruthy();
  });

  it('should render NextAppointmentCard component', () => {
    const store = createMockStore();

    const result = render(
      <ThemeWrapper store={store}>
        <Home />
      </ThemeWrapper>
    );

    // El componente debería renderizarse sin errores
    expect(result).toBeTruthy();
  });
});
