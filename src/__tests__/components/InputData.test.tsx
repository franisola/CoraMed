import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputData from '@/ui/components/Inputs/InputData';
import { ThemeProvider } from '@/themes/ThemeContext';

// Mock de los iconos
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
}));

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

describe('InputData Component', () => {
  it('should render input with label', () => {
    const { getByText, getByDisplayValue } = render(
      <ThemeWrapper>
        <InputData
          label={true}
          labelText="Test Label"
          value="test value"
          testID="input-data"
        />
      </ThemeWrapper>
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('should render input without label', () => {
    const { queryByText, getByTestId } = render(
      <ThemeWrapper>
        <InputData
          label={false}
          placeholder="Enter text"
          testID="input-data"
        />
      </ThemeWrapper>
    );

    expect(queryByText('Test Label')).toBeNull();
    expect(getByTestId('input-data')).toBeTruthy();
  });

  it('should display error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(
      <ThemeWrapper>
        <InputData
          error={errorMessage}
          testID="input-data"
        />
      </ThemeWrapper>
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should handle password field visibility toggle', () => {
    const { getByTestId } = render(
      <ThemeWrapper>
        <InputData
          secureTextEntry={true}
          testID="input-data"
        />
      </ThemeWrapper>
    );

    const input = getByTestId('input-data');
    
    // Verificar que el campo de contraseña está presente
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should call onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <ThemeWrapper>
        <InputData
          onChangeText={mockOnChangeText}
          testID="input-data"
        />
      </ThemeWrapper>
    );

    const input = getByTestId('input-data');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('should apply placeholder correctly', () => {
    const placeholder = 'Enter your email';
    const { getByPlaceholderText } = render(
      <ThemeWrapper>
        <InputData
          placeholder={placeholder}
          testID="input-data"
        />
      </ThemeWrapper>
    );

    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('should render correctly with all props', () => {
    const { getByText, getByDisplayValue } = render(
      <ThemeWrapper>
        <InputData
          label={true}
          labelText="Email Address"
          value="test@example.com"
          placeholder="Enter email"
          error="Invalid email format"
          testID="input-data"
        />
      </ThemeWrapper>
    );

    expect(getByText('Email Address')).toBeTruthy();
    expect(getByDisplayValue('test@example.com')).toBeTruthy();
    expect(getByText('Invalid email format')).toBeTruthy();
  });
});
