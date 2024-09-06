import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import HeaderComponent from "../components/HeaderComponent";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import CalculatorComponent from "../components/CalculatorComponent";
import AppTextInputDynamic from "../components/AppTextInputDynamic";

const { width, height } = Dimensions.get("window");

function EntryLedgerScreen({ navigation, route }) {
  const { title } = route.params;

  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
              onFocusChange={(focused) => setIsFocused(focused)}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWithIcon}>
                <Icon
                  name={"calendar-blank-outline"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                <AppText style={styles.buttonTitle}>1st Sept, 24</AppText>
              </View>
              <View style={styles.buttonWithIcon}>
                <Icon
                  name={"camera-outline"}
                  backgroundColor="transparent"
                  iconColor={colors.primary}
                />
                <AppText style={styles.buttonTitle}>Bill copy</AppText>
              </View>
            </View>
          </>
        )}

        <View style={styles.bottomContainer}>
          <AppButton
            title={"save"}
            disabled={input == "" ? true : false}
            color={
              input == "" && title == "gave"
                ? "red"
                : input == "" && title == "received"
                ? "green"
                : input !== "" && title == "received"
                ? "income"
                : "expense"
            }
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
            I {title} {title == "gave" ? "to" : "from"} Hammad
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
    width: "40%",
    borderRadius: 25,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default EntryLedgerScreen;
