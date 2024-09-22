import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";

import TestingScreen from "./app/screens/TestingScreen";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

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
    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <MainNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>

    // <TestingScreen />

    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AuthNavigator /> */}
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
