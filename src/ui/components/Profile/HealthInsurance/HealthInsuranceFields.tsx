import React from "react";
import { View, Text } from "react-native";
import CustomInput from "@components/Inputs/InputData";
import { useTheme } from "@themes/ThemeContext";

interface Props {
  values: {
    nombre: string;
    numero_socio: string;
    plan: string;
  };
  errors: {
    nombre?: { message: string };
    numero_socio?: { message: string };
    plan?: { message: string };
    root?: { message: string };
  };
  onChange: (field: keyof Props["values"], value: string) => void;
}

const HealthInsuranceFields: React.FC<Props> = ({ values, errors, onChange }) => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: 10, width: "100%", alignItems: "center", marginTop: 50 }}>
      <CustomInput
        label={true}
        labelText="Nombre de la Obra Social"
        // placeholder="Nombre de la obra social"
        value={values.nombre}
        onChangeText={(value) => onChange("nombre", value)}
        error={errors.nombre?.message}
      />
      <CustomInput
        label={true}
        labelText="Número de socio"
        // placeholder="Número de socio"
        value={values.numero_socio}
        onChangeText={(value) => onChange("numero_socio", value)}
        keyboardType="numeric"
        error={errors.numero_socio?.message}
        maxLength={20}
      />
      <CustomInput
        label={true}
        labelText="Plan"
        // placeholder="Plan"
        value={values.plan}
        onChangeText={(value) => onChange("plan", value)}
        error={errors.plan?.message}
      />
      {errors.root?.message && (
        <Text style={{ color: theme.colors.error }}>{errors.root.message}</Text>
      )}
    </View>
  );
};

export default HealthInsuranceFields;