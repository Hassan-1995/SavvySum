import React, { useContext, useEffect, useRef, useState } from "react";
import ledgersApi from "../api/ledgers";
import additionalFunctionsApi from "../api/additionalFunctions";

import * as Sharing from "expo-sharing";

import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import Screen from "../components/Screen";
import Gradient from "../components/Gradient";
import colors from "../config/colors";
import HeaderComponent from "../components/HeaderComponent";
import AppText from "../components/AppText";
import LedgerShareComponent from "../components/LedgerShareComponent";
import AuthContext from "../auth/context";
import AppTextInputDynamic from "../components/AppTextInputDynamic";

const { width, height } = Dimensions.get("window");

function InviteLedgerScreen({ navigation }) {
  // Create an array of refs, one for each ledger
  const viewShotRefs = useRef([]);
  const { user } = useContext(AuthContext); // variable for logged user

  const [userLedgers, setUserLedgers] = useState([]); // load all ledgers by particual user_id
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  useEffect(() => {
    loadLedgerTable();
  });

  const handleTextChange = (input) => {
    setText(input);

    // Enable button only when the input has exactly 10 characters
    if (input.length === 10) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const handleSubmit = async () => {
    setSubmittedText(text);

    setLoading(true);
    try {
      const response =
        await additionalFunctionsApi.shareCopyOfLedgerWithAccessKey(
          user.user_id,
          text
        );
    } catch (error) {
      console.error("Error loading ledger data with access key:", error);
    } finally {
      loadLedgerTable();
      setLoading(false);
      setText("");
    }
  };

  const loadLedgerTable = async () => {
    setLoading(true);
    try {
      const response = await ledgersApi.getAllLedgersByUserID(user.user_id);
      setUserLedgers(response);
    } catch (error) {
      console.error("Error loading ledger data with access key:", error);
    } finally {
      setLoading(false);
    }
  };
  // Handle sharing based on the ledger index
  const handleShare = async (index, item) => {
    console.log("Ledger_ID", item.ledger_id);
    console.log("User_ID", item.access_key);

    try {
      const uri = await viewShotRefs.current[index].capture(); // Capture the image from the corresponding viewShotRef
      // console.log("Captured Image URI:", uri);
      await Sharing.shareAsync(uri); // Share the image
    } catch (error) {
      console.error("Error while sharing:", error);
    }
  };

  return (
    <Screen>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.accessKey}>
            <AppTextInputDynamic
              value={text}
              onChangeText={handleTextChange}
              autoCapitalize="none"
              placeholder="Add ledger access key"
              maxLength={10}
            />
            <Button
              title="Submit"
              color={colors.primary}
              onPress={handleSubmit}
              disabled={!buttonEnabled}
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            {userLedgers ? (
              userLedgers.map((item, index) => (
                <LedgerShareComponent
                  key={item.ledger_id}
                  viewShotRef={(el) => (viewShotRefs.current[index] = el)} // Assign each ViewShot ref
                  handleShare={() => handleShare(index, item)} // Handle share for each ledger
                  ledgerName={item.ledger_name}
                  authKey={item.access_key}
                />
              ))
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
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
  accessKey: {
    flex: 1,
    justifyContent: "center",
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    position: "absolute",
    bottom: 0,
    // padding: 20,
    // paddingTop: 20,
    paddingHorizontal: 20,
    top: height * 0.2,
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
