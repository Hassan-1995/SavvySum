import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
} from "react-native";
import Screen from "./Screen";
import Icon from "./Icon";
import AppText from "./AppText";
import colors from "../config/colors";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate button sizes based on screen size
const BUTTON_WIDTH = width * 0.22; // 20% of screen width
const BUTTON_HEIGHT = height * 0.06; // 10% of screen height

function CalculatorComponent({ onPress }) {
  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("");

  const handleButtonPress = (buttonValue) => {
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
    <>
      {/* <View style={styles.displayArea}>
        <TextInput
          style={styles.displayInput}
          value={input}
          placeholder="Enter calculation"
          editable={false} // Read-only, so user can't directly type
        />
        <Text style={styles.lastResult}>Last Result: {lastResult}</Text>
      </View> */}

      <View style={styles.container}>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("C")}
            onPress={() => onPress("C")}
          >
            <AppText style={styles.numeric}>C</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("/")}
            onPress={() => onPress("/")}
          >
            <Icon name={"division"} backgroundColor="transparent" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("*")}
            onPress={() => onPress("*")}
          >
            <Icon name={"close"} backgroundColor="transparent" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("back")}
            onPress={() => onPress("back")}
          >
            <Icon
              name={"backspace-outline"}
              backgroundColor="transparent"
              size={35}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("7")}
            onPress={() => onPress("7")}
          >
            <AppText style={styles.numeric}>7</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("8")}
            onPress={() => onPress("8")}
          >
            <AppText style={styles.numeric}>8</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("9")}
            onPress={() => onPress("9")}
          >
            <AppText style={styles.numeric}>9</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("-")}
            onPress={() => onPress("-")}
          >
            <Icon name={"minus"} backgroundColor="transparent" size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("4")}
              onPress={() => onPress("4")}
            >
              <AppText style={styles.numeric}>4</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("1")}
              onPress={() => onPress("1")}
            >
              <AppText style={styles.numeric}>1</AppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("5")}
              onPress={() => onPress("5")}
            >
              <AppText style={styles.numeric}>5</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("2")}
              onPress={() => onPress("2")}
            >
              <AppText style={styles.numeric}>2</AppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("6")}
              onPress={() => onPress("6")}
            >
              <AppText style={styles.numeric}>6</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              // onPress={() => handleButtonPress("3")}
              onPress={() => onPress("3")}
            >
              <AppText style={styles.numeric}>3</AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.longButton}
            // onPress={() => handleButtonPress("+")}
            onPress={() => onPress("+")}
          >
            <Icon name={"plus"} backgroundColor="transparent" size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("0")}
            onPress={() => onPress("0")}
          >
            <AppText style={styles.numeric}>0</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("00")}
            onPress={() => onPress("00")}
          >
            <AppText style={styles.numeric}>00</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress(".")}
            onPress={() => onPress(".")}
          >
            <AppText style={styles.numeric}>.</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            // onPress={() => handleButtonPress("=")}
            onPress={() => onPress("=")}
          >
            <Icon name={"equal"} backgroundColor="transparent" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // padding: 10,
  },
  numeric: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.white,
  },
  rows: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  smallButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
    marginBottom: 5,
  },
  longButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT * 2 + 5, // Double height of smallButton with a margin
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
    marginBottom: 5,
  },
  displayArea: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  displayInput: {
    fontSize: 24,
    color: "#000",
    marginBottom: 10,
  },
  lastResult: {
    fontSize: 18,
    color: "#888",
  },
});

export default CalculatorComponent;
