import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";

const AddressesList = ({ address, btn, stepHandler }) => {
  const displayAddress = (text) => {
    // Check if "Address" is not included in address.saveAs
    if (!text.includes("Address")) {
      return `${text} Address`;
    } else {
      return text;
    }
  };

  return (
    <Pressable
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 13,
      }}
    >
      <Pressable
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          gap: 10,

          marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 3,
              width: "65%",
              marginLeft: 10,
              alignItems: "flex-start",
            }}
          >
            <View style={{ flexDirection: "row", paddingBottom: 10, gap: 15 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", letterSpacing: 0.5 }}
              >
                {displayAddress(address.saveAs)}
              </Text>
              <Icon source="google-maps" size={26} color="red" />
            </View>
            <Text style={{ fontSize: 14, letterSpacing: 0.4 }}>
              {address.houseAddress}
            </Text>
            <Text
              style={{ fontSize: 14, letterSpacing: 0.3, fontWeight: "600" }}
            >
              {" "}
              {address.area}, {address.city}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                letterSpacing: 0.2,
                marginTop: 10,
              }}
            >
              {address.province}
            </Text>

            <View style={{ flexDirection: "row", gap: 30, paddingTop: 10 }}>
              <Text>Phone: </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                03074110646
              </Text>
            </View>
          </View>
          <View>
            <Pressable>
              <Icon source="pencil" size={25} color="#333" />
            </Pressable>
          </View>
        </View>
      </Pressable>
      {btn && (
        <Pressable
          onPress={() => {
            stepHandler(1);
          }}
          style={{
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#f0960e",
            width: "80%",
          }}
        >
          <Text>Deliver to this Address</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default AddressesList;

const styles = StyleSheet.create({});
