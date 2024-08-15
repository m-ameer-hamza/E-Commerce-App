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

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loginUser,
    createUser,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
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
      if (error === "Email already exists") {
        alert("User already exists");
      } else if (error == "Bad Request") {
        alert("Bad Request");
      } else if (error === "User is not verified") {
        alert("User is not verified");
        navigation.navigate("EmailVerification", { email: email });
      } else if (error === "Email or password not match") {
        alert("Email or password not match");
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

      console.log("From Auth Handler", response.message);
      console.log("From Auth Handler", statusCode);
      if (response.message === "Successfully Logined In" || statusCode == 200) {
        //calling the function that  saving the user in Redux
        console.log("navigating to home");
        savingLoginedUser({ email: email, userName: response.userName });
        dispatch(toggleAuth());
        //navigation.navigate("Home");
      } else if (response.message === "Created" && statusCode == 201) {
        alert("User Created Successfully");
      }
    }
  }, [response, error]);

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

  const signUpFunc = async (username, email, password) => {
    setIsClicked(true);
    setEmail(email);
    try {
      await createUser(
        username,
        email,
        password,
        `${BACK_END_URL}/e-commerce/users/signup`
      );
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  };

  return { loginFunc, signUpFunc };
};
