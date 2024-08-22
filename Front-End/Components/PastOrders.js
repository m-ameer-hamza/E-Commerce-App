import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const PastOrders = ({ data }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("ViewOrderInfo", { data: data })}
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>Order Items</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, marginRight: 5, fontWeight: 600 }}>
              {data.Status}
            </Text>
            {data.Status == "Delivered" ? (
              <Icon source="check-circle" color="green" size={20} />
            ) : (
              <Icon source="cancel" color="red" size={20} />
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 16 }}>Date: {data.Date}</Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 5,
                fontWeight: "600",
                marginTop: 20,
              }}
            >
              Total: {data.Total}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Icon source="chevron-right" size={25} />
      </View>
    </Pressable>
  );
};

export default PastOrders;

const styles = StyleSheet.create({});
