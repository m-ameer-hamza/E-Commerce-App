import { useEffect } from "react";

import { useStripe } from "@stripe/stripe-react-native";
import { clearCart } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { orderHandler } from "../Handlers/orderHandler";
import { useSelector } from "react-redux";

export const CheckOutHandler = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { createOrderFunc, orderPlaced } = orderHandler();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (orderPlaced) {
      console.log("Order Placed");
      dispatch(clearCart());
      navigation.navigate("OrderSuccess");
    }
  }, [orderPlaced]);

  const CheckOutFunc = async (
    order,
    paySecreatKey,
    setPaySecreatKey,
    totalAmount
  ) => {
    if (order.payment === "Credit Card") {
      console.log("Payment initiated");

      //1. Initizlize payment sheet

      try {
        await initPaymentSheet({
          merchantDisplayName: "Amazone Clone",
          paymentIntentClientSecret: paySecreatKey,
        });
      } catch (e) {
        alert("Error in initializing payment sheet");
        console.log(checkOutCardRes.error);
        setLoading(false);
        return;
      }

      //2. Present payment sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        alert(`Error code: ${paymentError.code}`, paymentError.message);
        return;
      }
    }

    //3. Store the order in the database
    createOrderFunc(cart, totalAmount, order.payment, order.address);
    //4. Clear the cart

    //5. Show the success message || Navigate to the success page
  };

  return { CheckOutFunc };
};
