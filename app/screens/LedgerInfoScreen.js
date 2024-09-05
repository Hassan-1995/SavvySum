import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import Gradient from "../components/Gradient";
import Screen from "../components/Screen";
import colors from "../config/colors";
import HeaderComponent from "../components/HeaderComponent";
import SummaryCard from "../components/SummaryCard";
import AppText from "../components/AppText";
import TableRow from "../components/TableRow";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";

const { width, height } = Dimensions.get("window");

const data = [
  { id: 1, name: "Family", age: 30 },
  { id: 2, name: "Business", age: 25 },
  { id: 3, name: "Project", age: 35 },
];

function LedgerInfoScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLedgerId, setSelectedLedgerId] = useState(null);
  const [ledger, setLedger] = useState(data[0]);

  const nameOfLedger = () => {
    console.log("onLedgerChange");
    setModalVisible(true);
  };
  const selectLedger = (id) => {
    setSelectedLedgerId(id);
    setModalVisible(false);
    setLedger(data[id - 1]);
    console.log(ledger.name);
  };

  return (
    <>
      <Screen>
        <View style={styles.content}>
          <ScrollView>
            <View style={{ marginTop: "15%" }} />
            <TableRow />
            <TableRow />
            <TableRow />
          </ScrollView>
          <AppButton
            title={"Add New Customer"}
            onPress={() => console.log("AddNewCustomer")}
          />
        </View>

        <View style={styles.container}>
          <Gradient
            color1={colors.secondary}
            color2={colors.primary}
            height={height * 0.2}
          />
          <View style={styles.headerContainer}>
            <HeaderComponent />
          </View>
          <View style={styles.summaryContainer}>
            <SummaryCard onLedgerChange={nameOfLedger} currentLedger={ledger} />
          </View>
        </View>
      </Screen>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            {/* This View takes up the remaining space and is touchable to close the modal */}
          </TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.dash} />
            <TouchableOpacity>
              <AppText style={styles.modalHeader}>Add New Ledger</AppText>
            </TouchableOpacity>
            {data.map((ledger) => (
              <TouchableOpacity
                key={ledger.id}
                onPress={() => selectLedger(ledger.id)}
                style={{ flexDirection: "row" }}
              >
                {selectedLedgerId === ledger.id ? (
                  <Icon
                    name={"check-circle-outline"}
                    backgroundColor="transparent"
                    iconColor={colors.income}
                  />
                ) : (
                  <Icon
                    name={"checkbox-blank-circle-outline"}
                    backgroundColor="transparent"
                    iconColor={colors.income}
                  />
                )}
                <AppText style={styles.ledgerName}>{ledger.name}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    height: 150,
    alignItems: "center",
  },
  dash: {
    width: "50%",
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 10,
    alignSelf: "center",
    elevation: 5,
  },
  content: {
    height: "80%",
    width: "100%",
    paddingHorizontal: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    width: "100%",
    height: "100%",
    // alignItems: "center",
  },
  modalView: {
    position: "absolute", // Makes the View positioned absolutely
    bottom: 0, // Positions it at the bottom of the screen
    // height: 200, // Sets the height of the View
    width: "100%", // Makes the View take the full width of the screen
    backgroundColor: "white", // Sets the background color
    shadowColor: "#000", // Optional: Add some shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 10,
    elevation: 5, // For Android shadow
  },
  modalHeader: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    marginTop: 10,
  },
  ledgerName: {
    backgroundColor: colors.light,
    borderRadius: 10,
    color: colors.primary,
    fontSize: 20,
    padding: 10,
    marginBottom: 5,
    flex: 1,
  },
});

export default LedgerInfoScreen;
