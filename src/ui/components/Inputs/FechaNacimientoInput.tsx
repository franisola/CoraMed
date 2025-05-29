// @components/Inputs/FechaNacimientoInput.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@themes/ThemeContext";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
}

const FechaNacimientoInput: React.FC<Props> = ({ value, onChange, error }) => {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) onChange(selectedDate);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

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
        onPress={() => setShowPicker(true)}
        style={{
          height: 58,
          width: 308,
          borderWidth: 1,
          borderColor: error ? theme.colors.error : theme.colors.inputBorder,
          backgroundColor: theme.colors.white,
          borderRadius: 8,
          justifyContent: "center",
          paddingHorizontal: 14,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}

      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = {
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
};

export default FechaNacimientoInput;
