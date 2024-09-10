import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import ledgersApi from "../api/ledgers";
import particularsApi from "../api/particulars";
import entriesApi from "../api/entries";
import additionalFunctionsApi from "../api/additionalFunctions";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
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
const user_id = 1;

function LedgerInfoScreen({ navigation, route }) {
  const isFocused = useIsFocused(); // refresh screen after updating the particular in useEffect

  const [modalLedgerListVisible, setModalLedgerListVisible] = useState(false); // modal to show all ledgers by user
  const [modalAddLedgerVisible, setModalAddLedgerVisible] = useState(false); // modal to add new ledger by user

  const [userLedgers, setUserLedgers] = useState([]); // load all ledgers by particual user_id
  const [pickedLedger, setPickedLedger] = useState(); // select one ledger out of all available ledgers to show
  const [newLedger, setNewLedger] = useState(""); // variable to save name of new ledger -- see modal to add new ledger

  const [loading, setLoading] = useState(true);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [particularLedgerNames, setParticularLedgerNames] = useState([]); // load all titles of particular by particular user_id
  const [newParticular, setNewParticular] = useState("");
  const [entriesParticularNames, setEntriesParticularNames] = useState([]); // load all entries of each particular -- transactions
  const [newEntry, setNewEntry] = useState("");
  const [totalSumLedger, setTotalSumLedger] = useState({
    totalIncome: 0,
    totalExpenses: 0,
  }); // get total receivables and payables from one specific ledger
  const [totalSumParticular, setTotalSumParticular] = useState({}); // get total receivables and payables from one specific particular

  useEffect(() => {
    if (isFocused) {
      // Code to run when the screen is focused (e.g., refresh data)
      if (route.params?.updatedParticular) {
        // Refresh your selected ledger data or update your state here
        selectLedgerFromLedgersList(route.params.updatedParticular);
      }
    }
  }, [isFocused]);

  //useEffect to fetch all available ledgers from data base
  useEffect(() => {
    loadLedgerTable();
  }, [refreshScreen]);
  //useEffect to calculate the sum of all entries in each particular -- used useEffect due to map function
  useEffect(() => {
    if (particularLedgerNames?.length > 0) {
      loadParticularSum(); // Call the function when the data is available
    }
  }, [particularLedgerNames]);
  //useEffect to add new particular -- call function to createNewLedger by passing newParticular
  useEffect(() => {
    // Combine both setting the new particular and calling the creation function
    if (route.params?.newParticular) {
      const particular = route.params.newParticular;
      setNewParticular(particular);
      createNewParticular(particular);
      navigation.setParams({ newParticular: null });
    }
  }, [route.params?.newParticular]);
  //useEffect to add new entry -- call function to createNewEntry by passing newEntryData
  useEffect(() => {
    // Combine both setting the new entry and calling the creation function
    if (route.params?.newEntryData) {
      const entry = route.params.newEntryData;
      setNewEntry(entry);
      createNewEntry(entry);
      navigation.setParams({ newEntry: null });
    }
  }, [route.params?.newEntryData]);

  // function to get all ledgers
  const loadLedgerTable = async () => {
    setLoading(true);
    try {
      const response = await ledgersApi.getAllLedgersByUserID(user_id);
      setUserLedgers(response);
    } catch (error) {
      console.error("Error loading ledger data:", error);
    } finally {
      setLoading(false);
    }
  };
  // function to create a new ledger
  const createNewLedger = async (ledger_name) => {
    setModalAddLedgerVisible(false);
    setLoading(true);
    try {
      const response = await ledgersApi.createLedgerByUserID(
        user_id,
        ledger_name
      );
    } catch (error) {
      console.error("Error creating new ledger data:", error);
    } finally {
      setLoading(false);
      setNewLedger("");
      await loadLedgerTable();
    }
  };
  // function to delete ledger combine with Alert
  const showDeleteAlert = (data) => {
    Alert.alert(
      "Are you sure?", // Alert title
      "Are you sure you want to delete this?", // Alert message
      [
        {
          text: "No",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel", // Makes the button look like a cancel button
        },
        {
          text: "Yes",
          onPress: () => deleteLedgerFromLedgersList(data), // Wrap in an arrow function
        },
      ],
      { cancelable: false } // User cannot dismiss alert by tapping outside
    );
  };
  const deleteLedgerFromLedgersList = async (ledger) => {
    setLoading(true);
    try {
      const response = await ledgersApi.deleteLedgerByLedgerID(
        ledger.ledger_id
      );
      // setUserLedgers(response);
    } catch (error) {
      console.error("Error deleting ledger data:", error);
    } finally {
      setLoading(false);
      loadLedgerTable();
    }
  };

  // function to get all particulars in each ledger
  const loadParticularTable = async (ledgerID) => {
    setLoading(true);
    try {
      const response = await particularsApi.getAllParticularsByLedgerID(
        ledgerID
      );
      // Ensure that response exists
      if (!response || response.length === 0 || response.length === undefined) {
        setParticularLedgerNames(null); // Set to null if response is null or empty
      } else {
        setParticularLedgerNames(response); // Update with valid response data
      }
    } catch (error) {
      console.error("Error loading particular data:", error);
    } finally {
      setLoading(false);
    }
  };
  // function to create a new particular
  const createNewParticular = async (particular_name) => {
    setLoading(true);
    try {
      const response = await particularsApi.createParticularByLedgerID(
        pickedLedger.ledger_id,
        particular_name
      );
    } catch (error) {
      console.error("Error creating new particular data:", error);
    } finally {
      setLoading(false);
      selectLedgerFromLedgersList(pickedLedger);
    }
  };

  // function to get all entries in each particular
  const loadEntryTable = async (particularID) => {
    setLoading(true);
    try {
      const response = await entriesApi.getAllEntriesByParticular(particularID);
      // Ensure that response exists and is an array
      if (!response || response.length === 0 || response.length === undefined) {
        setEntriesParticularNames(null); // Set to null if response is null or empty
        return null;
      } else {
        setEntriesParticularNames(response); // Update with valid response data
        return response;
      }
    } catch (error) {
      console.error("Error loading entry data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // function to create new entry in specific particular
  const createNewEntry = async (entry_name) => {
    setLoading(true);
    try {
      const response = await entriesApi.createEntryByParticularID(entry_name);
    } catch (error) {
      console.error("Error creating new particular data:", error);
    } finally {
      setLoading(false);
      selectLedgerFromLedgersList(pickedLedger);
    }
  };

  //caluculate the sum of all entries in one specific ledger -- ledger->particular->entries
  const loadLedgerSum = async (ledgerID) => {
    setLoading(true);
    try {
      const response =
        await additionalFunctionsApi.getSumAmountFromSpecificLedger(
          ledgerID.ledger_id
        );
      if (!response || response.length === 0 || response.length === undefined) {
        setTotalSumLedger({ totalIncome: 0, totalExpenses: 0 });
        // return null;
      } else {
        setTotalSumLedger(calculateTotalAmounts(response));
        // return response;
      }
    } catch (error) {
      console.error("Error calculating ledger sum: ", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  //caluculate the sum of all entries in one specific particular -- particular->entries
  const loadParticularSum = async () => {
    const sums = {};
    setLoading(true);
    try {
      for (const item of particularLedgerNames) {
        const response =
          await additionalFunctionsApi.getSumAmountFromSpecificParticular(
            item.particular_id
          );
        if (response && response.length > 0) {
          sums[item.particular_id] = calculateTotalAmounts(response);
        } else {
          sums[item.particular_id] = { totalIncome: 0, totalExpenses: 0 };
        }
      }
    } catch (error) {
      console.error("Error calculating particular sum:", error);
    } finally {
      setTotalSumParticular(sums); // Store the sums
      setLoading(false);
    }
  };
  //picked or selected ledger from the list of avaible ledgers
  const selectLedgerFromLedgersList = (value) => {
    // console.log("Value: ", value);
    setModalLedgerListVisible(false);
    setPickedLedger(value);
    loadParticularTable(value.ledger_id);
    loadLedgerSum(value);
  };
  //it navigates to detail screen along with respective required data -- entries included in each particular
  const detailEntryScreen = async (value) => {
    // Wait for loadEntryTable to finish
    const updatedEntries = await loadEntryTable(value.particular_id);
    // Calculate the sum of all entries
    const updatedEntriesSum =
      updatedEntries && updatedEntries.length > 0
        ? calculateTotalAmounts(updatedEntries)
        : { totalIncome: 0, totalExpenses: 0 };

    // Now navigate using the updated value directly
    navigation.navigate("Detail Screen", {
      entriesParticularNames: updatedEntries,
      entriesParticularSum: updatedEntriesSum,
      // particularName: value.particular_name,
      particularName: value,
    });
  };
  // custom function which calcultes the amount based on the type, income and expense
  const calculateTotalAmounts = (data) => {
    const totalExpenses = data
      .filter((entry) => entry.type === "expense")
      .reduce((total, entry) => total + parseFloat(entry.amount), 0);

    const totalIncome = data
      .filter((entry) => entry.type === "income")
      .reduce((total, entry) => total + parseFloat(entry.amount), 0);

    return {
      totalExpenses,
      totalIncome,
    };
  };
  // custom function to show Icon -- just to avoid repetition
  const renderIcon = (isPicked) => (
    <Icon
      name={isPicked ? "check-circle-outline" : "checkbox-blank-circle-outline"}
      backgroundColor="transparent"
      iconColor={colors.income}
    />
  );

  return (
    <>
      <Screen>
        <View style={styles.content}>
          <ScrollView>
            <View style={{ marginTop: "15%" }} />
            {particularLedgerNames ? (
              particularLedgerNames.map((item) => (
                <TableRow
                  key={item.particular_id}
                  particulars={item}
                  totalSum={totalSumParticular[item.particular_id]}
                  handlePress={() => detailEntryScreen(item)}
                />
              ))
            ) : (
              <AppText style={styles.emptyLedger}>
                There are no particulars of {pickedLedger.ledger_name} ledger.
              </AppText>
            )}
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
            <SummaryCard
              onLedgerChange={() => setModalLedgerListVisible(true)}
              currentLedger={
                loading
                  ? "Loading..."
                  : pickedLedger?.ledger_name || "Pick a ledger"
              }
              totalSum={totalSumLedger}
            />
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
            {userLedgers.map((item) => (
              <View style={{ flexDirection: "row" }} key={item.ledger_id}>
                <TouchableOpacity
                  onPress={() => selectLedgerFromLedgersList(item)}
                  style={{ flexDirection: "row", flex: 1 }}
                >
                  {renderIcon(pickedLedger?.ledger_id === item.ledger_id)}
                  <AppText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.ledgerName}
                  >
                    {item.ledger_name}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showDeleteAlert(item)}>
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
              onChangeText={setNewLedger}
              value={newLedger}
              icon={"book-open-page-variant-outline"}
              placeholder={"Name of customer"}
            />
            <AppButton
              title={"Save"}
              onPress={() => createNewLedger(newLedger)}
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
  emptyLedger: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    padding: 10,
    textAlign: "center", // Center-align the text
    letterSpacing: 1, // Add some letter spacing for a cleaner look
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Add a subtle shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
