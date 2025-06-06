  import React, { useState } from "react";
  import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Dimensions,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";

  import { useTheme } from "@themes/ThemeContext";

  import { FontAwesome } from "@expo/vector-icons";

  import CustomButton from "@components/Buttons/NormalButton";
  import TabsPerfil from "@components/Header/TabsPerfil";
  const { height } = Dimensions.get("window");

  const Perfil = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const { theme, toggleTheme, isDark } = useTheme();

    const renderPersonalData = () => (
      <>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Nombre Completo
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          Silvana Ardisson
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>DNI</Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          24980182
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Fecha de nacimiento
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          25/01/76
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Género</Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          Femenino
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Teléfono</Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          1136610049
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Dirección
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          La gaviota
        </Text>
      </>
    );

    const renderAccountData = () => (
      <>
        <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
        <Text
          style={[
            styles.value,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          silvanaardison@gmail.com
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Contraseña
        </Text>
        <View style={styles.passwordContainer}>
          <Text
            style={[
              styles.passwordValue,
              {
                color: theme.dark
                  ? theme.colors.textSecondary
                  : theme.colors.greyText,
              },
            ]}
          >
            {showPassword ? "12345678" : "********"}
          </Text>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color={theme.dark ? theme.colors.textSecondary : theme.colors.icons}
            />
          </TouchableOpacity>
        </View>
      </>
    );

    const handleNavigation = () => {
      navigation.navigate("ProfileStack", {
        screen: "EditAccountInfo",
        params: { tab: activeTab },
      });
    };

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Tabs */}
        <TabsPerfil activeTab={activeTab} setActiveTab={setActiveTab} tabs={["personal", "account"]} />

        {/* Contenido scrollable */}
        <View
          // contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          // showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {activeTab === "personal"
              ? renderPersonalData()
              : renderAccountData()}
          </View>
        </View>

        <CustomButton
          style={{
            marginHorizontal: "auto",
            alignSelf: "center",
            position: "absolute",
            bottom: 30,
            // width: "90%",
          }}
          title="Editar Perfil"
          onPress={handleNavigation}
        />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },
    tabContainer: {
      flexDirection: "row",
      height: 50,
    },
    tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    tabText: {
      fontWeight: "bold",
      fontSize: 16,
    },
    scrollView: {
      flex: 1,
      padding: 20,
      paddingBottom: 120, //
    },
    // scrollContent: {
    //   padding: 20,
    //   paddingBottom: 120, // para que no tape el botón
    // },
    content: {
      flexGrow: 1,
    },
    label: {
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 16,
      paddingLeft: 20, // ← agregado para correr a la derecha
    },
    value: {
      fontSize: 18,
      marginBottom: 12,
      paddingLeft: 20, // ← agregado para correr a la derecha
    },
    buttonContainer: {
      position: "absolute",
      bottom: 30, // ⚠️ Ajústalo si tu footer es más alto
      width: "100%",
      alignItems: "center",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
      marginBottom: 12,
      paddingLeft: 20, // ← agregado para correr a la derecha
    },
    passwordValue: {
      fontSize: 18,
    },
  });

  export default Perfil;



