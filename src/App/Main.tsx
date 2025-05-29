import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@navigation/StackNavigation/AuthStack";
import AppStack from "@navigation/StackNavigation/AppStack";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { getCurrentUser, logoutUser } from "@slices/authSlice";

import LoadingScreen from "@screens/LoadingScreen";

type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

export default function Main({ changeLanguage, currentLanguage }: MainProps) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user && Object.keys(user).length > 0 ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
