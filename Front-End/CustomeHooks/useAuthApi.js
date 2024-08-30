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
  const createUser = async (
    userName,
    email,
    password,

    loginWith,
    url
  ) => {
    try {
      const res = await axios.post(url, {
        name: userName,
        email: email,
        password: password,

        signUpMethod: loginWith,
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

  const googleLogin = async (email, url) => {
    try {
      setLoading(true);
      const res = await axios.post(url, {
        email: email,
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
  const tokenRefresh = async (email, password, url) => {
    try {
      setLoading(true);

      const res = await axios.get(url, {
        params: {
          usrEmail: email,
          usrPassword: password,
        },
      });

      if (res.status === 200) {
        const tokenStatus = await saveToken(res.data.token);
        setLoading(false);

        if (tokenStatus) {
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

  const verifyLoginUser = async (url) => {
    let token = await SecureStore.getItemAsync(SCEREAT_KEY);

    try {
      setLoading(true);
      const res = await axios.get(
        url,

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
    }
  };

  const verifyOTP = async (email, otp, url) => {
    console.log("OTP", otp);
    console.log("Email", email);
    try {
      setLoading(true);
      const res = await axios.patch(
        url,
        {
          otp: otp,
        },
        {
          params: {
            email: email,
          },
        }
      );

      setResponse(res.data);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const regenOTP = async (email, url) => {
    try {
      setLoading(true);
      const res = await axios.get(url, {
        params: {
          email: email,
        },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      setResponse(res.data);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const resetPassword = async (email, url, password) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        url,
        {
          password: password,
        },
        {
          params: {
            email: email,
          },
        }
      );

      setResponse(res.data);
      setError(null);
      setStatusCode(res.status);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 409) {
        setError("Email already exists");
      } else if (error.response.data.status === 400) {
        setError("Email or Password is missing");
      } else if (error.response.data.status === 401) {
        setError("Email or password not match");
      } else if (error.response.data.status === 403) {
        setError("OTP does not match");
      } else if (error.response.data.status === 404) {
        setError("User not found");
      } else if (error.response.data.status === 406) {
        setError("Wrong Login Method");
      } else if (error.response.data.status === 419) {
        setError("Token is expired!!");
        setStatusCode(419);
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
    googleLogin,
    tokenRefresh,
    verifyLoginUser,
    regenOTP,
    verifyOTP,
    resetPassword,
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
