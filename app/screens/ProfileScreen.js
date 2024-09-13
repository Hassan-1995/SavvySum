import React, { useContext, useEffect, useState } from "react";

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

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import DateFormat from "../components/DateFormat";

const { width, height } = Dimensions.get("window");

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

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
            setUser(null);
            authStorage.removeToken();
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
          <AppText style={styles.info}>{user.user_name}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.label}>Mobile Number</AppText>
          <AppText style={styles.info}>{user.mobile_phone_number}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.label}>Created At</AppText>
          <AppText style={styles.info}>
            {DateFormat(new Date(user.created_at).toISOString().split("T")[0])}
          </AppText>
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
          <AppText style={styles.screenName}>User Profile </AppText>
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

export default ProfileScreen;
