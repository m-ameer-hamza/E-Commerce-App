import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Main from "../Screens/Main";
import ProductInfo from "../Screens/ProductInfo";
import { Ionicons } from "@expo/vector-icons";
import Address from "../Screens/Address";
import { Searchbar } from "react-native-paper";
import { useState } from "react";
import AddNewAddress from "../Screens/AddNewAddress";
import OrderConfirm from "../Screens/OrderConfirm";

export default function HomeStackNavigation() {
  const Stack = createNativeStackNavigator();

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{
          headerStyle: {
            backgroundColor: "#00CED1",

            shadowColor: "#AFEEEE",
            elevation: 2,
            shadowOpacity: 0.8,
            borderBottomWidth: 1,
          },
          headerTitle: () => null,

          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 10 }}
                >
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 22,
                    letterSpacing: 0.8,
                  }}
                >
                  Product Info
                </Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerStyle: {
            backgroundColor: "#00CED1",

            shadowColor: "#AFEEEE",
            elevation: 2,
            shadowOpacity: 0.8,
            borderBottomWidth: 1,
          },
          headerTitle: () => null,

          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 10 }}
                >
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                  <Searchbar
                    style={{
                      width: "70%",
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    textAlignVertical="center"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
