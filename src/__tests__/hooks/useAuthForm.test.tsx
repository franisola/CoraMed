import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAuthForm } from '@/ui/components/Auth/Forms/useAuthForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

// Mock completo del authSlice
const mockLoginUser = jest.fn().mockReturnValue({
  unwrap: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
});

const mockRegisterUser = jest.fn().mockReturnValue({
  unwrap: jest.fn().mockResolvedValue({ email: 'juan@example.com' }),
});

jest.mock('@/redux/slices/authSlice', () => ({
  __esModule: true,
  default: (state = { user: null, loading: false, error: null }, action: any) => state,
  loginUser: mockLoginUser,
  registerUser: mockRegisterUser,
  recoverPassword: jest.fn().mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({}),
  }),
  resetPassword: jest.fn().mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({}),
  }),
  verifyCode: jest.fn().mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({ message: 'Código verificado' }),
  }),
}));

// Mock de dependencias
jest.mock('react-native-toast-notifications', () => ({
  useToast: () => ({
    show: jest.fn(),
  }),
}));

const createMockStore = () => {
  const authReducer = jest.fn((state = { user: null, loading: false, error: null }, action) => state);
  
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        loading: false,
        initialLoading: false,
        error: null,
      },
    },
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={createMockStore()}>
    {children}
  </Provider>
);

describe('useAuthForm Hook', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Form', () => {
    it('should initialize with empty values', () => {
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit),
        { wrapper }
      );

      expect(result.current.values.email).toBe('');
      expect(result.current.values.password).toBe('');
    });

    it('should update field values', () => {
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleChange('email', 'test@example.com');
      });

      expect(result.current.values.email).toBe('test@example.com');
    });

    it('should validate required fields on submit', () => {
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleSubmit();
      });

      // Should have validation errors for empty required fields
      expect(result.current.errors.email).toBeDefined();
      expect(result.current.errors.password).toBeDefined();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should handle submit method', () => {
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit),
        { wrapper }
      );

      expect(typeof result.current.handleSubmit).toBe('function');
    });
  });

  describe('Register Form', () => {
    it('should require all registration fields', () => {
      const { result } = renderHook(
        () => useAuthForm('register', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.nombreCompleto).toBeDefined();
      expect(result.current.errors.dni).toBeDefined();
      expect(result.current.errors.email).toBeDefined();
      expect(result.current.errors.password).toBeDefined();
      expect(result.current.errors.genero).toBeDefined();
    });

    it('should handle register submit method', () => {
      const { result } = renderHook(
        () => useAuthForm('register', mockOnSubmit),
        { wrapper }
      );

      expect(typeof result.current.handleSubmit).toBe('function');
    });
  });

  describe('Recover Password Form', () => {
    it('should require email field', () => {
      const { result } = renderHook(
        () => useAuthForm('recover', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.email).toBeDefined();
    });

    it('should validate email format', () => {
      const { result } = renderHook(
        () => useAuthForm('recover', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleChange('email', 'invalid-email');
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.email).toContain('válido');
    });
  });

  describe('Code Verification Form', () => {
    it('should require code field', () => {
      const { result } = renderHook(
        () => useAuthForm('codeVerification', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.code).toBeDefined();
    });

    it('should validate code format', () => {
      const { result } = renderHook(
        () => useAuthForm('codeVerification', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleChange('code', '123'); // Too short
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.code).toBeDefined();
    });
  });

  describe('Change Password Form', () => {
    it('should require password fields', () => {
      const { result } = renderHook(
        () => useAuthForm('changePassword', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.password).toBeDefined();
      expect(result.current.errors.confirmPassword).toBeDefined();
    });

    it('should validate password strength', () => {
      const { result } = renderHook(
        () => useAuthForm('changePassword', mockOnSubmit),
        { wrapper }
      );

      act(() => {
        result.current.handleChange('password', '123'); // Too short
        result.current.handleChange('confirmPassword', '123');
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.password).toContain('6');
    });
  });

  describe('Error Handling', () => {
    it('should display general error when provided', () => {
      const generalError = 'Server error occurred';
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit, generalError),
        { wrapper }
      );

      expect(result.current.errors.general).toBe(generalError);
    });

    it('should clear errors on field change', () => {
      const { result } = renderHook(
        () => useAuthForm('login', mockOnSubmit),
        { wrapper }
      );

      // First trigger validation errors
      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.errors.email).toBeDefined();

      // Then change field value
      act(() => {
        result.current.handleChange('email', 'test@example.com');
      });

      expect(result.current.errors.email).toBe('');
    });
  });
});
