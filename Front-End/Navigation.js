import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./Navigation/AuthStackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomNavigation from "./Navigation/BottomNavigation";

//import BottomNavigation from "./Navigation/BottomNavigation"
// import DrawerNavigation from "./Navigation/DrawerNavigation";
import { useSelector } from "react-redux";
export default function Navigation() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuth ? <BottomNavigation /> : <AuthStackNavigation />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
