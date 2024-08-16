import { useEffect, useState } from "react";

import { useUserApi } from "../CustomeHooks/useUserApi";
import { useDispatch } from "react-redux";
import { editSession } from "../Redux/sessionSlice";
import { editUserName } from "../Redux/userSlice";
import { BACK_END_URL } from "../Global";
export function userHandler() {
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);
  const {
    updateUserName,
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
      console.log("From useEffect of UserHandler", response);

      //alert(response.message);
      if (response.message === "User Name Modified" || statusCode == 200) {
        console.log(statusCode);
        //calling the function that  saving the user in Redux
        updateUserRedux(response.userName);
        //  getUserTasks();
        // console.log("Login Success");
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

      `${BACK_END_URL}/portfolio/v1/users/updateUserName`
    );
    setClicked(false);
  };

  return { modifyUserName };
}
