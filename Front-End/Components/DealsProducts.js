import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACK_END_URL } from "../Global";

const DealsProducts = ({ item, key }) => {
  //index
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProductInfo", {
          product: item,
        });
      }}
      key={key}
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 3,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Image
        source={{
          uri: `${BACK_END_URL}/${item.images[0]}`,
        }}
        resizeMode="contain"
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
        }}
      />

      <View style={{ marginLeft: 10 }}>
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold" }}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={{ fontSize: 14, color: "#444" }}>
          {item.description}
        </Text>
        <Text style={{ fontSize: 14, color: "#444" }}>
          {item.features.map((feature, index) => (
            <Text numberOfLines={1} key={index}>
              {feature}{" "}
            </Text>
          ))}
        </Text>
        <Text style={{ fontSize: 14, color: "#444" }}>
          Rs. {"  "}
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#f58d25",
            marginTop: 5,
            fontWeight: "700",
          }}
        >
          Discount {item.discount}
        </Text>
      </View>
    </Pressable>
  );
};

export default DealsProducts;

const styles = StyleSheet.create({});
