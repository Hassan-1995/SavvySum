import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
// import HomeScreen from "../screens/HomeScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import ShareLedgerScreen from "../screens/ShareLedgerScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// import AboutScreen from "../screens/AboutScreen";
// import LogoutScreen from "../screens/LogoutScreen";
import LedgerInfoScreen from "../screens/LedgerInfoScreen";
import DetailRecordScreen from "../screens/DetailRecordScreen";
import AddNewParticipants from "../screens/AddNewParticipants";
import EntryLedgerScreen from "../screens/EntryLedgerScreen";
import ManageEntryScreen from "../screens/ManageEntryScreen";
import ReceiptInfoScreen from "../screens/ReceiptInfoScreen";

// Create Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for other screens
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Ledger Screen" component={LedgerInfoScreen} />
    <Stack.Screen name="Detail Screen" component={DetailRecordScreen} />
    <Stack.Screen name="Add Member" component={AddNewParticipants} />
    <Stack.Screen name="New Transaction Entry" component={EntryLedgerScreen} />
    <Stack.Screen name="Manage Entry" component={ManageEntryScreen} />
    <Stack.Screen name="Receipt" component={ReceiptInfoScreen} />
  </Stack.Navigator>
);

// Main Drawer Navigation
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={LedgerInfoScreen} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Share Ledger" component={ShareLedgerScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
