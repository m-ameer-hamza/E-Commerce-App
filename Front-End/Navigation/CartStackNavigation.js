import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import OrderConfirm from "../Screens/OrderConfirm";
import Cart from "../Screens/Cart";
import OrderSuccess from "../Screens/OrderSuccess";

const CartStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CartStackNavigation;

const styles = StyleSheet.create({});
