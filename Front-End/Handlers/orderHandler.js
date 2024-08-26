import { useState, useEffect } from "react";

import { useOrderApi } from "../CustomeHooks/useOrderApi";
import { BACK_END_URL } from "../Global";

export const orderHandler = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [UsrOrders, setUsrOrders] = useState([]);

  const {
    createOrder,
    getAllOrders,
    error,

    response,
    statusCode,
    setError,

    setResponse,
    setStatusCode,
  } = useOrderApi();

  //This useEffect will handle the response and error from the api
  useEffect(() => {
    if (error) {
      if (error === "Provide Details") {
        alert("Provide Details");
      } else if (error === "User not authenticated") {
        alert("User is Not Logined In");
      } else if (error === "User not Loged In") {
        alert("YOu are Not Loged In");
      } else if (error === "Cannot add order") {
        alert("Error creating order");
      } else {
        alert("Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);

      setResponse(false);
    }

    if (!error && response) {
      //clear the states
      setError(false);

      if (response.message === "Order Created Successfully!!") {
        alert(" Order Placed");
        setOrderPlaced(true);
      } else if (response.message === "Orders Fetched") {
        // console.log("From Orders Handler Orders are", response.data);
        setUsrOrders(response.data);
      } else if (response.message === "Product Searched!!") {
        console.log(
          "From Products Handler Searched Products is",
          response.data
        );
        setSearchedProduct(response.data);
      }
    }
  }, [response, error]);

  const createOrderFunc = async (cart, total, paymentMethod, address) => {
    //console.log("Order Details", cart.cartArray, total, paymentMethod, address);
    let url = `${BACK_END_URL}/e-commerce/orders`;
    try {
      await createOrder(url, cart.cartArray, total, paymentMethod, address);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const fetchOrderFunc = async (email) => {
    let url = `${BACK_END_URL}/e-commerce/orders`;
    try {
      await getAllOrders(url, email);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    createOrderFunc,
    fetchOrderFunc,
    UsrOrders,
    orderPlaced,
  };
};
