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

const ResetPassword = ({ route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewPassSecure, setIsNewPassSecure] = useState(true);
  const [newPassIcon, setNewPassIcon] = useState("eye-off");
  const [isConfirmPassSecure, setIsConfirmPassSecure] = useState(true);
  const [confirmPassIcon, setConfirmPassIcon] = useState("eye-off");
  const [isShortPassError, setIsShortPassError] = useState(false);
  const [isWeakPassError, setIsWeakPassError] = useState(false);

  const navigation = useNavigation();
  const { email } = route.params;
  const { resetPasswordFunc, navigate } = authHandlers();

  const updatePassword = async () => {
    setLoading(true);
    if (confirmPassword !== newPassword) {
      setIsError(true);
      setLoading(false);
      return;
    }
    setIsError(false);
    if (newPassword.length < 8) {
      setIsShortPassError(true);
      setLoading(false);
      return;
    }
    setIsShortPassError(false);

    console.log("Password Reset", passAlphaNumeric(newPassword));

    if (passAlphaNumeric(newPassword)) {
      console.log("Inside PassAlphaNumeric");
      setIsWeakPassError(true);
      setLoading(false);
      return;
    }
    setIsWeakPassError(true);
    //update password
    // await updatePasswordFunc(email, newPassword);
    resetPasswordFunc(email, newPassword);
    setLoading(false);
  };

  //it is a helper function to check if password has alphabets and numbers
  //it uses regex to check if password has alphabets and numbers
  const passAlphaNumeric = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);

    if (hasLetters && hasNumbers) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (navigate) {
      alert("Password Updated");
      navigation.navigate("Login");
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
              Create New Password
            </Text>
            {isShortPassError && !isWeakPassError && (
              <Text
                style={{
                  fontSize: 15,
                  color: "red",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Password is of min 9 length
              </Text>
            )}
            {isWeakPassError && !isShortPassError && (
              <Text
                style={{
                  fontSize: 15,
                  color: "red",
                  textAlign: "center",
                  justifyContent: "center",
                  paddingHorizontal: 30,
                }}
              >
                *Weak Password. Combination of letters and number
              </Text>
            )}
            {isWeakPassError && isShortPassError && (
              <Text
                style={{
                  fontSize: 15,
                  color: "red",
                  textAlign: "center",
                  justifyContent: "center",
                  paddingHorizontal: 30,
                }}
              >
                *Password 8 letters and contains letters and numbers
              </Text>
            )}
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
              value={newPassword}
              error={isError}
              secureTextEntry={isNewPassSecure}
              disabled={loading}
              onChangeText={(text) => setNewPassword(text)}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Enter New Password"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
              right={
                <TextInput.Icon
                  icon={newPassIcon}
                  onPress={() => {
                    if (newPassIcon === "eye") {
                      setNewPassIcon("eye-off");
                    } else {
                      setNewPassIcon("eye");
                    }
                    setIsNewPassSecure(!isNewPassSecure);
                  }}
                />
              }
            />
            <TextInput
              value={confirmPassword}
              secureTextEntry={isConfirmPassSecure}
              error={isError}
              disabled={loading}
              onChangeText={(text) => setConfirmPassword(text)}
              style={{ borderRadius: 10, width: "80%" }}
              mode="outlined"
              outlineColor="#D0D0D0"
              activeOutlineColor="#041E42"
              label="Confirm New Password"
              contentStyle={{ fontSize: 16, letterSpacing: 1 }}
              right={
                <TextInput.Icon
                  icon={confirmPassIcon}
                  onPress={() => {
                    if (confirmPassIcon === "eye") {
                      setConfirmPassIcon("eye-off");
                    } else {
                      setConfirmPassIcon("eye");
                    }
                    setIsConfirmPassSecure(!isConfirmPassSecure);
                  }}
                />
              }
            />
            {isError && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,

                  marginTop: -12,
                }}
              >
                *Passwords do not match
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
                updatePassword();
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
              Update Password
            </Button>
            <Text style={{ marginTop: 15, fontSize: 16, marginTop: 30 }}>
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
                    fontSize: 18,
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

export default ResetPassword;

const styles = StyleSheet.create({});
