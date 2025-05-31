import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";

import Profile from "@screens/Profile/Profile";
import AccountInfo from "@screens/Profile/Account/AccountInfo";
import EditAccountInfo from "@screens/Profile/Account/EditAccountInfo";
import Insurance from "@screens/Profile/Insurance/Insurance";
import AddInsurance from "@screens/Profile/Insurance/AddInsurance";
import Language from "@screens/Profile/Language/Language";

export type AuthStackParamList = {
  Profile: undefined;
  AccountInfo: undefined;
  EditAccountInfo: { userId: string };
  Insurance: undefined;
  AddInsurance: undefined;
  Language: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
const ProfileStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={getDefaultHeaderOptions(theme)}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: t("screenTitles.profile") }}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ title: t("screenTitles.myData") }}
      />
      <Stack.Screen
        name="EditAccountInfo"
        component={EditAccountInfo}
        options={{ title: t("screenTitles.myData") }}
      />
      <Stack.Screen
        name="Insurance"
        component={Insurance}
        options={{ title: t("screenTitles.myHealthInsurance") }}
      />
      <Stack.Screen
        name="AddInsurance"
        component={AddInsurance}
        options={{ title: t("screenTitles.addHealthInsurance") }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ title: t("screenTitles.language") }}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
