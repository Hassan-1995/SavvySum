import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Screen from "./Screen";
import Icon from "./Icon";
import AppText from "./AppText";
import colors from "../config/colors";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate button sizes based on screen size
const BUTTON_WIDTH = width * 0.22; // 20% of screen width
const BUTTON_HEIGHT = height * 0.07; // 10% of screen height

function CalculatorComponent(props) {
  const handleButtonPress = (buttonValue) => {
    console.log(buttonValue);
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("C")}
          >
            <AppText style={styles.numeric}>C</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("/")}
          >
            <Icon name={"division"} backgroundColor="transparent" size={60} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("*")}
          >
            <Icon name={"close"} backgroundColor="transparent" size={60} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("back")}
          >
            <Icon
              name={"backspace-outline"}
              backgroundColor="transparent"
              size={50}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("7")}
          >
            <AppText style={styles.numeric}>7</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("8")}
          >
            <AppText style={styles.numeric}>8</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("9")}
          >
            <AppText style={styles.numeric}>9</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("-")}
          >
            <Icon name={"minus"} backgroundColor="transparent" size={60} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("4")}
            >
              <AppText style={styles.numeric}>4</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("1")}
            >
              <AppText style={styles.numeric}>1</AppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("5")}
            >
              <AppText style={styles.numeric}>5</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("2")}
            >
              <AppText style={styles.numeric}>2</AppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("6")}
            >
              <AppText style={styles.numeric}>6</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleButtonPress("3")}
            >
              <AppText style={styles.numeric}>3</AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.longButton}
            onPress={() => handleButtonPress("+")}
          >
            <Icon name={"plus"} backgroundColor="transparent" size={60} />
          </TouchableOpacity>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("0")}
          >
            <AppText style={styles.numeric}>0</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("00")}
          >
            <AppText style={styles.numeric}>00</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress(".")}
          >
            <AppText style={styles.numeric}>.</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => handleButtonPress("=")}
          >
            <Icon name={"equal"} backgroundColor="transparent" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // padding: 10,
  },
  numeric: {
    fontSize: 35,
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
    marginRight: 5,
    marginBottom: 10,
  },
  longButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT * 2 + 10, // Double height of smallButton with a margin
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginBottom: 10,
  },
});

export default CalculatorComponent;
