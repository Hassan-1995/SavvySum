import React from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import HeaderComponent from "../components/HeaderComponent";
import Gradient from "../components/Gradient";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import CustomerTransactionTable from "../components/CustomerTransactionTable";
import AppButton from "../components/AppButton";

const { width, height } = Dimensions.get("window");

const transactions = [
  {
    date: "2024-09-01 10:30",
    description: "Payment Received",
    placeholder: "", // This will be left for your customization
    debit: "5000",
    credit: "0",
  },
  {
    date: "2024-09-02 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  {
    date: "2024-09-02 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  {
    date: "2024-09-02 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  {
    date: "2024-09-02 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  {
    date: "2024-09-03 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  {
    date: "2024-09-03 11:00",
    description: "Purchase",
    placeholder: "",
    debit: "0",
    credit: "2000",
  },
  // Add more transaction objects as needed
];

function DetailRecordScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.content}>
        {/* <ScrollView> */}
        <View style={{ marginTop: "10%" }} />
        <CustomerTransactionTable transactions={transactions} />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ width: "45%" }}>
            <AppButton
              color="income"
              title={"Received"}
              onPress={() =>
                navigation.navigate("New Transaction Entry", {
                  title: "received",
                })
              }
            />
          </View>
          <View style={{ width: "45%" }}>
            <AppButton
              color="expense"
              title={"Gave"}
              onPress={() =>
                navigation.navigate("New Transaction Entry", { title: "gave" })
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
          <AppText style={styles.name}>Hammad Ahmed </AppText>
        </View>
        <View style={styles.amountInfoContainer}>
          <Icon
            name={"arrow-up-thin"}
            iconColor={colors.red}
            size={40}
            backgroundColor={colors.expense}
          />
          <View style={styles.amount}>
            <AppText style={styles.title}>Rs. 100,000 </AppText>
            <AppText style={styles.subTitle}>I have to give</AppText>
          </View>
        </View>
      </View>
    </Screen>
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
    backgroundColor: colors.red,
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
});

export default DetailRecordScreen;
