import React from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import HeaderComponent from "../components/HeaderComponent";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

function ReceiptInfoScreen(props) {
  return (
    <Screen>
      <View style={styles.content}>
        <View style={{ marginTop: "10%" }} />
        <AppText style={styles.heading}>PAYMENT RECEIPT</AppText>

        <View style={styles.card}>
          <AppText style={styles.cardHeading}>Payment receipt</AppText>
          <AppText style={styles.cardSubheading}>8:17 PM 3rd Sept, 24</AppText>
          <View style={styles.ribbon}>
            <View style={{ padding: 20 }}>
              <AppText style={{ color: colors.white, fontWeight: "bold" }}>
                You gave
              </AppText>
              <AppText
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                Rs. 1,000
              </AppText>
            </View>

            <Image
              style={styles.receiptImage}
              source={require("../assets/receipt.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AppText style={{ fontWeight: "bold" }}>Ledger Name</AppText>
            <Image
              style={styles.logo}
              source={require("../assets/LogoNameWithColors.png")}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "flex-end",
            padding: 20,
          }}
        >
          <Icon
            // name={"whatsapp"}
            name={"share-variant-outline"}
            size={50}
            // iconColor="#25D366"
            iconColor={colors.primary}
            backgroundColor="transparent"
          />
          <AppText>Share</AppText>
        </TouchableOpacity>
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
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity>
            <Icon
              name={"arrow-left-drop-circle-outline"}
              size={50}
              backgroundColor="transparent"
            />
          </TouchableOpacity>
          <AppText style={styles.receipt}>I received</AppText>

          <TouchableOpacity style={styles.deleteButton}>
            <Icon
              name={"trash-can-outline"}
              size={40}
              backgroundColor="transparent"
              iconColor={colors.red}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.amountInfoContainer}>
          <Icon
            name={"arrow-down-thin"}
            iconColor={colors.green}
            size={40}
            backgroundColor={colors.income}
          />
          <View style={styles.amount}>
            <AppText style={styles.title}>Rs. 1,000 </AppText>
            <AppText style={styles.subTitle}>1st Sept, 24</AppText>
          </View>
          <TouchableOpacity style={styles.edit}>
            <Icon
              name={"circle-edit-outline"}
              iconColor={colors.income}
              size={50}
              backgroundColor="transparent"
            />
          </TouchableOpacity>
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
  subHeaderContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  receipt: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  deleteButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  amountInfoContainer: {
    position: "absolute",
    top: 120,
    height: 80,
    width: "90%",
    backgroundColor: colors.green,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    elevation: 20,
  },
  amount: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.income,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.income,
  },
  edit: {
    flex: 1,
    alignItems: "flex-end",
  },
  content: {
    height: height * 0.8,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    top: height * 0.2,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
    color: colors.medium,
  },
  card: {
    width: "95%",
    alignSelf: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 0,
    borderRadius: 15,
    backgroundColor: colors.light,
    elevation: 20,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
  },
  cardSubheading: {
    fontSize: 16,
    color: colors.medium,
    marginVertical: 5,
  },
  ribbon: {
    width: "90%",
    flexDirection: "row",
    // padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.income,
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  receiptImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default ReceiptInfoScreen;
