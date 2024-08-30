import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ViewOrders from "../Screens/ViewOrders";
import ViewOrderInfo from "../Screens/ViewOrderInfo";
import CartStack from "./CartStackNavigation";
import BottomNavigation from "./BottomNavigation";

export default function ProfileStackNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewOrder"
        options={{
          headerTitle: () => null,

          header: () => (
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: "#AFEEEE",
                alignItems: "center",
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
            >
              <IconButton
                icon="menu"
                iconColor="#000"
                size={30}
                onPress={() => navigation.toggleDrawer()}
              />
              <Text style={{ fontSize: 25, fontWeight: "500" }}> Orders </Text>
            </Pressable>
          ),
        }}
        component={ViewOrders}
      />

      <Stack.Screen
        name="ViewOrderInfo"
        options={{
          headerStyle: {
            backgroundColor: "#afeeee",

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
                    marginLeft: 2,
                    fontSize: 25,
                    fontWeight: "400",
                    letterSpacing: 0.4,
                  }}
                >
                  Order Info
                </Text>
              </View>
            );
          },
        }}
        component={ViewOrderInfo}
      />
    </Stack.Navigator>
  );
}
