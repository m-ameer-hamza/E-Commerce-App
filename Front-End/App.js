import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, View, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import store from "./Redux/store";
import Navigation from "./Navigation";

import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "./Global";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}

      <Provider store={store}>
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <Navigation />
        </StripeProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Platform.OS === "android" ? 5 : 0,
  },
});
