import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  setAddressModel,
  products,
  searchQuery,
  setSearchQuery,
  setSearchResults,
}) => {
  const user = useSelector((state) => state.user);

  const navigation = useNavigation();

  const displayAddress = (text) => {
    // Check if "Address" is not included in address.saveAs
    if (!text.includes("Address")) {
      return `${text} Address`;
    } else {
      return text;
    }
  };

  const searchHandler = (text) => {
    //console.log("Typed text for search is", text);
    setSearchQuery(text);
    let filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(text.toLowerCase());
    });
    // console.log(filteredProducts);

    setSearchResults(filteredProducts);
  };

  return (
    <>
      {/* Search bar View */}

      <View
        style={{
          width: "100%",
          backgroundColor: "#00CED1",

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <IconButton
          icon="menu"
          iconColor="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <TextInput
          style={{
            width: "70%",
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            fontWeight: "500",
          }}
          placeholder="Search"
          onChangeText={(text) => {
            searchHandler(text);
          }}
          value={searchQuery}
        />
        <IconButton
          icon="microphone"
          iconColor="#000"
          containerColor="#00b2b5"
          size={27}
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
