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
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getProfessionalsBySpecialty, Professional } from "@slices/professionalSlice";

interface RouteParams {
  especialidad: string;
}

const SelectDoctor = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { especialidad } = route.params as RouteParams;

  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const allDoctors = useAppSelector((state) => state.professionals.professionals);
  const loadingGlobal = useAppSelector((state) => state.professionals.loading);

  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Professional | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Professional[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    dispatch(getProfessionalsBySpecialty(especialidad));
  }, [dispatch, especialidad]);

  useEffect(() => {
    const filtered = allDoctors.filter((doctor) =>
      `${doctor.nombre} ${doctor.apellido}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, allDoctors]);

  useFocusEffect(
    React.useCallback(() => {
      setLoadingButton(false); // Reinicia el estado de loadingButton al enfocar la pantalla
    }, [])
  );

  const handleSelectDoctor = (doctor: Professional) => {
    setSelectedDoctor(doctor);
  };

  const handlePress = () => {
    setLoadingButton(true);
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
          {t("book.selectDoctor")}
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder= {t("book.byName")}
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

        {loadingGlobal ? (
          <ActivityIndicator
            color={theme.colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.doctorListContainer}>
            <FlatList
              data={filteredDoctors}
              renderItem={({ item }) => {
                const fullName = `${item.nombre} ${item.apellido}`;
                const isSelected = selectedDoctor?._id === item._id;

                return (
                  <TouchableOpacity
                    style={[
                      styles.doctorButton,
                      {
                        backgroundColor: isSelected
                          ? theme.colors.button
                          : theme.colors.details,
                      },
                    ]}
                    onPress={() => handleSelectDoctor(item)}
                  >
                    <Text
                      style={{
                        color: isSelected ? theme.colors.white : theme.colors.text,
                        fontSize: 16,
                      }}
                    >
                      {fullName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          </View>
        )}
      </View>

      <CustomButton
        title= {t("book.selectDoctor")}
        onPress={handlePress}
        disabled={!selectedDoctor || loadingButton}
        loading={loadingButton}
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
    marginTop: 30,
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