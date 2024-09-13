import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "./Icon";

function HeaderComponent(props) {
  return (
    <View style={styles.container}>
      <Icon name="finance" backgroundColor="transparent" size={50} />
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
  },
  drawNavigation: {
    padding: 5,
  },
  menuButton: {
    padding: 5,
    // backgroundColor: "pink",
  },
  menuButtonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  logo: {
    width: 150,
    height: 50,
    // backgroundColor: "red",
    resizeMode: "contain",
  },
});

export default HeaderComponent;
