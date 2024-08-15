import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

import React from "react";

import { TextInput, Button, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoader from "../Components/ActivityLoader";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { loginFunc } = authHandlers();

  const loginUser = async () => {
    //send email and password to server for verification.
    //here is the code to verify
    //after verification navigate to next screen
    setLoading(true);
    setEmail("");
    setPassword("");

    await loginFunc(email, password);
    setLoading(false);
  };

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
              Login to your account
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
              onChangeText={(text) => setEmail(text)}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter Email"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
            />

            <TextInput
              value={password}
              contentStyle={{ fontSize: 16, letterSpacing: 1.3 }}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter Password"
            />
          </View>
          <View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "10%",
            }}
          >
            <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
              <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                Forget Password?
              </Text>
            </Pressable>
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
              onPress={() => loginUser()}
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
              Login
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
      {loading && <ActivityLoader />}
    </PaperProvider>
  );
};

export default Login;

const styles = StyleSheet.create({});
