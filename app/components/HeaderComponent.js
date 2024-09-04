import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "./Icon";

function HeaderComponent(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("TouchableOpacity pressed");
        }}
        style={styles.drawNavigation}
      >
        <Icon name="menu" backgroundColor="transparent" />
      </TouchableOpacity>
      <Image style={styles.logo} source={require("../assets/LogoName.png")} />
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("TouchableOpacity pressed");
          }}
          style={styles.menuButton}
        >
          <Icon name="phone-in-talk-outline" backgroundColor="transparent" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("TouchableOpacity pressed");
          }}
          style={styles.menuButton}
        >
          <Icon name="bell-outline" backgroundColor="transparent" />
        </TouchableOpacity>
      </View>
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
