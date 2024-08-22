import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextBase,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Portal, Modal, Button } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addressHandlers } from "../Handlers/addressHandler";
import BottomModelAddresses from "./BottomModelAddresses";
import { ActivityIndicator } from "react-native-paper";

const BottomModal = ({ toggleState }) => {
  const navigation = useNavigation();
  const {
    getAllAddressFunc,

    addresses,
  } = addressHandlers();

  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

  // Fetching all addresses of the user from the backend
  //useEffect will run only once when the component is mounted
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoader(true);
        await getAllAddressFunc(user.email);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchAddresses();
  }, []);

  //Function to hide the modal when presed on the overlay
  const hideModal = () => {
    toggleState(false);
  };

  return (
    <View style={styles.container}>
      <Portal>
        <TouchableOpacity style={styles.overlay} onPress={hideModal} />

        <Modal
          visible={true}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location
            </Text>
          </View>

          {/* Display the loading spinner when the loader is true( when request )
            is fetching data for addresses from backend*/}
          {loader ? (
            <View
              style={{
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator animating={true} color="#0066b2" />
            </View>
          ) : (
            <ScrollView
              horizontal
              contentContainerStyle={{ gap: 50 }}
              showsHorizontalScrollIndicator={false}
            >
              {/* Displaying address dynamically by passing data to component */}
              {/* <BottomModelAddresses  toggleState={toggleState} /> */}

              {addresses && addresses.length > 0
                ? addresses
                    .slice(0, 3)
                    .map((address, index) => (
                      <BottomModelAddresses
                        key={index}
                        data={address}
                        toggleState={toggleState}
                      />
                    ))
                : null}

              <Pressable
                onPress={() => {
                  hideModal();
                  navigation.navigate("Address");
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
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0066b2",
                    fontWeight: "500",
                  }}
                >
                  Add an address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
          )}

          <View
            style={{
              flexDirection: "column",
              marginVertical: 10,
            }}
          >
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              onPress={() => {
                hideModal();
                navigation.navigate("Address");
              }}
            >
              <IconButton
                icon="map-marker-plus"
                iconColor="#0066b2"
                size={30}
                onPress={() => {
                  hideModal();
                  navigation.navigate("Address");
                }}
              />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an address
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("MapLocation")}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <IconButton
                icon="crosshairs-gps"
                iconColor="#0066b2"
                size={30}
                onPress={() => console.log("Modal Location")}
              />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use my current location
              </Text>
            </Pressable>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BottomModal;
