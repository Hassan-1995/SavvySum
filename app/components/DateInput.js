import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import defaultStyles from "../config/styles";

function DateInput({
  width = "100%",
  onPress,
  title = "date",
  icon = "calendar-month-outline",
  onDateChange,
  placeholder,
  ...otherProps
}) {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate ? currentDate.toDateString() : null);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={showDatepicker}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, !date && styles.placeholder]}>
        {date ? date.toDateString() : placeholder}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    // color: defaultStyles.colors.dark,
    fontSize: 18,
    // textTransform: "uppercase",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
  },
  icon: {
    marginRight: 10,
  },
});

export default DateInput;
