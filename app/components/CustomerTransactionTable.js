import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppText from "./AppText"; // Assuming you have a reusable text component
import colors from "../config/colors";
import DateFormat from "./DateFormat";
import { useNavigation } from "@react-navigation/native";

function CustomerTransactionTable({ transactions }) {
  const navigation = useNavigation(); // Get the navigation object

  const handleLongPress = (item) => {
    console.log(item);
    // Alert.alert("Long Press", "You just long pressed the button!");
    navigation.navigate("Manage Entry", {
      pressedEntry: item,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerTextDate}>Date</AppText>
        <AppText style={styles.headerText}>Inflow</AppText>
        <AppText style={styles.headerText}>Outflow</AppText>
      </View>
      <ScrollView>
        <>
          {transactions.map((transaction, index) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(transaction)}
              style={styles.row}
              key={index}
            >
              <View style={styles.dateColumn}>
                <AppText style={styles.dateText}>
                  {DateFormat(transaction.date)}
                </AppText>
                <AppText style={styles.descriptionText}>
                  {transaction.description}
                </AppText>
                <AppText style={styles.placeholderText}>
                  {transaction.placeholder}
                </AppText>
              </View>

              <AppText style={styles.debitText}>
                {transaction.type === "income" ? transaction.amount : 0}
              </AppText>
              <AppText style={styles.creditText}>
                {transaction.type === "expense" ? transaction.amount : 0}
              </AppText>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTextDate: {
    flex: 2,
    // fontWeight: "bold",
    // textAlign: "center",
  },
  headerText: {
    flex: 1,
    // fontWeight: "bold",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dateColumn: {
    flex: 2,
  },
  dateText: {
    color: "#333",
    fontSize: 16,
  },
  descriptionText: {
    color: "#666",
    fontSize: 14,
  },
  placeholderText: {
    color: "#666",
    fontSize: 12,
  },
  debitText: {
    flex: 1,
    color: colors.income,
    textAlign: "right",
    fontSize: 16,
  },
  creditText: {
    flex: 1,
    color: colors.expense,
    textAlign: "right",
    fontSize: 16,
  },
});

export default CustomerTransactionTable;
