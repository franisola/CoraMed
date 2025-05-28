import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AccountInfo() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Insurance Info</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddInsurance")}
      >
        <Text>AddInsurance</Text>
      </TouchableOpacity>
    </View>
  );
}
