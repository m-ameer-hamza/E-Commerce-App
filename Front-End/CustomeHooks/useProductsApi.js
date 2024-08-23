import { useState } from "react";
import axios from "axios";

// Custom hook to handle user api requests
export function useProductsApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  const getAllProducts = async (url, page) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}?page=${page}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      setLoading(false);
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

  const searchProduct = async (url, id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/${id}`);

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
        setError("Provide Details");
      } else if (error.response.data.status === 401) {
        setError("User not authenticated");
      } else if (error.response.data.status === 404) {
        setError("Product not found");
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
    getAllProducts,

    searchProduct,
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
