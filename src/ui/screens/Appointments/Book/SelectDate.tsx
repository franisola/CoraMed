import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getAvailableSchedules } from "@slices/professionalSlice";

const weekdayMap: Record<string, string> = {
  Sunday: "Domingo",
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
};

const SelectDate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctor, especialidad } = route.params;
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const availableTimes = useAppSelector((state) => state.professionals.schedules);

  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (doctor?.dias_laborales) {
      setAvailableDays(doctor.dias_laborales);
    }
  }, [doctor]);

  const isDayAvailable = (date: string) => {
    const today = dayjs().startOf("day");
    const dateObj = dayjs(date);
    if (dateObj.isBefore(today)) return false;

    const day = dateObj.format("dddd");
    const diaTraducido = weekdayMap[day];
    return availableDays.includes(diaTraducido);
  };

  const handleDateSelect = async (date: string) => {
    if (!isDayAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    await dispatch(getAvailableSchedules({ id: doctor._id, date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    navigation.navigate("BookAppointment", {
      especialidad,
      doctor,
      fecha: selectedDate,
      hora: selectedTime,
    });
  };

  const markedDates = selectedDate
    ? {
        [selectedDate]: {
          selected: true,
          selectedColor: theme.colors.button,
        },
      }
    : {};

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>Seleccionar fecha:</Text>

        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={markedDates}
            style={{ width: 308 }}
            theme={{
              calendarBackground: theme.colors.background,
              monthTextColor: theme.colors.text,
              textSectionTitleColor: theme.colors.text,
              selectedDayBackgroundColor: theme.colors.button,
              selectedDayTextColor: theme.colors.white,
              dayTextColor: theme.colors.text,
              todayTextColor: theme.colors.primary,
              arrowColor: theme.colors.text,
            }}
            dayComponent={({ date }) => {
              const dateStr = date.dateString;
              const isAvailable = isDayAvailable(dateStr);

              return (
                <TouchableOpacity
                  onPress={() => handleDateSelect(dateStr)}
                  disabled={!isAvailable}
                  style={{
                    backgroundColor:
                      selectedDate === dateStr
                        ? theme.colors.button
                        : "transparent",
                    borderRadius: 20,
                    padding: 8,
                  }}
                >
                  <Text
                    style={{
                      color: !isAvailable
                        ? theme.colors.greyText
                        : selectedDate === dateStr
                        ? theme.colors.white
                        : theme.colors.text,
                    }}
                  >
                    {date.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
            minDate={dayjs().add(1, "day").format("YYYY-MM-DD")}
          />
        </View>

        {selectedDate && (
          <>
            <Text style={[styles.subtitle, { color: theme.colors.text }]}>Seleccionar horario:</Text>

            <View style={styles.timeListContainer}>
              <FlatList
                data={availableTimes}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.timeButton,
                      {
                        backgroundColor:
                          selectedTime === item
                            ? theme.colors.button
                            : theme.colors.details,
                      },
                    ]}
                    onPress={() => handleTimeSelect(item)}
                  >
                    <Text
                      style={{
                        color:
                          selectedTime === item
                            ? theme.colors.white
                            : theme.colors.text,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
              />
            </View>
          </>
        )}
      </View>

      <CustomButton
        title="Seleccionar Fecha y Hora"
        onPress={handleContinue}
        disabled={!selectedDate || !selectedTime}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
  calendarWrapper: {
    width: 308,
    marginBottom: 10,
  },
  timeListContainer: {
    height: (36 + 10) * 3,
    width: 308,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timeButton: {
    width: 90,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  button: {
    alignSelf: "center",
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default SelectDate;
