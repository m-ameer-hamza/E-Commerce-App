import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Image,
} from "react-native";

import React from "react";

import { TextInput, Button, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoader from "../Components/ActivityLoader";
import ActivityLoading from "../Components/ActivityLoading";
import { Keyboard } from "react-native";

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

    if (email === "" || password === "") {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    await loginFunc(email, password);
    setLoading(false);
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <LogoComponent />
          </View>

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
              disabled={loading}
              onPress={() => {
                Keyboard.dismiss();
                loginUser();
              }}
              mode="contained"
              textColor="white"
              rippleColor="#b88d63"
              buttonColor="#f58d25"
              style={{
                width: "55%",
                borderRadius: 10,
                alignItems: "center",
                padding: 3,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
                Login
              </Text>
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
                    marginTop: 5,
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#4285f4", // Google blue color
              borderRadius: 5,
              paddingVertical: 10,

              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
              alignSelf: "center",
              marginTop: 50,
              borderWidth: 1,
              borderColor: "#fff",
              marginBottom: 30,
            }}
            onPress={() => console.log("Sign In with Google pressed")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/googleLogo.png")}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                  backgroundColor: "#fff",
                  borderRadius: 12,
                }}
              />
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Sign In with Google
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      {loading && <ActivityLoading />}
    </PaperProvider>
  );
};

export default Login;

const styles = StyleSheet.create({});
