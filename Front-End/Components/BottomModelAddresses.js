import { View, Text, Pressable } from "react-native";
import { Icon } from "react-native-paper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAddress } from "../Redux/userSlice";

const BottomModelAddresses = ({ toggleState, data }) => {
  const [pickedAddress, setPickedAddress] = useState(false);

  const dispatch = useDispatch();

  const displayAddress = (text) => {
    // Check if "Address" is not included in address.saveAs
    if (!text.includes("Address")) {
      return `${text} Address`;
    } else {
      return text;
    }
  };

  const hideModal = () => {
    toggleState(false);
  };

  const selectedAddress = () => {
    dispatch(saveAddress(data));
    hideModal();
  };

  return (
    <Pressable
      onPressOut={() => {
        selectedAddress();
      }}
      style={{
        width: 185,
        height: 145,
        borderColor: "#D0D0D0",
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            letterSpacing: 0.2,
            marginBottom: 5,
          }}
        >
          {displayAddress(data.saveAs)}
        </Text>
        <Icon source="google-maps" size={30} color="#db1f38" />
      </View>
      <Text style={{ textAlign: "center", fontSize: 14 }} numberOfLines={1}>
        {data.houseAddress}
      </Text>
      <Text
        style={{ textAlign: "center", fontSize: 15, marginTop: 4 }}
        numberOfLines={1}
      >
        {data.city}
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          fontSize: 15,
          fontWeight: "500",
          flexWrap: "wrap",
        }}
      >
        {data.province}, {data.phoneNumber}{" "}
      </Text>
    </Pressable>
  );
};

export default BottomModelAddresses;
