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

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loginUser,
    createUser,
    googleLogin,
    tokenRefresh,
    verifyLoginUser,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  } = useAuthApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      setNavigate(false);

      if (error === "Email already exists") {
        alert("User already exists");
        navigation.navigate("Login");
      } else if (error === "Token is expired!!") {
        //alert("Token is expired!!");
        toggleSession();
      } else if (error === "Wrong Login Method") {
        alert("Wrong Login Method");
      } else if (error == "Bad Request") {
        alert("Bad Request");
      } else if (error === "User is not verified") {
        alert("User is not verified");
        navigation.navigate("EmailVerification", { email: email });
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
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //clear the states
      setError(false);
      setLoading(false);
      setResponse(false);
      setStatusCode(null);

      if (response.message === "Successfully Logined In") {
        savingLoginedUser({ email: email, userName: response.userName });
        dispatch(toggleAuth());
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
    dispatch(saveUser(data.email, data.userName));
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

  const signUpFunc = async (username, email, password, userType, loginWith) => {
    setIsClicked(true);
    setEmail(email);
    try {
      await createUser(
        username,
        email,
        password,
        userType,
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

  return {
    loginFunc,
    signUpFunc,
    googleLoginFunc,
    refreshTokenFunc,
    verifyUserFunc,
    navigate,
  };
};
