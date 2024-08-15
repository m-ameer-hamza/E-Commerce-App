import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";

import { TextInput, Button, PaperProvider, Icon } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import validator from "validator";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoading from "../Components/ActivityLoading";
import ActivityLoader from "../Components/ActivityLoader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpFunc } = authHandlers();

  const [isValideEmail, setIsValideEmail] = useState(true);
  const [isValidePassword, setIsValidePassword] = useState(true);
  const [isValideName, setIsValideName] = useState(true);

  const validateInput = () => {
    const trimmedName = name.replace(/\s+/g, "");
    if (validator.isAlpha(trimmedName)) {
      // setIsValide((prevState) => ({ ...prevState, name: true }));
      setIsValideName(true);

      // console.log("name valide state", isValide.name);

      // console.log("name is valid", name);
    } else {
      console.log("name is not valid", name);
      // setIsValide({ ...isValide, name: false });
      console.log("name valide state", isValideEmail);
      setIsValideName(false);
      return false;
    }

    if (validator.isEmail(email)) {
      // setIsValide({ ...isValide, email: true });
      setIsValideEmail(true);
    } else {
      //setIsValide({ ...isValide, email: false });
      setIsValideEmail(false);
      return false;
    }

    if (password.length > 5) {
      // setIsValide({ ...isValide, password: true });
      // console.log("password is valid", password);
      setIsValidePassword(true);
    } else {
      // setIsValide({ ...isValide, password: false });
      // console.log("password is not valid", password);
      setIsValidePassword(false);
      return false;
    }
    return true;
  };

  const SignUp = async () => {
    let valide = validateInput();
    if (valide) {
      //send data to server

      setLoading(true);
      let success = await signUpFunc(name, email, password);
      setLoading(false);

      //clear the input fields
      setEmail("");
      setPassword("");
      setName("");
      if (success) {
        navigation.navigate("EmailVerification", { email: email });
      }
    } else {
      alert("Please enter valid data from Sign Up");
    }
  };

  const navigation = useNavigation();

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <LogoComponent />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",

                color: "#041E42",
                letterSpacing: 1.2,
              }}
            >
              Register a new account
            </Text>
            {isValideEmail ? null : (
              <Text
                style={{
                  color: "red",
                  marginBottom: -20,
                  marginTop: 5,
                  letterSpacing: 0.7,
                }}
              >
                *Enter Valide Email Address
              </Text>
            )}
            {isValideName ? null : (
              <Text
                style={{
                  color: "red",
                  marginBottom: -20,
                  marginTop: 5,
                  letterSpacing: 0.7,
                }}
              >
                *Enter Valide User Name
              </Text>
            )}

            {isValidePassword ? null : (
              <Text
                style={{
                  color: "red",
                  marginBottom: -20,
                  marginTop: 5,
                }}
              >
                *Password must be 6 characters long
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              gap: 25,
            }}
          >
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              error={isValideName ? false : true}
              label="Enter your name"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ borderRadius: 10, width: "80%" }}
              error={isValideEmail ? false : true}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter Email"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
            />

            <TextInput
              value={password}
              contentStyle={{
                fontSize: 16,
                letterSpacing: 1.3,
              }}
              onChangeText={(text) => setPassword(text)}
              error={isValidePassword ? false : true}
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
              marginTop: 40,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={loading}
              onPress={async () => {
                await SignUp();
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
                {" "}
                Register
              </Text>
            </Button>
            <Text style={{ marginTop: 15, fontSize: 16 }}>
              Already have an account?
              <Pressable
                onPress={() => navigation.goBack()}
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
                  Sign In
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

export default SignUp;

const styles = StyleSheet.create({});
