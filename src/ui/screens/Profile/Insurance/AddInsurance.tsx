import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { saveHealthInsurance } from "@slices/healthInsuranceSlice";
import HealthInsuranceForm from "@components/Profile/HealthInsurance/HealthInsuranceForm";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@navigation/StackNavigation/ProfileStack";

const AddInsuranceScreen = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const loading = useAppSelector((state) => state.healthInsurance.loading);

  const handleSubmit = async (data: {
    nombre: string;
    numero_socio: string;
    plan: string;
  }) => {
    try {
      await dispatch(saveHealthInsurance(data)).unwrap(); // si falla lanza error
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar obra social:", error);
      // opcional: podés mostrar toast o error visual
    }
  };

  return <HealthInsuranceForm onSubmit={handleSubmit} loading={loading} hideTitle />;
};

export default AddInsuranceScreen;
