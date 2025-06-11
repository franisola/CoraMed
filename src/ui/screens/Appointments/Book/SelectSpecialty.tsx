import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomPicker from "@components/Inputs/CustomPicker";
import CustomButton from "@components/Buttons/NormalButton";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getSpecialties,
  setSelectedSpecialty,
} from "@slices/professionalSlice";

const SelectSpecialty = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const specialties = useAppSelector(
    (state) => state.professionals.specialties
  );
  const selected = useAppSelector(
    (state) => state.professionals.selectedSpecialty
  );

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSpecialties());
  }, [dispatch]);

  useEffect(() => {
    const formatted = [
      { label: "Especialidad", value: "default" },
      ...specialties.map((item) => ({ label: item, value: item })),
    ];
    setOptions(formatted);
  }, [specialties]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false); // Reinicia el estado de loading al enfocar la pantalla

      // Reinicia la especialidad seleccionada si es la primera vez que se ingresa
      dispatch(setSelectedSpecialty("default"));
    }, [dispatch])
  );

  const handleSelect = (value: string) => {
    dispatch(setSelectedSpecialty(value));
  };

  const handlePress = () => {
    setLoading(true);
    navigation.navigate("SelectDoctor", { especialidad: selected });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Elija una Especialidad:
        </Text>

        <CustomPicker
          selectedValue={selected || "default"}
          onValueChange={handleSelect}
          items={options}
          label={false}
        />
      </View>

      <CustomButton
        title="Seleccionar Especialidad"
        onPress={handlePress}
        disabled={selected === "default" || !selected || loading}
        loading={loading}
        style={[
          styles.button,
          {
            backgroundColor:
              selected === "default" || !selected
                ? theme.colors.unauthorizedButton
                : theme.colors.button,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    marginTop: 30,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    alignSelf: "flex-start",
    marginBottom: 20,
    width: 308,
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default SelectSpecialty;