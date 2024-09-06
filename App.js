import { StyleSheet, Text, View } from "react-native";
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

export default function App() {
  return (
    // <LedgerInfoScreen />
    // <DetailRecordScreen />
    // <EntryLedgerScreen />
    // <ReceiptInfoScreen />
    // <WelcomeScreen />
    // <RegisterationScreen />
    // <LoginScreen />
    // <AddNewParticipants/>

    // <CalculatorComponent />
    // <CalculatorScreen />

    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
