import React, { useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import Gradient from "../components/Gradient";
import HeaderComponent from "../components/HeaderComponent";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppTextInputDynamic from "../components/AppTextInputDynamic";
import Icon from "../components/Icon";

const { width, height } = Dimensions.get("window");

function AddNewParticipants({ navigation }) {
  const [text, onChangeText] = useState();
  return (
    <Screen>
      <View style={styles.content}>
        <ScrollView>
          <View style={{ marginTop: "15%" }} />
          <AppTextInputDynamic
            onChangeText={onChangeText}
            value={text}
            icon={"plus-circle-outline"}
            placeholder={"Name of customer"}
          />
          <AppButton title={"Add"} onPress={() => console.log(text)} />
        </ScrollView>
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
          <AppText style={styles.entry}>Add customer</AppText>
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
  summaryContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    height: 150,
    padding: 20,
    marginTop: 20,
    // alignItems: "center",
  },
  entry: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
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
  content: {
    height: height * 0.8,
    width: "100%",
    paddingHorizontal: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
    top: height * 0.2,
  },
});

export default AddNewParticipants;
