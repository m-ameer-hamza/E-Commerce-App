import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedItems from "../Screens/LikedItems";
import ProductDetails from "../Screens/ProductInfo";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function LikedItemStack() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LikedItems"
        options={{
          headerShown: false,
        }}
        component={LikedItems}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
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
                  onPress={() => navigation.navigate("LikedItems")}
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
    </Stack.Navigator>
  );
}
