import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@themes/ThemeContext";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      testID="custom-button"
      style={[
        styles.button,
        {
          backgroundColor: isDisabled
            ? theme.colors.unauthorizedButton
            : theme.colors.button,
        },
        style,
      ]}
      onPress={isDisabled ? undefined : onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.white} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color: theme.colors.white,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 58,
    width: 308,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;