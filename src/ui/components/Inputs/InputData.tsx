import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  label?: boolean;
  labelText?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  labelText,
  error,
  secureTextEntry,
  ...props
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = typeof secureTextEntry !== "undefined";

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {label && labelText && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontSize: 20,
              fontWeight: "bold",
            },
          ]}
        >
          {labelText}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: error ? theme.colors.error : theme.colors.inputBorder,
            backgroundColor: theme.colors.white,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
          ]}
          placeholderTextColor={theme.colors.inputBorder}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={22}
              color={theme.colors.icons}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

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
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 58,
    width: 308,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomInput;
