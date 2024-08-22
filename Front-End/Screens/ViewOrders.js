import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { PaperProvider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OrderData from "../Const/OrderData";
import CurrentOrder from "../Components/CurrentOrder";
import PastOrders from "../Components/PastOrders";

const Order = () => {
  const navigation = useNavigation();
  const [newOrders, setNewOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  useEffect(() => {
    if (OrderData.length > 0) {
      let newOrder = OrderData.filter(
        (order) => order.Status === "Placed" || order.Status === "Confirmed"
      );
      setNewOrders(newOrder);

      let pastOrder = OrderData.filter(
        (order) => order.Status === "Delivered" || order.Status === "Canceled"
      );
      setPastOrders(pastOrder);
    }

    // console.log(OrderData);
  }, [OrderData]); //chnage the DEpendency array according to your need

  return (
    <PaperProvider>
      <Pressable
        style={{
          flexDirection: "row",

          backgroundColor: "#AFEEEE",

          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <IconButton
          icon="menu"
          iconColor="#000"
          size={30}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ fontSize: 25, fontWeight: "500" }}> Orders </Text>
      </Pressable>
      {OrderData?.length > 0 ? ( //check if there is any order or not
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20 }}
        >
          {newOrders?.length > 0 && //check if there is any new order or not
            newOrders.map((order, index) => (
              <CurrentOrder key={order._id || index} data={order} />
            ))}

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginVertical: 40,
              alignSelf: "center",
            }}
          >
            Past Orders
          </Text>

          {pastOrders?.length > 0 &&
            pastOrders.map((order, index) => (
              <PastOrders key={order._id || index} data={order} />
            ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>You Haven't Order any thing Yet</Text>
        </View>
      )}
    </PaperProvider>
  );
};

export default Order;

const styles = StyleSheet.create({});
