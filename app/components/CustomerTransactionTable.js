import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText"; // Assuming you have a reusable text component
import colors from "../config/colors";

// Utility function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  const daySuffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  // Format hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format time string
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timeString = `${hours}:${formattedMinutes}${ampm}`;

  return `${day}${daySuffix} ${month} ${year} ${timeString}`;
}

function CustomerTransactionTable({ transactions }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerTextDate}>Date</AppText>
        <AppText style={styles.headerText}>Inflow</AppText>
        <AppText style={styles.headerText}>Outflow</AppText>
      </View>
      <ScrollView>
        {transactions.map((transaction, index) => (
          <View style={styles.row} key={index}>
            <View style={styles.dateColumn}>
              <AppText style={styles.dateText}>
                {formatDate(transaction.date)}
              </AppText>
              <AppText style={styles.descriptionText}>
                {transaction.description}
              </AppText>
              <AppText style={styles.placeholderText}>
                {transaction.placeholder}
              </AppText>
            </View>
            <AppText style={styles.debitText}>{transaction.debit}</AppText>
            <AppText style={styles.creditText}>{transaction.credit}</AppText>
          </View>
        ))}
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
