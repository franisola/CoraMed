import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";
import { useHealthInsuranceForm } from "./useHealthInsuranceForm";
import HealthInsuranceFields from "./HealthInsuranceFields";
import { useTranslation } from "react-i18next"; 


interface Props {
  onSubmit: (data: {
    nombre: string;
    numero_socio: string;
    plan: string;
  }) => void;
  hideTitle?: boolean;
  loading?: boolean;
}

const HealthInsuranceForm: React.FC<Props> = ({
  onSubmit,
  hideTitle,
  loading,
}) => {
  const { theme } = useTheme();
  const {
    values,
    errors,
    handleChange,
    handleFormSubmit,
    generalError,
    isValid,
  } = useHealthInsuranceForm(onSubmit);
  const { t } = useTranslation(); 
  return (
    <SafeAreaView
      style={{
        gap: 10,
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <HealthInsuranceFields
        values={values}
        errors={errors}
        onChange={handleChange}
      />

      {generalError && (
        <Text style={{ color: theme.colors.error, marginTop: 10 }}>
          {generalError}
        </Text>
      )}

      <CustomButton
        style={{ position: "absolute", bottom: 30 }}
        title= {t("insuranceTxt.addInsurance")} 
        onPress={handleFormSubmit}
        loading={loading}
        disabled={!isValid || loading}
      />
    </SafeAreaView>
  );
};

export default HealthInsuranceForm;
