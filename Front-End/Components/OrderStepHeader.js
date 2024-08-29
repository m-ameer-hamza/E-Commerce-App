import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderStepHeader = ({ currStep, setCurrStep }) => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Form" },
    { title: "Payment", content: "Payment Form" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
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
          <Pressable
            onPress={() => {
              if (index < currStep) {
                // Go to step index

                if (index === 0) {
                  setCurrStep(0);
                }
                if (index === 1) {
                  setCurrStep(1);
                }
                if (index === 2) {
                  setCurrStep(2);
                }
                if (index === 3) {
                  setCurrStep(3);
                }
              }
            }}
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
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OrderStepHeader;

const styles = StyleSheet.create({});
