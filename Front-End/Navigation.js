import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./Navigation/AuthStackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerNavigation from "./Navigation/DrawerNavigation";
import { PaperProvider } from "react-native-paper";
import ActivityLoading from "./Components/ActivityLoading";
import { useSelector } from "react-redux";
export default function Navigation() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.settings.loading);

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuth ? <DrawerNavigation /> : <AuthStackNavigation />}
        </NavigationContainer>
      </GestureHandlerRootView>
      {isLoading ? <ActivityLoading /> : null}
    </PaperProvider>
  );
}
