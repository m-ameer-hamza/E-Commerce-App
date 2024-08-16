import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import CustomeDrawerContent from "../Components/CustomeDrawerContent";
import Settings from "../Screens/Settings";
import ProfileStackNavigation from "../Navigation/ProfileStackNavigation";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
export default function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomeDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{
          headerShown: false,
          headerTitle: "Home",
        }}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon source="menu" size={30} iconColor="#000" />
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
        name="Settings"
        component={Settings}
      />
      <Drawer.Screen
        name="ProfileStack"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
        component={ProfileStackNavigation}
      />
    </Drawer.Navigator>
  );
}