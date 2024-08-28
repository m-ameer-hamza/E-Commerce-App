import { useState, useEffect } from "react";

import { useAuthApi } from "../CustomeHooks/useAuthApi";
import { useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice";
import { editSession } from "../Redux/sessionSlice";
import { useNavigation } from "@react-navigation/native";
import { BACK_END_URL } from "../Global";
import { toggleAuth } from "../Redux/authSlice";

export const authHandlers = () => {
  const [clicked, setIsClicked] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loginUser,
    createUser,
    googleLogin,
    tokenRefresh,
    verifyLoginUser,
    verifyOTP,
    regenOTP,
    resetPassword,

    error,

    response,
    statusCode,
    setError,

    setResponse,
    setStatusCode,
  } = useAuthApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes

  useEffect(() => {
    if (error) {
      setNavigate(false);

      if (error === "Email already exists") {
        alert("User already exists");
        navigation.navigate("Login");
      } else if (error === "User not found") {
        alert("User Not found!!!!");
        setNavigate(false);
      } else if (error === "Token is expired!!") {
        //alert("Token is expired!!");
        toggleSession();
      } else if (error === "Wrong Login Method") {
        alert("Wrong Login Method");
      } else if (error === "OTP does not match") {
        alert("OTP does not match");
        setNavigate(false);
      } else if (error == "Email or Password is missing") {
        alert("Email or Password is missing");
        setNavigate(false);
      } else if (error === "User is not verified") {
        navigation.navigate("EmailVerification", {
          email: email,
          reSendOtp: "send",
        });
      } else if (error === "Email or password not match") {
        alert("Creditentials not match");
      } else if (error === "No response from server") {
        alert("No Response from server");
      } else {
        alert("Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);

      setResponse(false);
    }

    console.log("Response from auth Handler", response);
    if (!error && response) {
      //clear the states
      setError(false);

      setResponse(false);
      setStatusCode(null);

      console.log("Response Message", response.message);

      if (response.message === "Successfully Logined In") {
        savingLoginedUser({
          email: email,
          userName: response.userName,
          signUpMethod: response.signUpMethod,
        });
        dispatch(toggleAuth());
        setNavigate(true);
      } else if (response.message === "OTP verified") {
        //Navigate to login page
        alert("Email Verified Successfully");
        setNavigate(true);
        setOtpVerified(true);
      } else if (response.message === "OTP send to your registered email") {
        setNavigate(true);
      } else if (response.message === "Password Updated Successfully") {
        setNavigate(true);
      } else if (response.message === "User is verified") {
        setNavigate(true);
      } else if (response.message === "Token Refreshed") {
        savingLoginedUser({ email: email, userName: response.userName });
        setNavigate(true);
        dispatch(editSession(true));
      } else if (response.message === "Created" || statusCode == 201) {
        setNavigate(true);
        alert("User Created Successfully");
      }
    }
  }, [response, error]);

  const toggleSession = () => {
    // console.log("toggle");
    //dispatch the action to change the session
    dispatch(editSession(false));
  };

  //function that save the user in Redux when logined Successfully

  const savingLoginedUser = (data) => {
    // console.log(data);
    dispatch(saveUser(data.email, data.userName, data.signUpMethod));
    dispatch(editSession(true));
  };

  const loginFunc = async (email, password) => {
    setIsClicked(true);
    setEmail(email);

    try {
      await loginUser(
        email,
        password,
        `${BACK_END_URL}/e-commerce/users/login`
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const signUpFunc = async (username, email, password, loginWith) => {
    setEmail(email);
    try {
      await createUser(
        username,
        email,
        password,

        loginWith,
        `${BACK_END_URL}/e-commerce/users/signup`
      );
    } catch (e) {
      console.log(e.message);
      setNavigate(false);
    }
  };

  const googleLoginFunc = async (email) => {
    setEmail(email);
    try {
      await googleLogin(
        email,

        `${BACK_END_URL}/e-commerce/users/googleLogin`
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const refreshTokenFunc = async (email, password) => {
    console.log("From password confirm", email, password);
    try {
      await tokenRefresh(
        email,
        password,
        `${BACK_END_URL}/e-commerce/users/refreshToken`
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const verifyUserFunc = async () => {
    try {
      await verifyLoginUser(`${BACK_END_URL}/e-commerce/users/verifyUser`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const verifyOTPFunc = async (email, otp) => {
    console.log("From verifyOTPFunc", email, otp);
    try {
      await verifyOTP(email, otp, `${BACK_END_URL}/e-commerce/users/verifyOTP`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const regenOTPFunc = async (email) => {
    try {
      await regenOTP(email, `${BACK_END_URL}/e-commerce/users/regenerateOTP`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const resetPasswordFunc = async (email, password) => {
    try {
      await resetPassword(
        email,
        `${BACK_END_URL}/e-commerce/users/resetPassword`,
        password
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return {
    loginFunc,
    signUpFunc,
    googleLoginFunc,
    refreshTokenFunc,
    verifyUserFunc,
    verifyOTPFunc,
    regenOTPFunc,
    resetPasswordFunc,
    navigate,
    otpVerified,
  };
};
