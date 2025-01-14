import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  View,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { PaperProvider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ActivityLoading from "../Components/ActivityLoading";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import CurrentOrder from "../Components/CurrentOrder";
import PastOrders from "../Components/PastOrders";
import { orderHandler } from "../Handlers/orderHandler";
import ReduxStore from "../Redux/store";

const Order = () => {
  const { fetchOrderFunc, UsrOrders } = orderHandler();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.user);

  //This useEffect will fetch the orders of the user
  const fetchOrders = useCallback(() => {
    setLoading(true);
    try {
      fetchOrderFunc(user.email); // Fetch orders using the email from Redux state
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useFocusEffect(fetchOrders);

  //This useEffect will set the orders in the state
  useEffect(() => {
    if (UsrOrders) {
      // console.log("Orders are From View Order Screen", UsrOrders);
      setOrderData(UsrOrders);
    }
    setLoading(false);
  }, [UsrOrders]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      fetchOrderFunc(ReduxStore.getState().user.email); // Await the result of getLikedItems
    } finally {
      setRefreshing(false); // Always set refreshing to false at the end
    }
  }, []);

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginTop: 20,
          paddingBottom: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0066b2"]}
          />
        }
      >
        {orderData?.length > 0 ? (
          <>
            {orderData
              .filter(
                (order) =>
                  order.status === "Placed" || order.status === "Confirmed"
              )
              .map((order) => (
                <CurrentOrder key={order._id} data={order} />
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

            {orderData
              .filter(
                (order) =>
                  order.status === "Delivered" || order.status === "Cancel"
              )
              .map((order) => (
                <PastOrders key={order._id} data={order} />
              ))}
          </>
        ) : (
          <Text
            style={{
              marginTop: "70%",
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            You Haven't Ordered Anything Yet
          </Text>
        )}
        {loading && <ActivityLoading />}
      </ScrollView>
    </PaperProvider>
  );
};

export default Order;

const styles = StyleSheet.create({});
