import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@themes/ThemeContext";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean; // opcional, si se quiere mostrar un estado de carga
  style?: StyleProp<ViewStyle>; // estilos para el botón (TouchableOpacity)
  textStyle?: StyleProp<TextStyle>; // estilos para el texto
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  loading,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled
          ? theme.colors.unauthorizedButton
          : theme.colors.button,
        },
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text
        style={[styles.buttonText, { color: theme.colors.white }, textStyle]}
      >
        {loading ? "Cargando..." : title}
      </Text>
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
