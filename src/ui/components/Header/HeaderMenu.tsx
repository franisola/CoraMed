import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

interface HeaderMenuProps {
  headerHeight: number;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ headerHeight }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  const toggleMenu = () => setIsMenuVisible((prev) => !prev);

  const navigateTo = (route: string) => {
    setIsMenuVisible(false);
    navigation.navigate(route as never);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={{ padding: 10 }}>
        <FontAwesome
          name={isMenuVisible ? "close" : "bars"}
          size={25}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {isMenuVisible && (
        <View style={StyleSheet.absoluteFillObject}>
          {/* Fondo para cerrar al tocar fuera del menú */}
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.01)", // toque invisible pero funcional
            }}
            onPress={toggleMenu}
          />

          {/* Menú */}
          <View
            style={[
              styles.menu,
              {
                backgroundColor: theme.colors.primary,
                width: screenWidth / 2,
                top: headerHeight + 5,
              },
            ]}
          >
            {[
              { label: "Mi perfil", route: "Profile" },
              { label: "Mi obra social", route: "ObraSocial" },
              { label: "Mis turnos", route: "Turnos" },
              { label: "Historial", route: "Historial" },
              { label: "Nuevo turno", route: "NuevoTurno" },
            ].map((item) => (
              <Pressable
                key={item.route}
                onPress={() => navigateTo(item.route)}
              >
                <Text
                  style={[
                    styles.menuItem,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
    zIndex: 9999,
  },
  menuItem: {
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default HeaderMenu;
