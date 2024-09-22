import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";

function Screen({ children, style, statusBarOverlayColor = colors.secondary }) {
  return (
    <SafeAreaProvider>
      {/* Expo StatusBar */}
      <StatusBar backgroundColor={statusBarOverlayColor} style="light" />

      {/* SafeAreaView to ensure content is displayed correctly on all devices */}
      <SafeAreaView style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
    // <>
    //   {/* This view acts as an overlay over the status bar */}

    //   {/* <StatusBar
    //       backgroundColor={statusBarOverlayColor}
    //       barStyle="light-content"
    //     /> */}

    //   <View
    //     style={[styles.statusBar, { backgroundColor: statusBarOverlayColor }]}
    //   />

    //   <SafeAreaProvider style={[styles.screen, style]}>
    //     <View style={[styles.view, style]}>{children}</View>
    //   </SafeAreaProvider>
    // </>
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
