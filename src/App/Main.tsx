import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@navigation/StackNavigation/AuthStack";
import AppStack from "@navigation/StackNavigation/AppStack";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { getCurrentUser } from "@slices/authSlice";

import LoadingScreen from "@screens/LoadingScreen";

type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

export default function Main({ changeLanguage, currentLanguage }: MainProps) {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);



  if (loading) {
    return <LoadingScreen />;
  }

  const linking = {
    prefixes: ["coramed://", "https://coramed.com"],
    config: {
      screens: {
        ChangePassword: "reset-password/:token",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
