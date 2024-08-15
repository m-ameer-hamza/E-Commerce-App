import { StyleSheet, Text, View, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";

const DeliveryOptions = ({ currStepHandler, currStep, order, setOrder }) => {
  const deliveryOptions = [
    { title: "In 7 Days", content: "FREE delivery with some delay" },
    {
      title: "Express Delivery",
      content: "Delivery Charges Apply. Delivery on the same day",
    },
    {
      title: "Self Pick up",
      content: "Pick up from the store. Small delivery charges",
    },
  ];

  const addDeliveryHandler = () => {
    if (order.delivery === "") {
      alert("Please select delivery option");
      return;
    } else {
      currStepHandler(currStep + 1);
    }
  };
  return (
    <View style={{ marginHorizontal: 15, marginTop: 5 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Select Delivery Option
      </Text>
      <View
        style={{
          flexDirection: "column",

          marginTop: 20,
        }}
      >
        <RadioButton.Group
          onValueChange={(value) => {
            let deliveryCharge = 0;

            if (value === "Express Delivery") {
              deliveryCharge = 500;
            } else if (value === "Self Pick up") {
              deliveryCharge = 100;
            } else {
              deliveryCharge = 0;
            }

            console.log(
              "Delivery Charge from delivery options",
              deliveryCharge
            );
            setOrder({
              ...order,
              delivery: value,
              deliveryCharge: deliveryCharge,
            });
          }}
          value={order.delivery}
        >
          {deliveryOptions.map((option, index) => (
            <View
              key={index} // Add this line
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",

                borderWidth: 1,
                borderColor: "#D0D0D0",
                paddingVertical: 30,
                backgroundColor: "#f9f9f9",
                marginVertical: 20,
              }}
            >
              <RadioButton.Item value={option.title} color="#0066b2" />
              <Text style={{ fontSize: 16 }}>
                <Text
                  style={{
                    color: "green",
                    fontWeight: "800",
                    fontSize: 16,
                    marginRight: 10,
                  }}
                >
                  {option.title}
                </Text>{" "}
                -{option.content}
              </Text>
            </View>
          ))}
        </RadioButton.Group>
        <Pressable
          onPress={() => {
            addDeliveryHandler();
          }}
          style={{
            backgroundColor: "#ffc72c",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeliveryOptions;

const styles = StyleSheet.create({});
