// // src/screens/SplashScreen.tsx
// import React, { useEffect } from "react";
// import { View, Image, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function SplashScreen() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate("Home"); 
//     }, 3000); 

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("@assets/")}
//         style={styles.image}
//         resizeMode="contain"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#d5ebf8",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });
