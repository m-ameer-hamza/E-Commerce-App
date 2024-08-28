import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";

import {
  TextInput,
  Button,
  PaperProvider,
  RadioButton,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../Components/Logo";
import validator from "validator";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoading from "../Components/ActivityLoading";
import GoogleLogo from "../assets/googleLogo.png";
import { GOOGLE_CLIENT_ID } from "../Global";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpFunc, navigate } = authHandlers();

  const [isValideEmail, setIsValideEmail] = useState(true);
  const [isValidePassword, setIsValidePassword] = useState(true);
  const [isValideName, setIsValideName] = useState(true);
  const [usrInfo, setUsrInfo] = useState(null);
  const [signUpAs, setSignUpAs] = useState(null);

  const [isPassSecure, setIsPassSecure] = useState(true);
  const [passIcon, setPassIcon] = useState("eye");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true, // Enables refreshing tokens
      forceCodeForRefreshToken: true, // Forces a refresh token
      prompt: "select_account", // Ensures the account picker is shown every time
    });
  }, []);

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

  useEffect(() => {
    console.log("Navigate", navigate);
    if (navigate) {
      console.log("Navigate to Email Verification");
      navigation.navigate("EmailVerification", {
        email: email,
        reSendOtp: "not-send",
        navigateTo: "Login",
      });
    }
  }, [navigate]);

  const SignUp = async () => {
    let valide = validateInput();
    if (valide) {
      //send data to server

      setLoading(true);
      await signUpFunc(name, email, password, signUpAs);

      //clear the input fields
      setEmail("");
      setPassword("");
      setName("");
      setLoading(false);

      setLoading(false);
    } else {
      alert("Please enter valid data from Sign Up");
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  // Somewhere in your code
  const googleSignUp = async () => {
    if (signUpAs === null) {
      alert("Please select the user type");
      return;
    }

    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log("Google Sign-Up initiated", userInfo);
      setUsrInfo(userInfo);

      //send the user info to password Screen
      if (userInfo) {
        navigation.navigate("GLoginPassword", {
          userInfo: userInfo,
          userType: signUpAs,
        });
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

  // const googleSignOut = async () => {
  //   try {
  //     console.log("Google Sign-Out initiated");
  //     await GoogleSignin.revokeAccess(); // Optional: Revokes access to the current token
  //     await GoogleSignin.signOut(); // Sign out the user
  //     setUsrInfo(null); // Clear user info from state
  //     console.log("User signed out successfully");
  //   } catch (error) {
  //     console.log("An error occurred during sign-out:", error);
  //   }
  // };

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
              secureTextEntry={isPassSecure}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter Password"
              right={
                <TextInput.Icon
                  icon={passIcon}
                  onPress={() => {
                    if (passIcon === "eye") {
                      setPassIcon("eye-off");
                    } else {
                      setPassIcon("eye");
                    }
                    setIsPassSecure(!isPassSecure);
                  }}
                />
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Register As:{" "}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Buyer</Text>
              <RadioButton
                value="buyer"
                color="#f58d25"
                status={signUpAs === "buyer" ? "checked" : "unchecked"}
                onPress={() => setSignUpAs("buyer")}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Seller</Text>
              <RadioButton
                color="#f58d25"
                value="seller"
                status={signUpAs === "seller" ? "checked" : "unchecked"}
                onPress={() => setSignUpAs("seller")}
              />
            </View>
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
                Keyboard.dismiss();
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
            disabled={loading}
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
            onPress={async () => {
              Keyboard.dismiss();
              await googleSignUp();
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
                Sign Up with Google
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
