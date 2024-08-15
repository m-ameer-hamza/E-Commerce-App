import { useState } from "react";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import { SCEREAT_KEY } from "../Global";

// Custom hook to handle user api requests
export function usePaymentApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  //function to retrive the token from the expo secure storage

  async function getToken() {
    try {
      const token = await SecureStore.getItemAsync(SCEREAT_KEY);
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Checked
  const stepUpPayment = async (amount, currency, url) => {
    try {
      setLoading(true);
      const res = await axios.post(url, {
        amount: amount,
        currency: currency,
      });

      setLoading(false);
      setResponse(res.data.data);
      setStatusCode(res.status);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  //error handler
  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 419) {
        setError("Token is expired!!");
        setStatusCode(419);
      } else if (error.response.data.status === 401) {
        setError("Unauthorized!!");
        setStatusCode(401);
      } else if (error.response.data.status === 400) {
        setError("Provide Amount and Currency!!");
        setStatusCode(400);
      } else if (error.response.data.status === 503) {
        setError("Error setting up card payment!!");
        setStatusCode(503);
      } else {
        setError(error.response.data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);

      setError("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error

      setError(error.message);
    }
  }

  return {
    stepUpPayment,

    error,
    statusCode,

    response,
    loading,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  };
}
