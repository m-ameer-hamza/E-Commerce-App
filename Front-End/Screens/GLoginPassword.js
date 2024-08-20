import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { TouchableRipple, TextInput, Button } from "react-native-paper";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import { authHandlers } from "../Handlers/authHandler";

import LogoComponent from "../Components/Logo";

export default function GLoginPassword({ route }) {
  const { signUpFunc, navigate } = authHandlers();

  //getting email from previous screen
  const { userInfo, userType } = route.params;

  const [password, setPassword] = useState("");
  const [isValidePassword, setValidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  //for navigation to next screen
  const navigation = useNavigation();

  const SignUpPassHandler = async () => {
    if (password.length < 6) {
      setValidePassword(false);
      return;
    }
    setValidePassword(true);

    setLoading(true);
    setPassword("");
    await signUpFunc(
      userInfo.user?.name,
      userInfo.user.email,
      password,
      userType,
      "google"
    );

    setLoading(false);
  };

  useEffect(() => {
    if (navigate) {
      navigation.navigate("Login");
    }
  }, [navigate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: "8%",
        flexDirection: "column",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <LogoComponent />
      </View>
      <View>
        <Text style={{ fontSize: 18, textAlign: "center", color: "black" }}>
          Enter Password
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "black",
            fontWeight: "400",
            letterSpacing: 1,
          }}
        >
          It will belong to this app
        </Text>
      </View>
      <View style={{ marginTop: 50, alignItems: "center" }}>
        {!isValidePassword && (
          <Text
            style={{
              color: "red",
              marginBottom: 10,
              paddingHorizontal: 20,
              alignSelf: "flex-start",
            }}
          >
            *Invalide password
          </Text>
        )}
        <TextInput
          value={password}
          contentStyle={{
            fontSize: 16,
            letterSpacing: 1.3,
          }}
          onChangeText={(text) => setPassword(text)}
          error={isValidePassword ? false : true}
          secureTextEntry={true}
          style={{ borderRadius: 10, width: "87%" }}
          mode="outlined"
          outlineColor="#D0D0D0"
          activeOutlineColor="#041E42"
          label="Enter Password"
        />
      </View>

      <View
        style={{
          marginTop: 40,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={loading}
          onPress={async () => {
            await SignUpPassHandler();
          }}
          mode="contained"
          textColor="white"
          rippleColor="#b88d63"
          buttonColor="#f58d25"
          contentStyle={{
            fontSize: 16,
            letterSpacing: 1.3,
            fontWeight: "500",
          }}
          style={{
            marginTop: 15,
            width: "55%",
            borderRadius: 10,
            alignItems: "center",
            padding: 3,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
            Sign Up
          </Text>
        </Button>
      </View>
    </View>
  );
}
