import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";
import { Ionicons } from "@expo/vector-icons";

interface RouteParams {
  especialidad: string;
}

const SelectDoctor = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { especialidad } = route.params as RouteParams;

  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [allDoctors, setAllDoctors] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const fakeApiResponse = {
          Dermatología: [
            "Giuliana Leyes",
            "Guillermo Lopez",
            "Valentino Vacchini",
            "Pedro Picapiedra",
            "Mariela Torres",
            "Juan Gomez",
            "Laura Paredes",
            "Martin Villa",
            "Nadia Solis",
            "Carla Juarez",
          ],
          Cardiología: ["Juan Perelli", "Marcos Jugo"],
          Pediatría: ["Luciana Gómez", "Pedro Rojo"],
        };

        const doctors = fakeApiResponse[especialidad] || [];
        setAllDoctors(doctors);
        setFilteredDoctors(doctors);
      } catch (error) {
        console.error("Error al cargar doctores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [especialidad]);

  useEffect(() => {
    const filtered = allDoctors.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, allDoctors]);

  const handleSelectDoctor = (doctor: string) => {
    setSelectedDoctor(doctor);
  };

  const handlePress = () => {
    navigation.navigate("SelectDate", {
      especialidad,
      doctor: selectedDoctor,
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Elija su Doctor:
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar Doctor Por Nombre..."
            placeholderTextColor={theme.colors.greyText}
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.colors.white,
                color: theme.colors.text,
                borderColor: theme.colors.inputBorder,
              },
            ]}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.greyText}
            style={styles.searchIcon}
          />
        </View>

        {loading ? (
          <ActivityIndicator
            color={theme.colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.doctorListContainer}>
            <FlatList
              data={filteredDoctors}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.doctorButton,
                    {
                      backgroundColor:
                        selectedDoctor === item
                          ? theme.colors.button
                          : theme.colors.details,
                    },
                  ]}
                  onPress={() => handleSelectDoctor(item)}
                >
                  <Text
                    style={{
                      color:
                        selectedDoctor === item
                          ? theme.colors.white
                          : theme.colors.text,
                      fontSize: 16,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          </View>
        )}
      </View>

      <CustomButton
        title="Seleccionar Doctor"
        onPress={handlePress}
        disabled={!selectedDoctor}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    marginTop: 40,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    alignSelf: "flex-start",
    marginBottom: 20,
    width: 308,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
    width: 308,
  },
  searchInput: {
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 40,
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    right: 14,
  },
  doctorListContainer: {
    height: (48 + 10) * 6,
    marginBottom: 16,
  },
  doctorButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    width: 308,
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default SelectDoctor;
