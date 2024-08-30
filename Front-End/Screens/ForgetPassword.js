import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";

import { TextInput, Button, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import validator from "validator";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoading from "../Components/ActivityLoading";

const FogetPassword = () => {
  const [email, setEmail] = useState("");
  const { regenOTPFunc, navigate } = authHandlers();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const forgetPasswordEmail = () => {
    setLoading(true);
    Keyboard.dismiss();
    //1)- Check if email is valid

    if (!validator.isEmail(email)) {
      alert("Please enter a valid email");
      setIsError(true);
      setLoading(false);
      return;
    }
    setIsError(false);

    regenOTPFunc(email);
    setLoading(false);

    alert("OTP sent to your email");
  };

  useEffect(() => {
    if (navigate) {
      navigation.navigate("EmailVerification", {
        email: email,
        navigateTo: "NewPassword",
      });
    }
  }, [navigate]);

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
        <LogoComponent />
        <KeyboardAvoidingView style={{ width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 2,
                color: "#041E42",
                letterSpacing: 1.2,
              }}
            >
              Password Recovery
            </Text>
          </View>
          <View
            style={{
              marginTop: 70,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              gap: 20,
            }}
          >
            <TextInput
              value={email}
              error={isError}
              disabled={loading}
              onChangeText={(text) => setEmail(text)}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter Email"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
            />
            {isError && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,

                  marginTop: -12,
                }}
              >
                *Please enter a valid email
              </Text>
            )}
          </View>

          <View
            style={{
              marginTop: 70,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                forgetPasswordEmail();
              }}
              mode="contained"
              textColor="white"
              rippleColor="#b88d63"
              buttonColor="#fe8710"
              contentStyle={{
                fontSize: 16,
                letterSpacing: 1.3,
                fontWeight: "500",
              }}
              style={{
                width: "50%",
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              Send OTP
            </Button>
            <Text style={{ marginTop: 15, fontSize: 16 }}>
              Don't have an account?
              <Pressable
                onPress={() => navigation.navigate("SignUp")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingLeft: 5,
                    color: "#007fff",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
      {loading && <ActivityLoading />}
    </PaperProvider>
  );
};

export default FogetPassword;

const styles = StyleSheet.create({});
