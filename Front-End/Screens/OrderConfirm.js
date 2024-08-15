import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";

import OrderStepHeader from "../Components/OrderStepHeader";
import AddressDeliveryList from "../Components/DeliveryAddressOptions";
import DeliveryOptions from "../Components/DeliveryOptions";
import PaymentOptions from "../Components/PaymentOptions";
import OrderSummary from "../Components/OrderSummary";

const OrderConfirm = () => {
  const [currStep, setCurrStep] = useState(0);
  const [paySecreatKey, setPaySecreatKey] = useState("");
  const [order, setOrder] = useState({
    address: {},
    delivery: "",
    payment: "",
    deliveryCharge: 0,
  });

  useEffect(() => {
    console.log("Order DEtails from OrderConfirmation", order);
  }, [order]);

  useEffect(() => {
    console.log("Payment Key from OrderConfirmation", paySecreatKey);
  }, [paySecreatKey]);

  return (
    <ScrollView>
      <OrderStepHeader currStep={currStep} />

      <View style={{ borderTopWidth: 2, borderColor: "#D0D0D0" }} />

      {/*/WE can create a separte component and return it here  Address Form*/}
      {currStep == 0 && (
        <AddressDeliveryList
          currStepHandler={setCurrStep}
          setOrder={setOrder}
          order={order}
        />
      )}

      {/*/WE can create a separte component and return it here  Delivery Form*/}
      {currStep == 1 && (
        <DeliveryOptions
          currStep={currStep}
          currStepHandler={setCurrStep}
          setOrder={setOrder}
          order={order}
        />
      )}

      {/*/WE can create a separte component and return it here  Payment Form*/}

      {currStep == 2 && (
        <PaymentOptions
          currStep={currStep}
          currStepHandler={setCurrStep}
          setOrder={setOrder}
          order={order}
          setPaymentKey={setPaySecreatKey}
        />
      )}

      {/*/WE can create a separte component and return it here  Order Summary*/}
      {currStep == 3 && (
        <OrderSummary
          order={order}
          paySecreatKey={paySecreatKey}
          setPaySecreatKey={setPaySecreatKey}
        />
      )}
    </ScrollView>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({});
