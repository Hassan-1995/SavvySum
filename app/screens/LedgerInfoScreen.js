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
import AppTextInputDynamic from "../components/AppTextInputDynamic";

const { width, height } = Dimensions.get("window");

const data = [
  { id: 1, name: "Family", age: 30 },
  { id: 2, name: "Business", age: 25 },
  { id: 3, name: "Project", age: 35 },
];

function LedgerInfoScreen({ navigation }) {
  const [modalLedgerListVisible, setModalLedgerListVisible] = useState(false);
  const [modalAddLedgerVisible, setModalAddLedgerVisible] = useState(false);
  const [selectedLedgerId, setSelectedLedgerId] = useState(null);
  const [ledger, setLedger] = useState(data[0]);
  const [newLedger, onChangeNewLedger] = useState("");

  const nameOfLedger = () => {
    console.log("onLedgerChange");
    setModalLedgerListVisible(true);
  };
  const selectLedger = (id) => {
    setSelectedLedgerId(id);
    setModalLedgerListVisible(false);
    setLedger(data[id - 1]);
    console.log(ledger.name);
  };

  return (
    <>
      <Screen>
        <View style={styles.content}>
          <ScrollView>
            <View style={{ marginTop: "15%" }} />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
            <TableRow
              handlePress={() => navigation.navigate("Detail Screen")}
            />
          </ScrollView>
          <AppButton
            title={"Add New Customer"}
            onPress={() => navigation.navigate("Add Member")}
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
      {/* Show list of ledgers */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLedgerListVisible}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalLedgerListVisible(!modalLedgerListVisible)}
          ></TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.dash} />
            <TouchableOpacity
              onPress={() => {
                setModalLedgerListVisible(false);
                setModalAddLedgerVisible(true);
              }}
            >
              <AppText style={styles.modalHeader}>Add New Ledger</AppText>
            </TouchableOpacity>
            {data.map((ledger) => (
              <View style={{ flexDirection: "row" }} key={ledger.id}>
                <TouchableOpacity
                  onPress={() => selectLedger(ledger.id)}
                  style={{ flexDirection: "row", flex: 1 }}
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
                <TouchableOpacity>
                  <Icon
                    name={"trash-can-outline"}
                    backgroundColor="transparent"
                    iconColor={colors.expense}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Modal>
      {/* Add new ledger */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalAddLedgerVisible}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalAddLedgerVisible(!modalAddLedgerVisible)}
          ></TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.dash} />
            <AppText style={styles.modalHeader}>Add Ledger</AppText>
            <AppTextInputDynamic
              onChangeText={onChangeNewLedger}
              value={newLedger}
              icon={"book-open-page-variant-outline"}
              placeholder={"Name of customer"}
            />
            <AppButton
              title={"Save"}
              onPress={() => {
                setModalAddLedgerVisible(false);
                console.log(newLedger);
              }}
            />
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
