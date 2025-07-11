import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@themes/ThemeContext";

interface CustomPickerProps {
  label?: boolean;
  labelText?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
  items: { label: string; value: string }[];
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  labelText,
  selectedValue,
  onValueChange,
  error,
  items,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
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
          styles.pickerWrapper,
          {
            borderColor: error ? theme.colors.error : theme.colors.inputBorder,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          dropdownIconColor={theme.colors.text}
          style={{
            color: theme.colors.text,
            fontSize: 18,
            marginLeft: Platform.OS === "android" ? -4 : 0, // alinea mejor el texto
          }}
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
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
  pickerWrapper: {
    height: 58,
    width: 308,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomPicker;
