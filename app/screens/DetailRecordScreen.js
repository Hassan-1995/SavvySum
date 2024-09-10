import React, { useEffect, useState } from "react";

import particularsApi from "../api/particulars";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import HeaderComponent from "../components/HeaderComponent";
import Gradient from "../components/Gradient";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import CustomerTransactionTable from "../components/CustomerTransactionTable";
import AppButton from "../components/AppButton";
import AppTextInputDynamic from "../components/AppTextInputDynamic";

const { width, height } = Dimensions.get("window");

function DetailRecordScreen({ navigation, route }) {
  const { entriesParticularNames, entriesParticularSum, particularName } =
    route.params;
  const [color, setColor] = useState(colors.secondary);
  const [backgroundColor, setBackgroundColor] = useState(colors.secondary);

  const [modalUpdateParticular, setModalUpdateParticular] = useState(false);
  const [changeParticularName, setChangeParticularName] = useState(
    particularName?.particular_name
  );

  useEffect(() => {
    let sum =
      entriesParticularSum.totalIncome - entriesParticularSum.totalExpenses;

    if (sum >= 0) {
      setColor(colors.income);
      setBackgroundColor(colors.green);
    } else {
      setColor(colors.expense);
      setBackgroundColor(colors.red);
    }
  }, []);

  const updatingParticularName = async (value) => {
    setModalUpdateParticular(false);
    const updatedData = {
      ...particularName,
      particular_name: value,
    };

    try {
      const response = await particularsApi.updateParticularByParticularID(
        particularName.particular_id,
        updatedData
      );
    } catch (error) {
      console.error("Error updating particular data:", error);
    } finally {
      navigation.navigate("Ledger Screen", {
        updatedParticular: updatedData,
      });
    }
  };

  return (
    <>
      <Screen>
        <View style={styles.content}>
          {/* <ScrollView> */}
          <View style={{ marginTop: "10%" }} />
          {entriesParticularNames ? (
            <CustomerTransactionTable
              transactions={entriesParticularNames}
            />
          ) : (
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.primary,
                padding: 20,
                flex: 1,
              }}
            >
              There is no entry of {particularName.particular_name}.
            </AppText>
          )}

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View style={{ width: "45%" }}>
              <AppButton
                color="income"
                title={"Received"}
                onPress={() =>
                  navigation.navigate("New Transaction Entry", {
                    title: "received",
                    particularID: particularName,
                  })
                }
              />
            </View>
            <View style={{ width: "45%" }}>
              <AppButton
                color="expense"
                title={"Gave"}
                onPress={() =>
                  navigation.navigate("New Transaction Entry", {
                    title: "gave",
                    particularID: particularName,
                  })
                }
              />
            </View>
          </View>
          {/* </ScrollView> */}
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
          <View style={styles.clientInfoContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name={"arrow-left-drop-circle-outline"}
                size={50}
                backgroundColor="transparent"
              />
            </TouchableOpacity>
            <AppText style={styles.name}>
              {particularName.particular_name}
            </AppText>
            <TouchableOpacity onPress={() => setModalUpdateParticular(true)}>
              <Icon
                name={"circle-edit-outline"}
                size={25}
                backgroundColor="transparent"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.amountInfoContainer,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Icon
              name={"arrow-up-thin"}
              iconColor={backgroundColor}
              size={40}
              backgroundColor={color}
            />
            <View style={styles.amount}>
              <AppText style={[styles.title, { color: color }]}>
                Rs.
                {Math.abs(
                  entriesParticularSum.totalIncome -
                    entriesParticularSum.totalExpenses
                ).toLocaleString()}
              </AppText>
              <AppText style={[styles.subTitle, { color: color }]}>
                I have to{" "}
                {entriesParticularSum.totalIncome -
                  entriesParticularSum.totalExpenses >=
                0
                  ? "receive"
                  : "give"}
              </AppText>
            </View>
          </View>
        </View>
      </Screen>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalUpdateParticular}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalUpdateParticular(!modalUpdateParticular)}
          ></TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.dash} />
            <AppText style={styles.modalHeader}>Add Ledger</AppText>
            <AppTextInputDynamic
              onChangeText={setChangeParticularName}
              value={changeParticularName}
              icon={"book-open-page-variant-outline"}
              placeholder={"Name of customer"}
            />
            <AppButton
              title={"Update"}
              onPress={() => updatingParticularName(changeParticularName)}
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
  clientInfoContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  amountInfoContainer: {
    position: "absolute",
    top: 120,
    height: 80,
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    elevation: 20,
  },
  content: {
    height: "80%",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
  },
  name: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  amount: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.expense,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.expense,
  },
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    width: "100%",
    height: "100%",
    // alignItems: "center",
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
});

export default DetailRecordScreen;
