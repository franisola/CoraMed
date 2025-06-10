import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "@themes/ThemeContext";

interface Props {
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const AppointmentMotiveInput: React.FC<Props> = ({ value, onChangeText, editable = false }) => {
  const { theme, isDark } = useTheme();
  const valueColor = isDark ? theme.colors.textSecondary : theme.colors.greyText;

  return (
    <View style={styles.container}>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Motivo de la consulta:</Text>
      {editable ? (
        <>
          <TextInput
            style={[styles.input, {
              borderColor: theme.colors.inputBorder,
              color: theme.colors.text,
            }]}
            placeholder="Escriba aquí el motivo de su consulta..."
            placeholderTextColor={valueColor}
            value={value}
            onChangeText={onChangeText}
            multiline
            numberOfLines={5}
            maxLength={500}
          />
          <Text style={[styles.charCounter, { color: valueColor }]}>
            Caracteres: {value.length}/500
          </Text>
        </>
      ) : (
        <Text style={[styles.readOnlyText, { color: valueColor }]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 308,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
  },
  charCounter: {
    alignSelf: "flex-end",
    marginTop: 4,
    fontSize: 12,
    textAlign: "right",
  },
  readOnlyText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AppointmentMotiveInput;
