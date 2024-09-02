import { StyleSheet } from "react-native";
import React from "react";
import { Icon, Badge } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import CartStackNavigation from "./CartStackNavigation";

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f9f9f9",
          height: 55,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          letterSpacing: 1.2,
          fontWeight: "500",
        },
        tabBarActiveTintColor: "#00b2b5", // Active icon color
        tabBarInactiveTintColor: "#858585", // Inactive icon color
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CartStack") {
            iconName = focused ? "cart" : "cart-outline";
          }

          return <Icon source={iconName} size={35} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen
        options={{
          tabBarLabel: "Cart",
        }}
        name="CartStack"
        component={CartStackNavigation}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
