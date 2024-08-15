import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";

import OrderStepHeader from "../Components/OrderStepHeader";
import AddressDeliveryList from "../Components/DeliveryAddressOptions";
import DeliveryOptions from "../Components/DeliveryOptions";
import PaymentOptions from "../Components/PaymentOptions";
import OrderSummary from "../Components/OrderSummary";
import { PaperProvider } from "react-native-paper";
import ActivityLoading from "../Components/ActivityLoading";

const OrderConfirm = () => {
  const [currStep, setCurrStep] = useState(0);
  const [paySecreatKey, setPaySecreatKey] = useState("");
  const [loading, setLoading] = useState(false);

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
    <PaperProvider>
      <View style={{ flex: 1 }}>
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
              loading={loading}
              setLoading={setLoading}
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
        {loading && <ActivityLoading />}
      </View>
    </PaperProvider>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({});
