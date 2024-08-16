import { Text, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
import UpdateUserName from "../Screens/UpdateUserName";
import UpdatePassword from "../Screens/UpdatePassword";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ProfileStackNavigation() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />

      <Stack.Screen
        name="UpdateUserName"
        component={UpdateUserName}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.toback()}
            >
              <Icon source="arrow-left" size={30} iconColor="#000" />
              {/* Adjust the size here */}
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#AFEEEE",
            height: 70,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
        })}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
