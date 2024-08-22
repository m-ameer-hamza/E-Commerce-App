import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

import CartItemBottom from "./CartItemBottom";
const CartItem = ({ item, index }) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <Pressable
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            borderBottomColor: "#F0F0F0",
            borderWidth: 2,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
          }}
          key={index}
        >
          <Image
            resizeMode="contain"
            source={item?.image}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item?.title}</Text>
          <Text numberOfLines={1}>{item?.description}</Text>
          <View style={{ marginTop: 15 }}>
            {item?.extra?.map((extra, index) => (
              <View key={index}>
                {Object.keys(extra).map((key, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      {key}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        key={index}
                        style={{ fontSize: 14, fontWeight: "500" }}
                      >
                        {extra[key]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Pressable>
      {/* This component will display  price and qunatity of the item
      . It recieves complete item as a object */}

      <CartItemBottom item={item} />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
