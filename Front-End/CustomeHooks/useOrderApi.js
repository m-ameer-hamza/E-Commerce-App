import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SCEREAT_KEY } from "../Global";
// Custom hook to handle user api requests
export function useOrderApi() {
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

  const createOrder = async (url, products, total, paymentMethod, address) => {
    console.log("Products from  useOrderApi", products);
    console.log("Total from  useOrderApi", total);
    console.log("PaymentMethod from  useOrderApi", paymentMethod);
    console.log("Address from  useOrderApi", typeof address);

    let token = await getToken();
    try {
      setLoading(true);
      const res = await axios.post(
        url,
        {
          products,
          total,
          paymentMethod,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse(res.data);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Custom error handler

  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 400) {
        setError("Provide All Details");
      } else if (error.response.data.status === 403) {
        setError("Error with JWT token");
      } else if (error.response.data.status === 440) {
        setError("User not Loged In");
      } else if (error.response.data.status === 419) {
        setError("User not authenticated");
      } else if (error.response.data.status === 500) {
        setError("Cannot add order");
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
    createOrder,
    error,
    statusCode,
    setError,

    response,
    loading,
    setLoading,
    setResponse,
    setStatusCode,
  };
}
