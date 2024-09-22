import React from "react";

import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

function TestingScreen(props) {
  return (
    <Screen>
      <View style={styles.upperContainer}>
        <View style={{ height: "50%", backgroundColor: "yellow" }} />
      </View>
      <View style={styles.midContainer}>
        {/* <View style={{ width: 100, height: 100, backgroundColor: "orange" }} /> */}
      </View>
      <View style={styles.lowerContainer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 2,
    backgroundColor: "blue",
    // zIndex: 1,
  },
  midContainer: {
    // height: height * 0.2,
    flex: 1,
    // backgroundColor: "transparent",
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "absolute", // Make it absolute
    top: 70, // Adjust this value as needed to position it over the upperContainer
    left: 0,
    right: 0,
  },
  lowerContainer: {
    // height: height * 0.8,
    flex: 5,
    paddingHorizontal: 5,
    // zIndex: 1,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  boxA: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  boxB: {
    width: 150,
    height: 150,
    position: "absolute",
  },
  boxC: {
    width: 200,
    height: 200,
    position: "absolute",
  },
  box1: {
    backgroundColor: "red",
    zIndex: 3,
  },
  box2: {
    backgroundColor: "blue",
    zIndex: 2,
  },
  box3: {
    backgroundColor: "green",
    zIndex: 1,
  },
});

export default TestingScreen;
