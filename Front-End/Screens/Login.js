import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Image,
} from "react-native";

import React, { useEffect } from "react";

import { TextInput, Button, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import { authHandlers } from "../Handlers/authHandler";

import ActivityLoading from "../Components/ActivityLoading";
import GoogleLogo from "../assets/googleLogo.png";
import { Keyboard } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_CLIENT_ID } from "../Global";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true, // Enables refreshing tokens
      forceCodeForRefreshToken: true, // Forces a refresh token
      prompt: "select_account", // Ensures the account picker is shown every time
    });
  }, []);

  const navigation = useNavigation();
  const { loginFunc, googleLoginFunc } = authHandlers();

  const loginUser = async () => {
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

  const googleLogin = async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      //send the user info to password Screen
      if (userInfo) {
        await googleLoginFunc(userInfo.user.email);
      } else {
        alert("Probelm in Google Sign-Up");
      }
      setLoading(false);
    } catch (error) {
      console.log("Google Sign-Up initiated", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoading(false);
        alert("User cancelled the sign-in");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Cancelled the Signin in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services not available or outdated");
      } else {
        alert("Something went wrong", error);
        console.log("An unknown error occurred:", error);
      }
    }
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
            disabled={loading}
            onPress={() => {
              Keyboard.dismiss();
              googleLogin();
            }}
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
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={GoogleLogo}
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
