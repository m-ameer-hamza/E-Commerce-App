import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { calculateDiscountedTotal } from "../Redux/cartSlice";
import { IconButton } from "react-native-paper";
import OrderItem from "../Components/OrderItem";
const ViewOrderInfo = ({ route }) => {
  const { data } = route.params;

  const cart = useSelector((state) => state.cart);
  const [disTotal, setDisTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();

  //THis useEffect will run when the cart array changes
  //It will calculate the discounted and cart length of the cart
  useEffect(() => {
    setCartLength(cart.cartArray?.length);
    //dispatching the action to calculate the total price of the cart

    dispatch(calculateDiscountedTotal());
    console.log(cart.discountedTotal);

    setDisTotal(cart.discountedTotal);
  }, [cart.cartArray, cart.discountedTotal, cart.total]);

  const navigation = useNavigation();

  //this select will handle the radio button
  const handleSelect = (item) => {
    setCartItems((prevCart) => {
      const itemInCart = prevCart.some((cartItem) => cartItem._id === item._id);

      if (itemInCart) {
        // Remove item from cart if it's already in the cart
        return prevCart.filter((cartItem) => cartItem._id !== item._id);
      } else {
        // Add item to cart if it's not in the cart
        return [...prevCart, item];
      }
    });
  };

  useEffect(() => {
    console.log("Cart Items", cartItems);
  }, [cartItems]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#eee" }}>
      {/* Header of Cart Screen */}

      <View
        style={{
          padding: 10,
          flexDirection: "column",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Subtotal: {data.total}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 2 }}>
          {" "}
          (including delivery charges)
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {/* Checkout Button */}

        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          Your order is {data.status}
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        {data.products.map((item) => (
          <OrderItem
            key={item._id} // Use a unique identifier
            item={item}
            cartItems={cartItems}
            onSelect={handleSelect}
          />
        ))}
      </View>

      <Pressable
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
          width: "70%",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Order Again</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ViewOrderInfo;

const styles = StyleSheet.create({});
