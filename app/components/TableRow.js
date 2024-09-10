import React, { useEffect } from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function TableRow({
  handlePress,
  particulars,
  totalSum = {
    totalIncome: 0,
    totalExpenses: 0,
  },
}) {
  const valueOfSum = totalSum.totalIncome - totalSum.totalExpenses;

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.row}>
          <AppText style={styles.name}>{particulars.particular_name}</AppText>
          <AppText
            style={[
              styles.amount,
              { color: valueOfSum >= 0 ? colors.income : colors.expense },
            ]}
          >
            Rs.{" "}
            {Math.abs(totalSum.totalIncome - totalSum.totalExpenses).toLocaleString()}
          </AppText>
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
    backgroundColor: colors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.medium,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dash: {
    width: "90%",
    height: 2,
    backgroundColor: colors.primary,
    alignSelf: "center",
    elevation: 5,
    marginVertical: 4,
  },
});

export default TableRow;
