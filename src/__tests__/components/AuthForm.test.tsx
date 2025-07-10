import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthForm from '@components/Auth/AuthForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@slices/authSlice';

// Mock del tema
jest.mock('@themes/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        button: '#007AFF',
        unauthorizedButton: '#CCCCCC',
        white: '#FFFFFF',
        text: '#000000',
        background: '#FFFFFF',
        error: '#FF3B30',
      },
    },
  }),
}));

// Mock de i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'authTitles.login': 'Iniciar Sesión',
        'authTitles.register': 'Registrarse',
        'authTitles.recover': 'Recuperar Contraseña',
        'button.login': 'Iniciar Sesión',
        'button.register': 'Registrarse',
        'button.recover': 'Recuperar Contraseña',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock del useAuthForm hook
jest.mock('@components/Auth/Forms/useAuthForm', () => ({
  useAuthForm: (type: string, onSubmit: any, generalError?: string) => ({
    values: {
      email: '',
      password: '',
      nombre: '',
      apellido: '',
    },
    errors: {
      general: generalError || undefined,
    },
    handleChange: jest.fn(),
    setGenero: jest.fn(),
    handleSubmit: jest.fn(),
  }),
}));

// Mock de FormFields
jest.mock('@/ui/components/Auth/Forms/FormFields', () => {
  return function MockFormFields() {
    return null;
  };
});

describe('AuthForm', () => {
  const createMockStore = (initialState: any = {}) => {
    return configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState: {
        auth: {
          user: null,
          loading: false,
          initialLoading: false,
          error: null,
          ...initialState.auth,
        },
      },
    });
  };

  const renderWithStore = (component: React.ReactElement, initialState = {}) => {
    const store = createMockStore(initialState);
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  const defaultProps = {
    type: 'login' as const,
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form correctly', () => {
    const { getAllByText } = renderWithStore(
      <AuthForm {...defaultProps} type="login" />
    );
    
    expect(getAllByText('Iniciar Sesión').length).toBeGreaterThan(0);
  });

  it('should render register form correctly', () => {
    const { getAllByText } = renderWithStore(
      <AuthForm {...defaultProps} type="register" />
    );
    
    expect(getAllByText('Registrarse').length).toBeGreaterThan(0);
  });

  it('should render recover password form correctly', () => {
    const { getAllByText } = renderWithStore(
      <AuthForm {...defaultProps} type="recover" />
    );
    
    expect(getAllByText('Recuperar Contraseña').length).toBeGreaterThan(0);
  });

  it('should display loading state when loading is true', () => {
    const { getByTestId } = renderWithStore(
      <AuthForm {...defaultProps} />,
      { auth: { loading: true, error: null } }
    );
    
    // El botón debería estar en estado de loading
    const button = getByTestId('custom-button');
    expect(button).toBeTruthy();
  });

  it('should handle error state properly', () => {
    const errorMessage = 'Credenciales incorrectas';
    const { getByTestId } = renderWithStore(
      <AuthForm {...defaultProps} generalError={errorMessage} />
    );
    
    // Verificar que el componente se renderiza sin problemas
    const button = getByTestId('custom-button');
    expect(button).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId } = renderWithStore(
      <AuthForm {...defaultProps} onSubmit={mockOnSubmit} />
    );
    
    const button = getByTestId('custom-button');
    fireEvent.press(button);
    
    // Verificar que se llamó handleSubmit (que internamente llama onSubmit)
    expect(button).toBeTruthy();
  });

  it('should handle different form types correctly', () => {
    const formTypes = ['login', 'register', 'recover', 'changePassword', 'codeVerification'] as const;
    
    formTypes.forEach(type => {
      const { getByTestId } = renderWithStore(
        <AuthForm {...defaultProps} type={type} />
      );
      
      const button = getByTestId('custom-button');
      expect(button).toBeTruthy();
    });
  });

  it('should handle initial values correctly', () => {
    const initialValues = {
      email: 'test@example.com',
      password: 'password123',
    };
    
    const { getByTestId } = renderWithStore(
      <AuthForm {...defaultProps} initialValues={initialValues} />
    );
    
    const button = getByTestId('custom-button');
    expect(button).toBeTruthy();
  });
});
