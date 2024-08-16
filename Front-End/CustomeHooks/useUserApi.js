import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SCEREAT_KEY } from "../Global";

// Custom hook to handle user api requests
export function useUserApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  // Get token to expo secure storage

  async function getToken() {
    try {
      const token = await SecureStore.getItemAsync(SCEREAT_KEY);
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const updateUserName = async (userName, url) => {
    let jwt = await getToken();
    try {
      setLoading(true);
      const res = await axios.patch(
        url,
        {
          name: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setStatusCode(res.status);
      setLoading(false);
      setResponse(res.data);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  // Custom error handler

  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      console.log(error.response.data);
      if (error.response.data.status === 400) {
        setError("Email already exists");
      } else if (error.response.data.status === 419) {
        setError("Token is expired!!");
        setStatusCode(419);
      } else if (error.response.data.status === 401) {
        setError("Error Email or password not match");
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
    updateUserName,
    error,
    statusCode,
    response,
    loading,
    setError,
    setLoading,
    setResponse,
  };
}
