import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
  TextInput,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Icon, PaperProvider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addressHandlers } from "../Handlers/addressHandler";

import { useSelector } from "react-redux";
import AddressesList from "../Components/AddressesList";
import ActivityLoading from "../Components/ActivityLoading";
import { Ionicons } from "@expo/vector-icons";

const AddAdress = () => {
  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.user);

  const {
    getAllAddressFunc,

    addresses,
  } = addressHandlers();

  useEffect(() => {
    setLoader(true);
    getAllAddressFunc(user.email).finally(() => {
      setLoader(false);
    });
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAddressFunc(user.email).finally(() => {
      setRefreshing(false);
    });
  }, [user.email, getAllAddressFunc]);

  return (
    <PaperProvider>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#f58d25"]}
          />
        }
      >
        <View
          style={{
            backgroundColor: "#00CED1",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
            alignContent: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="black"
            onPress={() => navigation.goBack()}
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
            onChangeText={setSearchQuery}
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
        <View style={{ padding: 10, paddingLeft: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Saved Addresses
          </Text>
        </View>
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

        {addresses &&
          addresses.length > 0 &&
          addresses.map((address, index) => (
            <AddressesList key={index} address={address} btn={false} />
          ))}
      </ScrollView>
      {loader && <ActivityLoading />}
    </PaperProvider>
  );
};

export default AddAdress;

const styles = StyleSheet.create({});
