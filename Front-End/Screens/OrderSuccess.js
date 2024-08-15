import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import LottieView from "lottie-react-native";

import { useNavigation } from "@react-navigation/native";
const OrderSuccess = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          width: 300,
          height: 260,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay={true}
        loop={true}
        speed={0.5}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has Been Received
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          width: 300,
          alignSelf: "center",
          position: "absolute",
          top: 100,
        }}
        autoPlay={true}
        loop={false}
        speed={0.7}
      />
    </View>

    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ fontSize: 20, fontWeight: "bold" }}>
    //     Your Order Has Been Received
    //   </Text>
    // </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({});
