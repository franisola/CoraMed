import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const availableTimes = useAppSelector(
    (state) => state.professionals.schedules
  );

  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (doctor?.dias_laborales) {
      setAvailableDays(doctor.dias_laborales);
    }
  }, [doctor]);

  const isDayAvailable = useCallback(
    (date: string) => {
      const today = dayjs().startOf("day");
      const tomorrow = today.add(1, "day");
      const dateObj = dayjs(date);

      // La fecha debe ser igual o posterior a mañana y estar dentro de los días laborales
      if (dateObj.isBefore(tomorrow)) return false;

      const day = dateObj.format("dddd");
      const diaTraducido = weekdayMap[day] ?? day;
      return availableDays.includes(diaTraducido);
    },
    [availableDays]
  );

  const handleDateSelect = useCallback(
    (date: string) => {
      if (!isDayAvailable(date)) return;

      setSelectedDate(date);
      setSelectedTime(null);

      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }

      setLoading(true);

      // debounce: espera 300ms antes de hacer fetch, para evitar requests rápidas seguidas
      fetchTimeoutRef.current = setTimeout(async () => {
        await dispatch(getAvailableSchedules({ id: doctor._id, date }));
        setLoading(false);
      }, 300);
    },
    [isDayAvailable, dispatch, doctor]
  );

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate("BookAppointment", {
      especialidad,
      doctor,
      fecha: selectedDate,
      hora: selectedTime,
    });
  };

  const renderDay = ({ date }: { date: any }) => {
    const dateStr = date.dateString;
    const isAvailable = isDayAvailable(dateStr);

    return (
      <TouchableOpacity
        onPress={() => handleDateSelect(dateStr)}
        disabled={!isAvailable}
        accessibilityRole="button"
        accessibilityState={{
          disabled: !isAvailable,
          selected: selectedDate === dateStr,
        }}
        style={{
          backgroundColor:
            selectedDate === dateStr ? theme.colors.button : "transparent",
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          {t("book.selectDate")}
        </Text>

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
            dayComponent={renderDay}
            minDate={dayjs().add(1, "day").format("YYYY-MM-DD")}
          />
        </View>

        {selectedDate && (
          <>
            <Text style={[styles.subtitle, { color: theme.colors.text }]}>
              {t("book.selectTime")}
            </Text>

            <View style={styles.timeListContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.button} />
              ) : availableTimes.length === 0 ? (
                <Text style={{ color: theme.colors.text, marginTop: 10 }}>
                  No hay horarios disponibles para esta fecha.
                </Text>
              ) : (
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
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedTime === item }}
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
              )}
            </View>
          </>
        )}
      </View>

      <CustomButton
        title={loading ?  t("book.selectTime") : t("book.selectDateTime")}
        onPress={handleContinue}
        disabled={!selectedDate || !selectedTime || loading}
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
