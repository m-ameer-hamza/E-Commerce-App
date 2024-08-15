import React, { useState } from "react";
import { View, Text } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { TouchableRipple } from "react-native-paper";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";

import LogoComponent from "../Components/Logo";

export default function EmailVerification({ route }) {
  //getting email from previous screen
  const { email } = route.params;

  //state for otp input
  const [valideOTP, setValideOTP] = useState(false);
  //state for otp data
  const [otp, setOtp] = useState("");

  //for navigation to next screen
  const navigation = useNavigation();

  const isNumericOTP = (otp) => {
    if (validator.isNumeric(otp)) {
      setValideOTP(true);
      setOtp(otp);
      console.log("OTP", otp);
    } else {
      setValideOTP(false);
    }
  };

  // function that verify the otp when button is clicked
  const otpVerifier = () => {
    //send otp to server for verification.
    //here is the code to verify

    //after verification navigate to next screen
    navigation.navigate("Login");
  };

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
        <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>
          OTP send to
        </Text>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            color: "black",
            fontWeight: "500",
            letterSpacing: 1,
          }}
        >
          az889480@gmail.com
        </Text>
      </View>
      <View style={{ marginTop: 70 }}>
        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => {
            text.length === 6 ? isNumericOTP(text) : setValideOTP(false);
          }}
          onFilled={(text) => {
            //validate otp conatins only numbers
            // validator.isNumeric(text);
            isNumericOTP(text);
          }}
        />
      </View>

      {valideOTP && (
        <TouchableRipple
          rippleColor="#b88d63"
          onPress={() => {
            otpVerifier();
          }}
          style={{
            //   height: "6%",
            width: "50%",
            alignSelf: "center",
            marginTop: "10%",
          }}
        >
          <View
            style={{
              backgroundColor: "#fe8710",

              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                letterSpacing: 1,
                paddingVertical: "6%",
              }}
            >
              Verify
            </Text>
          </View>
        </TouchableRipple>
      )}
    </View>
  );
}
