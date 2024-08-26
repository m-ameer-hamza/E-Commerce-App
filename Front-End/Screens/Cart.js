import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { calculateDiscountedTotal } from "../Redux/cartSlice";
import { IconButton } from "react-native-paper";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [disTotal, setDisTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const dispatch = useDispatch();

  //THis useEffect will run when the cart array changes
  //It will calculate the discounted and cart length of the cart
  useEffect(() => {
    setCartLength(cart.cartArray?.length);
    //dispatching the action to calculate the total price of the cart

    dispatch(calculateDiscountedTotal());
    // console.log(cart.discountedTotal);

    setDisTotal(cart.discountedTotal);

    console.log(cart.cartArray.extra);
  }, [cart.cartArray, cart.discountedTotal, cart.total]);

  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header of Cart Screen */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#AFEEEE",

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 50,
          paddingHorizontal: 10,
        }}
      >
        <IconButton
          icon="menu"
          iconColor="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ fontSize: 22, fontWeight: "600" }}> Cart Screen</Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{disTotal} </Text>
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
        }}
      >
        {/* Checkout Button */}
        {cartLength > 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate("OrderConfirm");
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "400" }}>
              Proceed to Buy ({cartLength}) items
            </Text>
          </Pressable>
        ) : (
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Cart is Empty</Text>
        )}
      </Pressable>
      <View style={{ marginHorizontal: 10 }}>
        {cart.cartArray?.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
