import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
 const ProfileStack = () => (
    <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="EditAccountInfo" component={EditAccountInfo} />
        <Stack.Screen name="Insurance" component={Insurance} />
        <Stack.Screen name="AddInsurance" component={AddInsurance} />
        <Stack.Screen name="Language" component={Language} />
    </Stack.Navigator>
);

export default ProfileStack;