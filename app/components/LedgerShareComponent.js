import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import ViewShot from "react-native-view-shot";

function LedgerShareComponent({
  viewShotRef,
  handleShare,
  ledgerName,
  authKey,
}) {
  return (
    <TouchableOpacity onLongPress={handleShare}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: "jpg", quality: 1.0 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <AppText numberOfLines={1} style={styles.ledgerName}>
            {ledgerName}
          </AppText>
        </View>
        <View style={styles.header}>
          <AppText numberOfLines={1} style={styles.authKey}>
            {authKey}
          </AppText>
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
    borderColor: colors.primary,
    marginBottom: 5,
  },
  header: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
  },
  ledgerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  authKey: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default LedgerShareComponent;
