import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@screens/Auth/Login";
import Register from "@screens/Auth/Register";
import RecoverPassword from "@screens/Auth/RecoverPassword";
import CodeVerification from "@screens/Auth/CodeVerification";
import ChangePassword from "@screens/Auth/ChangePassword";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  CodeVerification: undefined
  ChangePassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    <Stack.Screen name="CodeVerification" component={CodeVerification} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
  </Stack.Navigator>
);

export default AuthStack;