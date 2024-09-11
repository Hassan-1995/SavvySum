import React from "react";
import { Button, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import colors from "../config/colors";
import AppText from "./AppText";
import DateFormat from "./DateFormat";

function Create_SharePDF({ accountBook, title }) {
  const createPDF = async () => {
    // Generating HTML content with CSS styling
    let htmlContent = `
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1 {
                text-align: center;
                color: #333;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              table, th, td {
                border: 1px solid #ddd;
              }
              th, td {
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
                color: #333;
              }
              tr:nth-child(even) {
                background-color: #f9f9f9;
              }
              tr:hover {
                background-color: #f1f1f1;
              }
            </style>
          </head>
          <body>
            <h1>${title.ledger_name}</h1>
            <table>
              <tr>
                <th>Particulars</th>
                <th>Category</th>
                <th>Date</th>
                <th>Income</th>
                <th>Expense</th>
              </tr>
        `;

    accountBook.forEach((item) => {
      htmlContent += `
            <tr>
              <td>${item.particular_name}</td>
              <td>${item.description}</td>
              <td>${DateFormat(item.date)}</td>
              <td>${item.type === "income" ? item.amount : ""}</td>
              <td>${item.type === "expense" ? item.amount : ""}</td>
            </tr>
          `;
    });

    htmlContent += `
            </table>
          </body>
          </html>
        `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF saved to:", uri);

      // Share the PDF (optional)
      await shareAsync(uri);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.pdfButton} onPress={createPDF}>
      <AppText style={styles.pdfText}>Create PDF</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pdfButton: {
    backgroundColor: colors.danger, // a color for danger (red) for the logout button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 2,
  },
  pdfText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Create_SharePDF;
