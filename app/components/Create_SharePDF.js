import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

import colors from "../config/colors";
import AppText from "./AppText";
import DateFormat from "./DateFormat";

function Create_SharePDF({ accountBook, title, tally }) {
  const createPDF = async () => {
    // Load image from assets and convert it to base64
    const imageAsset = Asset.fromModule(
      require("../assets/LogoNameWithColors.png")
    ); // Replace with your image path
    await imageAsset.downloadAsync(); // Ensure the asset is loaded
    const base64Image = await FileSystem.readAsStringAsync(
      imageAsset.localUri,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

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
          .totals-row {
            font-weight: bold;
            background-color: #f2f2f2;
          }
          footer {
            margin-top: 40px;
            text-align: center;
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
          <tr class="totals-row">
            <td colspan="3">Total</td>
            <td>${tally.totalIncome}</td>
            <td>${tally.totalExpenses}</td>
          </tr>
        </table>

        <!-- Footer with image -->
        <footer>
          <img src="data:image/png;base64,${base64Image}" width="200" />
        </footer>
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
