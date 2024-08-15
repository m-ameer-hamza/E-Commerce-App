import { useState } from "react";
import axios from "axios";

// Custom hook to handle user api requests
export function useAddressApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  //Checked
  const addAddress = async (email, address, url) => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}?email=${email}`, {
        Address: address,
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
  const getAllAddress = async (email, url) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}?email=${email}`);

      setLoading(false);
      setResponse(res.data.Address);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  // Custom error handler

  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 400) {
        setError("Email is required");
      } else if (error.response.data.status === 500) {
        setError("User Does not exists");
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
    addAddress,
    getAllAddress,
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
