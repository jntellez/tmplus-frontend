import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../theme/colors";

const DatePicker = ({ rentalDate, endDate, onDateChange, onTimeChange }) => {
  const [isStartDate, setIsStartDate] = useState(true); // Alternar entre fecha de inicio y fin
  const [selectedStartTime, setSelectedStartTime] = useState("12:00"); // Hora de inicio por defecto
  const [selectedEndTime, setSelectedEndTime] = useState("12:00"); // Hora de fin por defecto

  const timeSlots = useCallback(() => {
    const slots = [];
    const startTime = new Date(0, 0, 0, 0, 0); // Comienza a las 00:00

    for (let i = 0; i < 48; i++) {
      const time = new Date(startTime.getTime() + i * 30 * 60000); // Intervalos de 30 minutos
      slots.push(time);
    }
    return slots;
  }, []);

  const handleTimeSelect = (time, type) => {
    const formattedTime = `${time.getHours()}:${
      time.getMinutes() < 10 ? "0" : ""
    }${time.getMinutes()}`;
    if (type === "start") {
      setSelectedStartTime(formattedTime);
      onTimeChange(formattedTime, "start");
    } else {
      setSelectedEndTime(formattedTime);
      onTimeChange(formattedTime, "end");
    }
  };

  const generateMarkedDates = (startDate, endDate) => {
    const markedDates = {};
    if (startDate) {
      markedDates[startDate.toISOString().split("T")[0]] = {
        selected: true,
        selectedColor: colors.linkColor,
        selectedTextColor: "white",
        dotColor: colors.linkColor,
      };
    }
    if (startDate && endDate) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        markedDates[dateString] = {
          selected: true,
          selectedColor: `${colors.linkColor}80`,
          dotColor: `${colors.linkColor}80`,
        };
        currentDate.setDate(currentDate.getDate() + 1); // Incrementar la fecha
      }
    }
    return markedDates;
  };

  const handleDateChange = (day) => {
    const selectedDate = new Date(day.dateString); // Convierte la fecha seleccionada

    if (isStartDate) {
      onDateChange(selectedDate, null); // Establecer la fecha de inicio
      setIsStartDate(false); // Cambiar para seleccionar la fecha de fin
    } else {
      if (selectedDate >= rentalDate) {
        // Verificar que la fecha de fin no sea antes de la de inicio
        onDateChange(rentalDate, selectedDate); // Establecer fecha de fin
        setIsStartDate(true); // Volver a seleccionar la fecha de inicio la próxima vez
      } else {
        onDateChange(selectedDate, null); // Si la fecha de fin es antes de la de inicio, actualizar fecha de inicio
        setIsStartDate(false); // Cambiar para seleccionar la fecha de fin
      }
    }
  };

  return (
    <View style={styles.datePickerContainer}>
      <View style={styles.dateTimeRow}>
        <Text style={styles.dateText}>
          {rentalDate
            ? `${rentalDate.toISOString().split("T")[0]} - ${selectedStartTime}`
            : "Fecha de Inicio No Seleccionada"}
        </Text>
        <Text style={styles.dateText}>
          {endDate
            ? `${endDate.toISOString().split("T")[0]} - ${selectedEndTime}`
            : "Fecha de Fin No Seleccionada"}
        </Text>
      </View>

      <Calendar
        markedDates={generateMarkedDates(rentalDate, endDate)}
        onDayPress={handleDateChange}
        monthFormat={"yyyy MM"}
        hideExtraDays={true}
        theme={{
          backgroundColor: colors.cardBackground,
          calendarBackground: colors.cardBackground,
          selectedDayBackgroundColor: colors.linkColor,
          selectedDayTextColor: "white",
          todayTextColor: colors.linkColor,
          arrowColor: colors.linkColor,
          dayTextColor: colors.primaryTextLight,
          textSectionTitleColor: colors.secondaryTextLight,
          textDisabledColor: colors.secondaryTextLight,
          dotColor: colors.linkColor,
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeLabel}>Hora de Entrega</Text>
        <FlatList
          horizontal
          data={timeSlots()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedStartTime ===
                  `${item.getHours()}:${
                    item.getMinutes() < 10 ? "0" : ""
                  }${item.getMinutes()}` && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimeSelect(item, "start")}
            >
              <Text style={styles.timeText}>
                {item.getHours()}:{item.getMinutes() < 10 ? "0" : ""}
                {item.getMinutes()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.timeRow}>
        <Text style={styles.timeLabel}>Hora de Devolución</Text>
        <FlatList
          horizontal
          data={timeSlots()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedEndTime ===
                  `${item.getHours()}:${
                    item.getMinutes() < 10 ? "0" : ""
                  }${item.getMinutes()}` && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimeSelect(item, "end")}
            >
              <Text style={styles.timeText}>
                {item.getHours()}:{item.getMinutes() < 10 ? "0" : ""}
                {item.getMinutes()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
    padding: 10,
    borderRadius: 8,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: colors.primaryTextLight,
  },
  timeRow: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLabel: {
    fontSize: 16,
    color: colors.primaryTextLight,
    marginRight: 8,
  },
  timeSlot: {
    padding: 8,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1, // Borde añadido
    borderColor: colors.borderColor, // Color del borde
  },
  selectedTimeSlot: {
    backgroundColor: colors.linkColor,
    borderColor: colors.linkColor, // Asegura que el borde también cambie al seleccionarlo
  },
  timeText: {
    color: colors.primaryTextLight,
    fontSize: 14,
  },
});

export default DatePicker;
