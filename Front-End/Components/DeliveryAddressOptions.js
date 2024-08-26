import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  RadioButton,
  PaperProvider,
  ActivityIndicator,
  Icon,
} from "react-native-paper";
import AddressesList from "./AddressesList";
import { useSelector } from "react-redux";

import { addressHandlers } from "../Handlers/addressHandler";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const AddressDeliveryList = ({ currStepHandler, setOrder, order }) => {
  const [checked, setChecked] = useState(null);
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {
    getAllAddressFunc,

    addresses,
  } = addressHandlers();

  useEffect(() => {
    setLoader(true);
    getAllAddressFunc(user.email).finally(() => {
      setLoader(false);
    });
  }, [user.email]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      getAllAddressFunc(user.email); // Await the result of getLikedItems
    } finally {
      setRefreshing(false); // Always set refreshing to false at the end
    }
  }, []);

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 20,
          marginTop: 10,
          paddingBottom: addresses.length > 0 ? 50 : 300,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0066b2"]}
          />
        }
      >
        {addresses.length > 0 ? ( //dynamically display the text based upon the number of addresses
          <Text
            style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 0.3 }}
          >
            Select Delivery Address
          </Text>
        ) : (
          //if no address found then display the text
          <Text
            style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 0.3 }}
          >
            No Address Found
          </Text>
        )}
        <Pressable>
          {addresses.length > 0 ? (
            addresses?.map((address, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  gap: 10,
                  marginVertical: 10,
                  paddingLeft: 10,
                }}
              >
                <RadioButton
                  value={index}
                  color="#0066b2"
                  status={checked == index ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(index);
                    setOrder({ ...order, address: address });
                  }}
                />

                <AddressesList
                  key={index}
                  address={address}
                  btn={checked === index}
                  stepHandler={currStepHandler}
                />
              </View>
            ))
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("AddNewAddress");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                paddingVertical: 7,
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ paddingLeft: 15 }}>Add a new Address</Text>
              <Icon source={"menu-right"} size={35} color="#333" />
            </Pressable>
          )}
        </Pressable>
      </ScrollView>

      {/* <View style={{ marginTop: 200 }} /> */}

      {loader && (
        <View style={{ marginTop: 200, alignItems: "center" }}>
          <ActivityIndicator animating={true} color="#0066b2" />
        </View>
      )}
    </PaperProvider>
  );
};

export default AddressDeliveryList;

const styles = StyleSheet.create({});
