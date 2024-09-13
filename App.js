import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { StyleSheet, Text, View } from "react-native";

import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";

import LedgerInfoScreen from "./app/screens/LedgerInfoScreen";
import LogoContainer from "./app/components/LogoContainer";
import DetailRecordScreen from "./app/screens/DetailRecordScreen";
import EntryLedgerScreen from "./app/screens/EntryLedgerScreen";
import CalculatorScreen from "./app/components/CalculatorScreen";
import CalculatorComponent from "./app/components/CalculatorComponent";
import ReceiptInfoScreen from "./app/screens/ReceiptInfoScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterationScreen from "./app/screens/RegisterationScreen";
import LoginScreen from "./app/screens/LoginScreen";
import AddNewParticipants from "./app/screens/AddNewParticipants";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import ManageEntryScreen from "./app/screens/ManageEntryScreen";
import TestingScreen from "./app/screens/TestingScreen";
import AppNavigator from "./app/navigation/AppNavigator";
import ProfileScreen from "./app/screens/ProfileScreen";
import InviteLedgerScreen from "./app/screens/InviteLedgerScreen";
import ScreenNavigator from "./app/navigation/MainNavigator";
import MainNavigator from "./app/navigation/MainNavigator";

export default function App() {
  const [user, setUser] = useState();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    // <LedgerInfoScreen />
    // <DetailRecordScreen />
    // <EntryLedgerScreen />
    // <ReceiptInfoScreen />
    // <WelcomeScreen />
    // <RegisterationScreen />
    // <LoginScreen />
    // <AddNewParticipants />
    // <ManageEntryScreen />
    // <TestingScreen />
    // <ProfileScreen />
    // <InviteLedgerScreen />

    // <CalculatorComponent />
    // <CalculatorScreen />

    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <MainNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>

    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>

    // <NavigationContainer theme={navigationTheme}>
    //   <AuthNavigator />
    // </NavigationContainer>

    // <NavigationContainer theme={navigationTheme}>
    //   <AppNavigator />
    // </NavigationContainer>
  );
}
