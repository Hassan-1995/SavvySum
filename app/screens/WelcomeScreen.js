import React from "react";

import { View, StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require("../assets/LogoNameWithColors.png")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title={"Register"} color="primary" />
          <AppButton title={"Login"} color="secondary" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.light,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logoImage: {
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },
});

export default WelcomeScreen;
