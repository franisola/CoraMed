// @components/Inputs/FechaNacimientoInput.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "@themes/ThemeContext";

interface Props {
  value: Date | null; // <-- permito null
  onChange: (date: Date) => void;
  error?: string;
}

const FechaNacimientoInput: React.FC<Props> = ({ value, onChange, error }) => {
  const { theme } = useTheme();
  const [isPickerVisible, setPickerVisible] = useState(false);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    hidePicker();
    onChange(date);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text
        style={{
          marginBottom: 4,
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.text,
        }}
      >
        Fecha de nacimiento
      </Text>

      <TouchableOpacity
        onPress={showPicker}
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.error : theme.colors.inputBorder,
            backgroundColor: theme.colors.white,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
          }}
        >
          {value ? formatDate(value) : "Seleccioná tu fecha de nacimiento"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={value || new Date("2000-01-01")} // fecha por defecto si no hay valor
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        maximumDate={new Date()}
        locale="es-AR"
        display="spinner"
      />

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 58,
    width: 308,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default FechaNacimientoInput;
