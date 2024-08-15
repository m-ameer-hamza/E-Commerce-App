import { useEffect, useState } from "react";
import { BACK_END_URL } from "../Global";
import { usePaymentApi } from "../CustomeHooks/usePaymentApi";

export const paymentHandler = () => {
  const [clicked, setIsClicked] = useState(false);
  const [payInstanceKey, setPayInstanceKey] = useState(false);
  const {
    stepUpPayment,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  } = usePaymentApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Provide Amount and Currency!!" || statusCode === 400) {
        alert("Provide Amount and Currency!!");
      } else if (
        error === "Error setting up card payment!!" ||
        statusCode === 503
      ) {
        alert("Cannt use card payment option");
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

      // console.log("From Address Handler Handler", response.message);
      // console.log("From Address Handler", statusCode);
      if (
        response.message === "Payment intent created successfully" ||
        statusCode == 200
      ) {
        //calling the function that  saving the user in Redux

        setPayInstanceKey(response.client_secret);
      }
    }
  }, [response, error]);

  const handlePayment = async (amount, currency) => {
    setIsClicked(true);
    try {
      await stepUpPayment(
        amount,
        currency,
        `${BACK_END_URL}/e-commerce/payment`
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  return { handlePayment, payInstanceKey, setPayInstanceKey };
};
