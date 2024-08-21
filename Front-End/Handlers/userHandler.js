import { useEffect, useState } from "react";

import { useUserApi } from "../CustomeHooks/useUserApi";
import { useDispatch } from "react-redux";
import { editSession } from "../Redux/sessionSlice";
import { editUserName } from "../Redux/userSlice";
import { useSelector } from "react-redux";
import { BACK_END_URL } from "../Global";
export function userHandler() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [clicked, setClicked] = useState(false);
  const {
    updateUserName,
    updatePassword,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
  } = useUserApi();

  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Token is expired!!" || statusCode === 419) {
        toggleSession();
      } else if (error === "Provide Current and New Password!!") {
        alert("Provide Current and New Password!!");
      } else if (error === "Credentials do not match") {
        alert("Credentials do not match");
      } else if (error === "Email already exists") {
        alert("Email already exists");
      } else if (error === "No Response from server") {
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

      //alert(response.message);
      if (response.message === "User Name Modified") {
        //calling the function that  saving the user in Redux
        updateUserRedux(response.userName);
        alert("User Name Modified");
      } else if (response.message === "Password Updated Successfully") {
        alert("Your Password Modified!!");
      }
    }
  }, [response, error]);

  const toggleSession = () => {
    // console.log("toggle");
    //dispatch the action to change the session
    dispatch(editSession(false));
  };

  const updateUserRedux = (arg) => {
    console.log("From User Handler to save user NAME IN rEDUX", arg);
    dispatch(editUserName(arg));
  };

  const modifyUserName = async (userName) => {
    console.log("From User Handler", userName);
    setClicked(true);
    await updateUserName(
      userName,

      `${BACK_END_URL}/e-commerce/users/updateUserName`
    );
    setClicked(false);
  };

  const modifyPassword = async (oldPassword, newPassword) => {
    setClicked(true);

    await updatePassword(
      oldPassword,
      newPassword,
      user.email,
      `${BACK_END_URL}/e-commerce/users/updatePassword`
    );
    setClicked;
  };

  return { modifyUserName, modifyPassword };
}
