import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { paymentHandler } from "../Handlers/paymentHandler";
import { calculateDiscountedTotal } from "../Redux/cartSlice";
import { CURRENCY_TYPE } from "../Global";

import { ActivityIndicator } from "react-native-paper";

const PaymentOptions = ({
  order,
  setOrder,
  currStep,
  currStepHandler,
  setPaymentKey,
}) => {
  const [loading, setLoading] = useState(false);
  const [cardAccepted, setCardAccepted] = useState(false);

  const [disTotal, setDisTotal] = useState(0);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { handlePayment, payInstanceKey, setPayInstanceKey } = paymentHandler();

  //THis useEffect will run when the cart array changes
  //It will calculate the discounted and cart length of the cart
  useEffect(() => {
    //dispatching the action to calculate the total price of the cart

    dispatch(calculateDiscountedTotal());
    console.log(cart.discountedTotal);

    setDisTotal(cart.discountedTotal);
  }, [cart.cartArray, cart.discountedTotal, cart.total]);

  const paymentOptions = [
    { title: "Cash on Delivery", content: "Pay when you receive the order" },
    {
      title: "Credit Card",
      content: "Pay using your credit card. Hassle-free payment",
    },
  ];

  //This useEffect will check if the payment instance key is not null

  useEffect(() => {
    //If the payment instance key is not null, then set the card accepted to true

    if (payInstanceKey) {
      setCardAccepted(true);
      console.log("Payment Key from payment options ", payInstanceKey);
      setPaymentKey(payInstanceKey);
    }

    // setLoading(false);
  }, [payInstanceKey]);

  // Function to handle the addition of card
  const addCardHandler = async () => {
    // setLoading(true);
    handlePayment(disTotal + order.deliveryCharge, CURRENCY_TYPE);
  };

  // Function to handle the addition of payment option
  // If no payment option is selected, an alert is shown
  //It will increament in the Current step to display green color in the stepper
  const addPayOptHandler = () => {
    if (order.payment === "") {
      alert("Please select Payment option");
      return;
    }
    // Clear the payment instance key
    setPayInstanceKey("");
    currStepHandler(currStep + 1);
  };
  return (
    <View style={{ marginHorizontal: 20, marginTop: 5 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select Payment Option
      </Text>
      {cardAccepted && (
        <Text
          style={{
            fontSize: 16,
            color: "green",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Card Accepted. You can proceed to checkout
        </Text>
      )}
      <View style={{ flexDirection: "column", marginTop: 20 }}>
        <RadioButton.Group
          onValueChange={(value) => setOrder({ ...order, payment: value })}
          value={order.payment}
        >
          {paymentOptions.map((option, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",

                borderWidth: 1,
                borderColor: "#D0D0D0",
                paddingVertical: 30,
                backgroundColor: "#f9f9f9",
                marginVertical: 20,
              }}
            >
              <RadioButton.Item value={option.title} color="#0066b2" />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                {" "}
                {/* Added marginLeft for spacing */}
                <Text
                  style={{
                    color: "green",
                    fontWeight: "800",
                    fontSize: 16,
                    marginLeft: 10,
                  }}
                >
                  {option.title} -{"   "}
                </Text>
                {option.content}
              </Text>
            </View>
          ))}
        </RadioButton.Group>
        {order.payment === "Cash on Delivery" && (
          <Pressable
            onPress={() => {
              addPayOptHandler();
            }}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Continue</Text>
          </Pressable>
        )}

        {order.payment === "Credit Card" &&
          (cardAccepted ? (
            <Pressable
              onPress={() => {
                addPayOptHandler();
              }}
              style={{
                backgroundColor: "#ffc72c",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400" }}>Continue</Text>
            </Pressable>
          ) : (
            <Pressable
              disabled={loading}
              onPress={() => {
                addCardHandler(); // Different onPress handler
              }}
              style={{
                flexDirection: "row",
                backgroundColor: "#ffc72c",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                width: "80%",
                alignSelf: "center",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                Check out using Card
              </Text>
              {loading && <ActivityIndicator animating={true} color="black" />}
            </Pressable>
          ))}
      </View>
    </View>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({});
