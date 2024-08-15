import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SCEREAT_KEY } from "../Global";

// Custom hook to handle user api requests
export function useAuthApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  // Save token to local storage
  const saveToken = async (token) => {
    try {
      await SecureStore.setItemAsync(SCEREAT_KEY, token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //Checked
  const createUser = async (userName, email, password, url) => {
    try {
      setLoading(true);
      const res = await axios.post(url, {
        name: userName,
        email: email,
        password: password,
      });

      setLoading(false);
      setResponse(res.data);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  //Checked
  const loginUser = async (email, password, url) => {
    try {
      setLoading(true);
      const res = await axios.post(url, {
        email: email,
        password: password,
      });

      // console.log(res.data);
      if (res.status === 200) {
        const tokenStatus = await saveToken(res.data.token);

        // console.log(tokenStatus);
        setLoading(false);

        if (tokenStatus) {
          // console.log("Token saved successfully");

          setResponse(res.data);
          setError(null);
          setStatusCode(res.status);
        } else {
          console.log("Token not saved");
          alert("Something went wrong. Try again");
          setResponse(null);
          setStatusCode(null);
          setError("Token not saved");
        }
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  // Custom error handler

  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 400) {
        setError("Email already exists");
      } else if (error.response.data.status === 401) {
        setError("Error Email or password not match");
      } else if (error.response.data.status === 404) {
        setError("User not found");
      } else if (error.response.data.status === 403) {
        setError("User is not verified");
      } else {
        setError(error.response.data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received

      setError("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error

      setError(error.message);
    }
  }

  return {
    createUser,
    loginUser,
    error,
    statusCode,
    setError,

    response,
    loading,
    setLoading,
    setResponse,
  };
}
