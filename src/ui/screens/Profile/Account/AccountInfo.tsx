import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AccountInfo() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Account Info</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditAccountInfo")}
      >
        <Text>Edit Account Info</Text>
      </TouchableOpacity>
    </View>
  );
}
