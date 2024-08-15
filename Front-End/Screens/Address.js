import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Icon, PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addressHandlers } from "../Handlers/addressHandler";
import ActivityLoader from "../Components/ActivityLoader";
import { useSelector } from "react-redux";
import AddressesList from "../Components/AddressesList";
const AddAdress = () => {
  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
            colors={["#19bd2c"]}
          />
        }
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Your Addresses
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
      {loader && <ActivityLoader />}
    </PaperProvider>
  );
};

export default AddAdress;

const styles = StyleSheet.create({});
