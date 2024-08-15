import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";

const Header = ({ setAddressModel }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.user);

  const displayAddress = (text) => {
    // Check if "Address" is not included in address.saveAs
    if (!text.includes("Address")) {
      return `${text} Address`;
    } else {
      return text;
    }
  };

  return (
    <>
      {/* Search bar View */}

      <View
        style={{
          width: "100%",
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: 60,
        }}
      >
        <TextInput
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            fontWeight: "500",
          }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <IconButton
          icon="microphone"
          iconColor="#000"
          size={35}
          onPress={() => console.log("Pressed")}
        />
      </View>

      {/* Location View */}
      <Pressable
        onPress={() => setAddressModel(true)}
        style={{
          flexDirection: "row",
          gap: 5,
          height: 55,
          paddingHorizontal: 10,
          alignItems: "center",
          backgroundColor: "#AFEEEE",
        }}
      >
        <IconButton
          icon="google-maps"
          iconColor="#444"
          size={35}
          onPress={() => console.log("Location")}
        />
        <Pressable
          onPress={() => {
            setAddressModel(true);
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", letterSpacing: 0.5 }}>
            Devilered to
          </Text>
          {/* User Address */}
          {user.userAddresses.length > 0 ? (
            <Text>
              {displayAddress(user.userAddresses[0].saveAs)} -{" "}
              {user.userAddresses[0].city}
            </Text>
          ) : (
            <Text> Select Address </Text>
          )}
        </Pressable>
        <IconButton
          style={{ marginLeft: "auto" }}
          icon="menu-down"
          iconColor="#444"
          size={35}
          onPress={() => setAddressModel(true)}
        />
      </Pressable>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
