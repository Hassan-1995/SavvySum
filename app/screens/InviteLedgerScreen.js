import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import colors from "../config/colors";
import HeaderComponent from "../components/HeaderComponent";
import AppText from "../components/AppText";

const { width, height } = Dimensions.get("window");

function InviteLedgerScreen({ navigation }) {
  const name = "John Doe"; // This can be fetched from your user data or API
  const mobileNumber = "+1 123 456 7890"; // Fetched from user data
  const createdAt = "2023-09-10"; // Can be retrieved from user data or API

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Perform logout logic here
            console.log("User logged out");
            navigation.navigate("Login Screen"); // Navigate to login screen after logging out
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <AppText style={styles.label}>Name</AppText>
          <AppText style={styles.info}>{name}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.label}>Mobile Number</AppText>
          <AppText style={styles.info}>{mobileNumber}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.label}>Created At</AppText>
          <AppText style={styles.info}>{createdAt}</AppText>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AppText style={styles.logoutText}>Log Out</AppText>
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
        <View style={styles.summaryContainer}>
          <AppText style={styles.screenName}>Account Books</AppText>
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
  summaryContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  screenName: {
    fontSize: 28, // Larger font size for the header
    fontWeight: "bold", // Bold text to make it stand out
    color: colors.white, // Assuming you have a primary color in your config
    textAlign: "center", // Center the header
    marginVertical: 20, // Space above and below the header
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
    padding: 20,
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary, // assuming you have a primary color in config
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    color: colors.secondary, // assuming you have a secondary color in config
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: colors.danger, // a color for danger (red) for the logout button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InviteLedgerScreen;
