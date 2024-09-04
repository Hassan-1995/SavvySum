import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import HeaderComponent from "../components/HeaderComponent";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppTextInputAmount from "../components/AppTextInputAmount";

const { width, height } = Dimensions.get("window");

function EntryLedgerScreen(props) {
  return (
    <Screen>
      <View style={styles.content}>
        <ScrollView>
          <View style={{ marginTop: "15%" }} />
          <AppTextInputAmount icon={"cash-plus"} />
        </ScrollView>
        <AppButton title={"Add New Customer"} />
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
          <TouchableOpacity>
            <Icon
              name={"arrow-left-drop-circle-outline"}
              size={50}
              backgroundColor="transparent"
            />
          </TouchableOpacity>
          <AppText style={styles.entry}>I gave to Hammad</AppText>
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
    height: "80%",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
  },
});

export default EntryLedgerScreen;
