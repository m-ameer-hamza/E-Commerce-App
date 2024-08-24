import { useState, useEffect } from "react";

import { useOrderApi } from "../CustomeHooks/useOrderApi";
import { BACK_END_URL } from "../Global";

export const orderHandler = () => {
  const [clicked, setIsClicked] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    createOrder,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  } = useOrderApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

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
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //clear the states
      setError(false);
      setLoading(false);
      setResponse(false);

      if (response.message === "OrderCreated" || statusCode == 201) {
        alert(" Order Created Successfully!!");
        setOrderPlaced(true);
      } else if (response.message === "Products Fetched") {
        setProducts(response.products);
        setSaleProducts(response.discountedProducts);
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
    setIsClicked(true);

    console.log("Order Details", cart.cartArray, total, paymentMethod, address);
    let url = `${BACK_END_URL}/e-commerce/orders`;
    try {
      await createOrder(url, cart.cartArray, total, paymentMethod, address);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    createOrderFunc,
    orderPlaced,
  };
};
