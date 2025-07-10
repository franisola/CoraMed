import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ActivityIndicator } from "react-native";
import CustomButton from "@components/Buttons/NormalButton";

// Mock del tema
jest.mock("@themes/ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        button: "#007AFF",
        unauthorizedButton: "#CCCCCC",
        white: "#FFFFFF",
        text: "#000000",
      },
    },
  }),
}));

describe("CustomButton", () => {
  const defaultProps = {
    title: "Test Button",
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with title", () => {
    const { getByText } = render(<CustomButton {...defaultProps} />);

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CustomButton {...defaultProps} onPress={mockOnPress} />
    );

    fireEvent.press(getByText("Test Button"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton {...defaultProps} onPress={mockOnPress} disabled={true} />
    );

    const button = getByTestId("custom-button");
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("should show loading indicator when loading is true", () => {
    const { queryByText, UNSAFE_getByType } = render(
      <CustomButton {...defaultProps} loading={true} />
    );

    // Cuando está loading, el texto no debe estar visible
    expect(queryByText("Test Button")).toBeNull();

    // Debe mostrar el ActivityIndicator
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("should not call onPress when loading", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton {...defaultProps} onPress={mockOnPress} loading={true} />
    );

    const button = getByTestId("custom-button");
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("should apply custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    const customTextStyle = { fontSize: 20 };

    const { getByText } = render(
      <CustomButton
        {...defaultProps}
        style={customStyle}
        textStyle={customTextStyle}
      />
    );

    const buttonText = getByText("Test Button");
    expect(buttonText).toBeTruthy();
  });
});
