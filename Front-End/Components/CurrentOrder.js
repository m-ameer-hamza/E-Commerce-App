import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CurrentOrder = ({ data }) => {
  const navigation = useNavigation();
  function formatDate(mongoDate) {
    // Split the date string at the 'T' character to separate date and time
    const datePart = mongoDate.split("T")[0];
    return datePart;
  }
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ViewOrderInfo", { data: data });
      }}
      style={{
        flexDirection: "column",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "grey",
        paddingVertical: 10,
        marginVertical: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18 }}>Order Items</Text>
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            backgroundColor: "#d0d0d0",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "400",
              marginRight: 20,
            }}
          >
            Total
          </Text>
          <Text style={{ color: "black", fontSize: 18, fontWeight: "600" }}>
            {data.total}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 40,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "green",
            fontSize: 25,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {data.status} ......
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 16 }}>Date: {formatDate(data.orderDate)}</Text>
        <Text style={{ fontSize: 16 }}>Id: {data._id.substring(0, 8)}</Text>
      </View>
    </Pressable>
  );
};

export default CurrentOrder;

const styles = StyleSheet.create({});
