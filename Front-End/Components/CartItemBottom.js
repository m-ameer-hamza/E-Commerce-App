import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";

import { useDispatch } from "react-redux";
import { removeItemCart, addToCart } from "../Redux/cartSlice";

const CartItemBottom = ({ item }) => {
  const dispatch = useDispatch();
  // This function calculates the price of the item
  //applay discount if avaliable
  // It takes the price, quantity and discount of the item as arguments

  const itemPriceCalculation = (cost, number, less) => {
    // Remove commas and spaces from the price string

    // Convert the cleaned price string to a number

    // Initialize the final price to the original price
    let finalPrice = cost;

    // Check if discount is not an empty string
    if (less !== "") {
      // Remove the "%" sign from the discount and convert it to a number
      const discountNumber = Number(less.replace("%", "").trim());

      // Apply the discount to the price
      finalPrice = cost - (cost * discountNumber) / 100;
    }

    // Calculate the total for the current item
    return finalPrice * number;
  };

  const addProductHandler = (product) => {
    dispatch(addToCart(product));
  };

  const decreaseProHandler = (product) => {
    dispatch(removeItemCart(product._id));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#D0D0D0",
          borderRadius: 7,

          justifyContent: "center",
        }}
      >
        <Text>Quantity {item?.quantity}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Pressable onPress={() => decreaseProHandler(item)}>
          {item && item.quantity > 1 ? (
            <Icon source="minus" size={30} color="#333" />
          ) : (
            <Icon source="trash-can" size={30} color="#333" />
          )}
        </Pressable>

        <View
          style={{
            backgroundColor: "#D0D0D0",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 7,
            paddingHorizontal: 50,
            alignItems: "center",
            backgroundColor: "#fab305",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Rs.{" "}
            {itemPriceCalculation(item?.price, item?.quantity, item?.discount)}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            addProductHandler(item);
          }}
        >
          <Icon source="plus" size={30} color="#333" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartItemBottom;

const styles = StyleSheet.create({});
