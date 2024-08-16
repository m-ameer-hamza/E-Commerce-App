import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedItems from "../Screens/LikedItems";
export default function LikedItemStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LikedItems"
        options={{
          headerShown: false,
        }}
        component={LikedItems}
      />
    </Stack.Navigator>
  );
}
