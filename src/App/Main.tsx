import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@navigation/StackNavigation/AuthStack";
import NavigationTab from "@/navigation/TabNavigation/NavigationTab";

type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

export default function Main({ changeLanguage, currentLanguage }: MainProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <NavigationContainer >
      {isAuthenticated ? <NavigationTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
