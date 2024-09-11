import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LedgerInfoScreen from "../screens/LedgerInfoScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    options={{
      headerShown: false,
    }}
  >
    {/* <Tab.Screen
      name="Accout"
      component={AccountProfileScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Dashboard"
      component={LedgerInfoScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="chart-areaspline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Income"
      component={ProfileScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="arrow-down-bold-circle"
            color={color}
            size={size}
          />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Budget"
      component={BudgetScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="clipboard-text"
            color={color}
            size={size}
          />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

export default AppNavigator;
