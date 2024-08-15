import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  RadioButton,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import AddressesList from "./AddressesList";
import { useSelector } from "react-redux";

import { addressHandlers } from "../Handlers/addressHandler";
import React from "react";

const AddressDeliveryList = ({ currStepHandler, setOrder, order }) => {
  const [checked, setChecked] = useState(null);
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

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
  return (
    <PaperProvider>
      <View style={{ marginHorizontal: 20, marginTop: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 0.3 }}>
          Select Delivery Address
        </Text>
        <Pressable>
          {addresses?.map((address, index) => (
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
          ))}
        </Pressable>
      </View>
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
