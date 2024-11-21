import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../../theme/colors";
import { getAllByMotorcycleId } from "../../services/rentalService"; // Importa el servicio de rentas

const DatePicker = ({
  rentalDate,
  endDate,
  onDateChange,
  onTimeChange,
  motorcycleId,
}) => {
  const [isStartDate, setIsStartDate] = useState(true);
  const [selectedStartTime, setSelectedStartTime] = useState("12:00");
  const [selectedEndTime, setSelectedEndTime] = useState("12:00");
  const [unavailableDates, setUnavailableDates] = useState({});
  const [loading, setLoading] = useState(true); // Estado de carga
  const [rentals, setRentals] = useState([]);

  const timeSlots = useCallback(() => {
    const slots = [];
    const startTime = new Date(0, 0, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
      const time = new Date(startTime.getTime() + i * 30 * 60000);
      slots.push(time);
    }
    return slots;
  }, []);

  // Función para hacer el fetch de las rentas utilizando el servicio
  const fetchRentals = async () => {
    try {
      const rentalsData = await getAllByMotorcycleId(motorcycleId); // Usamos el método getAllByMotorcycleId del servicio
      setRentals(rentalsData);
      setLoading(false); // Cambiar estado de carga a falso cuando los datos estén listos
    } catch (error) {
      console.error("Error fetching rentals: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals(); // Llamada a la API para obtener las rentas
  }, []);

  useEffect(() => {
    if (rentals.length === 0) return;

    const generateUnavailableDates = () => {
      const dates = {};
      rentals.forEach((rental) => {
        let currentDate = new Date(rental.start_date);
        const endDate = new Date(rental.end_date);

        while (currentDate <= endDate) {
          const dateString = currentDate.toISOString().split("T")[0];
          dates[dateString] = {
            disabled: true,
            disableTouchEvent: true,
            selected: true,
            selectedColor: "#D16C6C", // Rojo
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setUnavailableDates(dates);
    };

    generateUnavailableDates();
  }, [rentals]);

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
    const markedDates = { ...unavailableDates };
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
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return markedDates;
  };

  const handleDateChange = (day) => {
    const selectedDate = new Date(day.dateString);

    // Verificar si la fecha seleccionada está ocupada
    if (unavailableDates[selectedDate.toISOString().split("T")[0]]) {
      return;
    }

    // Si estamos seleccionando la fecha de inicio
    if (isStartDate) {
      onDateChange(selectedDate, null);
      setIsStartDate(false);
    } else {
      // Verificamos si la fecha de fin seleccionada está dentro de las fechas no disponibles
      const currentStartDate = new Date(rentalDate);
      const currentEndDate = new Date(selectedDate);

      let isValid = true;
      // Recorremos todas las fechas entre el inicio y el final para ver si hay alguna no disponible
      let checkDate = new Date(currentStartDate);
      while (checkDate <= currentEndDate) {
        if (unavailableDates[checkDate.toISOString().split("T")[0]]) {
          isValid = false;
          break;
        }
        checkDate.setDate(checkDate.getDate() + 1);
      }

      if (isValid) {
        onDateChange(rentalDate, selectedDate); // Si es válido, asignamos la fecha de fin
        setIsStartDate(true); // Volvemos a seleccionar fecha de inicio
      } else {
        onDateChange(selectedDate, null); // Se restablece la fecha de fin
        setIsStartDate(true); // Volvemos a poner la fecha de inicio
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.linkColor} />;
  }

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
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardBackground,
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: colors.primaryTextLight,
  },
  timeRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  timeLabel: {
    marginBottom: 5,
    color: colors.secondaryTextLight,
  },
  timeSlot: {
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 4,
  },
  selectedTimeSlot: {
    backgroundColor: colors.linkColor,
  },
  timeText: {
    color: colors.primaryTextLight,
  },
});

export default DatePicker;
