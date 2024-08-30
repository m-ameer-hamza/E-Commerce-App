import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { TouchableRipple } from "react-native-paper";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";

import LogoComponent from "../Components/Logo";
import { authHandlers } from "../Handlers/authHandler";

export default function EmailVerification({ route }) {
  //getting email from previous screen
  const { email, navigateTo } = route.params;
  const { verifyOTPFunc, regenOTPFunc, navigate, otpVerified } = authHandlers();

  const [usrEmail, setUsrEmail] = useState("");
  const [valideOTP, setValideOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setUsrEmail(email);
    setIsResendDisabled(true);
    startCountdown();
  }, []);
  useEffect(() => {
    setUsrEmail(email);
  }, [email]);

  useEffect(() => {
    if (navigateTo === "Login" && navigate) {
      navigation.navigate("Login");
    }
  }, [navigate]);

  useEffect(() => {
    if (otpVerified && navigateTo === "NewPassword" && navigate) {
      navigation.navigate("ResetPassword", { email: usrEmail });
    }
  }, [otpVerified]);

  // useEffect(() => {
  //   if (reSendOtp === "send") {
  //     //send otp to user
  //     //here is the code to send otp
  //     // sendOTPFunc(usrEmail);
  //     regenOTPFunc(usrEmail);
  //     alert("OTP has been sent to your email");
  //   }
  // }, [usrEmail]);

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
    verifyOTPFunc(usrEmail, otp);
  };

  //This function is used to start the countdown timer when the user clicks on the resend button
  const startCountdown = () => {
    let timeLeft = 120; // 2 minutes in seconds
    setCountdown(timeLeft);

    const intervalId = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setIsResendDisabled(false); // Enable Resend button
        setIsVerifyDisabled(true); // Disable Verify button
      }
    }, 1000);
  };

  //This function is used to format the time in minutes and seconds
  //Example: 2:05 . It will display on REsend Button when the countdown is running
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  //This function is used to handle the resend button click
  //It will restart the countdown timer and disable the resend button
  //It will also send the OTP to the user
  const handleResend = () => {
    regenOTPFunc(usrEmail);

    setIsVerifyDisabled(false); // Enable Verify button
    setIsResendDisabled(true); // Disable Resend button during countdown
    startCountdown(); // Restart

    alert("OTP has been Re-sent to your email");
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
          {usrEmail}
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 40,
        }}
      >
        <TouchableRipple
          rippleColor="#b88d63"
          onPress={() => {
            if (!valideOTP) {
              alert("Please enter a valid OTP");
              return;
            }
            startCountdown();
            otpVerifier();
          }}
          disabled={isVerifyDisabled}
          style={{
            width: "35%",
            alignSelf: "center",
            marginTop: "10%",
          }}
        >
          <View
            style={{
              backgroundColor: isVerifyDisabled ? "#b88d63" : "#fe8710",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: "100%",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              Verify
            </Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          rippleColor="#b88d63"
          disabled={isResendDisabled}
          onPress={() => {
            handleResend();
          }}
          style={{
            width: "35%",
            alignSelf: "center",
            marginTop: "10%",
          }}
        >
          <View
            style={{
              backgroundColor: countdown > 0 ? "#b88d63" : "#fe8710",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: "100%",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              {countdown > 0 ? formatTime(countdown) : "Resend"}
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
}
