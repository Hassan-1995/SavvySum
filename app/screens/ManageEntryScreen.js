import React, { useState } from "react";

import entriesApi from "../api/entries";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import HeaderComponent from "../components/HeaderComponent";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import CalculatorComponent from "../components/CalculatorComponent";
import AppTextInputDynamic from "../components/AppTextInputDynamic";
import DateFormat from "../components/DateFormat";

const { width, height } = Dimensions.get("window");

function ManageEntryScreen({ navigation, route }) {
  const { pressedEntry } = route.params;

  const [input, setInput] = useState(pressedEntry?.amount); // variable for entered amount
  const [description, setDescription] = useState(pressedEntry?.description); // variable for entered description

  const [lastResult, setLastResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [date, setDate] = useState(new Date(pressedEntry?.date) || new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);

  const handleCalculatorButtons = (buttonValue) => {
    // Add input or calculate based on button press
    if (buttonValue === "=") {
      try {
        // Evaluate the result
        const result = eval(input); // Note: Using eval is generally unsafe; consider using a proper math parser library for production
        setLastResult(result.toString());
        setInput(result.toString());
      } catch (error) {
        setInput("Error");
      }
    } else if (buttonValue === "C") {
      // Clear the input
      setInput("");
    } else if (buttonValue === "back") {
      setInput(input.slice(0, -1));
    } else {
      setInput((prevInput) => prevInput + buttonValue);
    }
  };

  const saveUpdatedEntry = async () => {
    const temp = new Date(date).toISOString().split("T")[0];
    setTime(temp);

    const updatedData = {
      ...pressedEntry,
      amount: input,
      description: description,
      date: temp,
    };

    try {
      const response = await entriesApi.updateEntryByEntryID(
        updatedData.entry_id,
        updatedData
      );
    } catch (error) {
      console.error("Error updating entry data:", error);
    } finally {
      navigation.navigate("Ledger Screen", {
        updatedEntry: updatedData,
      });
    }
  };
  const deleteEntry = async () => {
    try {
      const response = await entriesApi.deleteEntryByEntryID(
        pressedEntry.entry_id
      );
    } catch (error) {
      console.error("Error deleting entry data:", error);
    } finally {
      navigation.navigate("Ledger Screen");
    }
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      // 'set' event happens when a user confirms a date selection
      const currentDate = selectedDate || date;
      setDate(currentDate); // Update the selected date
    }
    setShow(false); // Close the picker after selection
  };

  const showMode = (currentMode) => {
    setShow(true); // Show the picker
    setMode(currentMode); // Set the mode (date/time)
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Screen>
      <View style={styles.content}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsFocused(false);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.displayAreaCalculator}>
            {lastResult == "" ? (
              <></>
            ) : (
              <AppText style={styles.lastResult}>
                Last Result: {lastResult}
              </AppText>
            )}
            <View style={styles.inputArea}>
              <MaterialCommunityIcons
                name={"cash-plus"}
                size={30}
                color={colors.primary}
                style={styles.icon}
              />
              <AppText> Rs </AppText>
              <TextInput
                style={styles.displayInput}
                value={input}
                placeholder="Enter amount"
                editable={false} // Read-only, so user can't directly type
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {input == "" ? (
          <></>
        ) : (
          <>
            <AppTextInputDynamic
              placeholder="Details (Optional)"
              onChangeText={setDescription}
              value={description}
              onFocusChange={(focused) => setIsFocused(focused)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={showDatepicker}
                style={styles.buttonWithIcon}
              >
                <Icon
                  name={"calendar-blank-outline"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <AppText style={styles.buttonTitle}>
                  {/* {DateFormat(time)} */}
                  {DateFormat(date)}
                </AppText>
              </TouchableOpacity>
              <View style={styles.buttonWithIcon}>
                <Icon
                  name={"camera-outline"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                <AppText style={styles.buttonTitle}>Bill copy</AppText>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "flex-end",
                  marginTop: 10,
                  alignItems: "center",
                }}
                onPress={() => deleteEntry(pressedEntry.entry_id)}
              >
                <Icon
                  name={"trash-can-outline"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                <AppText style={styles.buttonTitle}>Delete</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "flex-end",
                  marginTop: 10,
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Receipt", {
                    receipt: pressedEntry,
                  })
                }
              >
                <Icon
                  name={"receipt"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                <AppText style={styles.buttonTitle}>Receipt</AppText>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.bottomContainer}>
          <AppButton
            title={"Update"}
            disabled={input == "" ? true : false}
            color={
              input == "" && pressedEntry?.type == "expense"
                ? "red"
                : input == "" && pressedEntry?.type == "income"
                ? "green"
                : input !== "" && pressedEntry?.type == "income"
                ? "income"
                : "expense"
            }
            onPress={saveUpdatedEntry}
          />
          {!isFocused ? (
            <CalculatorComponent
              onPress={(value) => handleCalculatorButtons(value)}
            />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.container}>
        <Gradient
          color1={colors.secondary}
          color2={colors.primary}
          height={height * 0.2}
        />
        <View style={styles.headerContainer}>
          <HeaderComponent />
        </View>
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={"arrow-left-drop-circle-outline"}
              size={50}
              backgroundColor="transparent"
            />
          </TouchableOpacity>
          <AppText style={styles.entry}>
            I {pressedEntry?.type == "expense" ? "gave" : "received"}{" "}
            {pressedEntry?.type == "expense" ? "to" : "from"} Hammad
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeaderContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  entry: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  content: {
    height: height * 0.8,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    top: height * 0.2,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  displayAreaCalculator: {
    width: "100%",
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  displayInput: {
    fontSize: 18,
    color: "#000",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastResult: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.light,
    width: "45%",
    borderRadius: 25,
    overflow: "hidden",
    // backgroundColor: "red",
  },
  buttonTitle: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default ManageEntryScreen;
