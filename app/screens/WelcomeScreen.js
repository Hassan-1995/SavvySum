import React from "react";

import { View, StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppText from "../components/AppText";

function WelcomeScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require("../assets/SavvySumLogo_1.png")}
          />
          <Image
            style={styles.nameImage}
            source={require("../assets/LogoNameWithColors.png")}
          />
          <AppText
            style={{ fontWeight: "bold", fontSize: 25, color: colors.primary }}
          >
            Simplifying cash tracking
          </AppText>
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
  nameImage: {
    width: "100%",
    height: 200,
  },
  logoImage: {
    // width: 160,
    width: "45%",
    height: 160,
    // backgroundColor: "blue",
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },
});

export default WelcomeScreen;
