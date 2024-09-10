import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterationScreen from "../screens/RegisterationScreen";
import LedgerInfoScreen from "../screens/LedgerInfoScreen";
import DetailRecordScreen from "../screens/DetailRecordScreen";
import AddNewParticipants from "../screens/AddNewParticipants";
import EntryLedgerScreen from "../screens/EntryLedgerScreen";
import ManageEntryScreen from "../screens/ManageEntryScreen";
import ReceiptInfoScreen from "../screens/ReceiptInfoScreen";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Ledger Screen" component={LedgerInfoScreen} />
    <Stack.Screen name="Detail Screen" component={DetailRecordScreen} />
    <Stack.Screen name="Add Member" component={AddNewParticipants} />
    <Stack.Screen name="New Transaction Entry" component={EntryLedgerScreen} />
    <Stack.Screen name="Manage Entry" component={ManageEntryScreen} />
    <Stack.Screen name="Receipt" component={ReceiptInfoScreen} />

    <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
    <Stack.Screen name="Login Screen" component={LoginScreen} />
    <Stack.Screen name="Register Screen" component={RegisterationScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
