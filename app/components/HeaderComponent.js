import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";

function HeaderComponent(props) {
  return (
    <View style={styles.container}>
      <Icon
        name="calculator-variant"
        backgroundColor="transparent"
        size={60}
        iconColor={colors.white}
      />
      <Image style={styles.logo} source={require("../assets/LogoName.png")} />
      {/* <View style={styles.menuButtonContainer}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: "100%",
    // backgroundColor: "blue",
  },
  logo: {
    width: 150,
    height: 50,
    // backgroundColor: "red",
    resizeMode: "contain",
  },
});

export default HeaderComponent;
