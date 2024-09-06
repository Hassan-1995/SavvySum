import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Screen({ children, style, statusBarOverlayColor = colors.secondary }) {
  return (
    <>
      {/* This view acts as an overlay over the status bar */}
      <View
        style={[styles.statusBar, { backgroundColor: statusBarOverlayColor }]}
      />
      <SafeAreaView style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
