import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Icon from "./Icon";
import AppText from "./AppText";
import colors from "../config/colors";

function SummaryCard({ onLedgerChange, currentLedger, totalSum }) {
  const [income, setIncome] = useState(true);
  const [expense, setExpense] = useState(false);

  const switchToIncome = () => {
    setIncome(true);
    setExpense(false);
    console.log("Income value is: ", income);
  };
  const switchToExpense = () => {
    setExpense(true);
    setIncome(false);
    console.log("Expense value is: ", expense);
  };

  return (
    <>
      <View style={styles.searchBox}>
        <AppText style={styles.ledgerTitle}>{currentLedger}</AppText>
        <TouchableHighlight
          underlayColor={colors.light}
          onPress={onLedgerChange}
        >
          <Icon
            name={"menu-down"}
            iconColor={colors.medium}
            backgroundColor="transparent"
          />
        </TouchableHighlight>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.incomeBox,
            { backgroundColor: income ? colors.income : colors.green },
          ]}
          onPress={switchToIncome}
        >
          <Icon
            name={"arrow-down-thin"}
            iconColor={income ? colors.income : colors.green}
            backgroundColor={income ? "white" : colors.income}
          />
          <View style={styles.textContainer}>
            <AppText
              style={[
                styles.title,
                { color: income ? colors.white : colors.income },
              ]}
            >
              {(totalSum?.totalIncome).toLocaleString()}
            </AppText>
            <AppText
              style={[
                styles.subTitle,
                { color: income ? colors.white : colors.income },
              ]}
            >
              Receivables
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.expenseBox,
            { backgroundColor: expense ? colors.expense : colors.red },
          ]}
          onPress={switchToExpense}
        >
          <Icon
            name={"arrow-up-thin"}
            iconColor={expense ? colors.expense : colors.red}
            backgroundColor={expense ? "white" : colors.expense}
          />
          <View style={styles.textContainer}>
            <AppText
              style={[
                styles.title,
                { color: expense ? colors.white : colors.expense },
              ]}
            >
              {(totalSum?.totalExpenses).toLocaleString()}
            </AppText>
            <AppText
              style={[
                styles.subTitle,
                { color: expense ? colors.white : colors.expense },
              ]}
            >
              Payables
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchBox: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.light,
  },
  incomeBox: {
    width: "45%",
    backgroundColor: colors.income,
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    elevation: 20,
  },
  expenseBox: {
    width: "45%",
    backgroundColor: colors.expense,
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    elevation: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: colors.white,
    fontSize: 14,
  },
  ledgerTitle: {
    color: colors.primary,
    marginLeft: 10,
    // fontWeight: "bold",
    fontSize: 18,
  },
});

export default SummaryCard;
