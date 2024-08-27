import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon, PaperProvider } from "react-native-paper";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateDiscountedTotal, calculateTotal } from "../Redux/cartSlice";

import { CheckOutHandler } from "../CompHandlers/CheckOutHandler";
import { authHandlers } from "../Handlers/authHandler";
import ActivityLoading from "../Components/ActivityLoading";
import PasswordConfirm from "../Components/PasswordConfirm";
import ReduxStore from "../Redux/store";

const OrderSummary = ({ order, paySecreatKey, setPaySecreatKey }) => {
  const { verifyUserFunc } = authHandlers();
  const session = useSelector((state) => state.session.session);

  const dispatch = useDispatch();
  const { CheckOutFunc } = CheckOutHandler();

  const [cartLength, setCartLength] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);

  //Function to check if the user is verified or not
  const checkOut = async () => {
    setLoading(true);

    //Checking if the user is verified or not
    await verifyUserFunc();

    moveToFinal();
  };

  //Function to move to the final step of the order
  const moveToFinal = async () => {
    const proceed = ReduxStore.getState().session.session;

    setLoading(false);
    if (proceed) {
      CheckOutFunc(
        order,
        paySecreatKey,
        setPaySecreatKey,
        disTotal + order.deliveryCharge
      );
    }
  };

  useEffect(() => {
    setCartLength(cart.cartArray?.length);

    //dispatching the action to calculate the total price of the cart

    dispatch(calculateDiscountedTotal());
    dispatch(calculateTotal());

    setDisTotal(cart.discountedTotal);
    setTotalPrice(cart.total);
  }, [cart.cartArray, cart.discountedTotal, cart.total]);

  const displayAddress = (text) => {
    // Check if "Address" is not included in address.saveAs
    if (!text.includes("Address")) {
      return `${text} Address`;
    } else {
      return text;
    }
  };

  return (
    <PaperProvider>
      <View style={{ marginHorizontal: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Summary</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            backgroundColor: "#fff",
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Selected Address for delivery
            </Text>
            <Text style={{ fontSize: 15, color: "grey", marginTop: 5 }}>
              {" "}
              {displayAddress(order.address?.saveAs)}
            </Text>
          </View>
          <Pressable>
            <Icon source="chevron-right" size={30} />
          </Pressable>
        </View>

        <Text style={{ marginTop: 5 }}>Shipping to above address</Text>

        <View
          style={{
            flexDirection: "column",
            gap: 20,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
            backgroundColor: "#fff",
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Price Summary
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}> Product Count</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                ({cartLength}) item
              </Text>
              <Pressable style={{ paddingLeft: 10 }}>
                <Icon source="chevron-right" size={30} />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {" "}
              Order Total
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  paddingRight: 10,
                }}
              >
                Rs. {totalPrice}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {" "}
              After Discount
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  paddingRight: 10,
                }}
              >
                10 % {"off   "} {disTotal}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {" "}
              Delivery Charges
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {order.delivery === "Express Delivery" && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    paddingRight: 10,
                  }}
                >
                  Rs. 500
                </Text>
              )}
              {order.delivery === "Self Pick up" && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    paddingRight: 10,
                  }}
                >
                  Rs. 100
                </Text>
              )}
              {order.delivery === "In 7 Days" && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    paddingRight: 10,
                  }}
                >
                  FREE
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "red" }}>
              {" "}
              Payable Amount
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  paddingRight: 10,
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                Rs. {disTotal + order.deliveryCharge}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            backgroundColor: "#fff",
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Selected Payment Method
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 15, color: "grey", marginTop: 12 }}>
                {" "}
                {order.payment}
              </Text>
            </View>
            {order.payment === "Credit Card" && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  alignItems: "center",
                }}
              >
                <Icon source="check-decagram" size={20} color="green" />
                <Text style={{ color: "green" }}> Veirified</Text>
              </View>
            )}
          </View>
          <Pressable>
            <Icon source="chevron-right" size={30} />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => {
          checkOut();
        }}
        style={{
          backgroundColor: "#fab300",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 30,
          width: "80%",
          alignSelf: "center",
          marginBottom: 27,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500", letterSpacing: 0.4 }}>
          Place Order
        </Text>
      </Pressable>
      {loading && <ActivityLoading />}
      {!session && <PasswordConfirm />}
    </PaperProvider>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
