import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";
import { useTheme } from "../../../themes/ThemeContext";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.error : theme.colors.primary,
            backgroundColor: theme.colors.white,
            color: theme.colors.primary,
          },
        ]}
        placeholderTextColor={theme.colors.primary}
        {...props}
      />
      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 8,
    padding: 0,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    height: 58,
    width: 308,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 18,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomInput;
