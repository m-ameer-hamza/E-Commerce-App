import { useState, useEffect } from "react";

import { BACK_END_URL } from "../Global";

import { useAddressApi } from "../CustomeHooks/useAddressApi";

export const addressHandlers = () => {
  const [clicked, setIsClicked] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const {
    addAddress,
    getAllAddress,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  } = useAddressApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Email is required") {
        alert("Email is required");
      } else if (error === "User Does not exists") {
        alert("User Does not exists");
      } else if (error === "User not found") {
        alert("User not found");
      } else if (error === "User is not verified") {
        alert("User is not verified");
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

      // console.log("From Address Handler Handler", response.message);
      // console.log("From Address Handler", statusCode);
      if (response.message === "Address Added" || statusCode == 201) {
        //calling the function that  saving the user in Redux
        alert(" Address Added Successfully");
        setResponse(false);
        //navigation.navigate("Home");
      } else if (response && response.length > 0) {
        setAddresses(response);
      }
    }
  }, [response, error]);

  const addAddressFunc = async (email, address) => {
    setIsClicked(true);

    try {
      await addAddress(email, address, `${BACK_END_URL}/e-commerce/address`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAllAddressFunc = async (email) => {
    setIsClicked(true);

    try {
      await getAllAddress(
        email,

        `${BACK_END_URL}/e-commerce/address`
      );
      return addresses;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  };

  return {
    addAddressFunc,
    getAllAddressFunc,

    addresses,
  };
};
