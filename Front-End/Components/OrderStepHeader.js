import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OrderStepHeader = ({ currStep }) => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Form" },
    { title: "Payment", content: "Payment Form" },
    { title: "Place Order", content: "Order Summary" },
  ];
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        {steps.map((step, index) => (
          <View
            key={index}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {index > 0 && (
              <View
                style={[
                  { flex: 1, height: 2, backgroundColor: "green" },
                  index <= currStep && { backgroundColor: "green" },
                ]}
              ></View>
            )}
            <View
              style={[
                {
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "#ccc",
                  justifyContent: "center",
                  alignItems: "center",
                },
                index < currStep && { backgroundColor: "green" },
              ]}
            >
              {index < currStep ? (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                >
                  &#10003;
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            <Text style={{ textAlign: "center", marginTop: 8 }}>
              {step.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderStepHeader;

const styles = StyleSheet.create({});
