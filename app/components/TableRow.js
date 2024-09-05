import React from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function TableRow(props) {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        {/* <Icon size={30} /> */}
        <View style={styles.row}>
          <AppText style={styles.name}>Hammad Ahmed</AppText>
          <AppText style={styles.amount}>Rs 100,000</AppText>
        </View>
      </TouchableOpacity>
      <View style={styles.dash} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  amount: {
    fontSize: 18,
  },
  dash: {
    width: "90%",
    height: 2,
    backgroundColor: colors.primary,
    alignSelf: "center",
    elevation: 5,
    marginVertical: 2,
  },
});

export default TableRow;
