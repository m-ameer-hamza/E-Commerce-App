import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import {
  TextInput,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import LocationView from "../Components/LocationView";
import * as Location from "expo-location";
import { addressHandlers } from "../Handlers/addressHandler";
import { useSelector } from "react-redux";
import ActivityLoading from "../Components/ActivityLoading";

const MapLocation = () => {
  const user = useSelector((state) => state.user);
  const { addAddressFunc } = addressHandlers();
  const [address, setAddress] = useState({
    province: "Select Province",
    city: "Select City",
    area: "Select Area",
    houseAddress: "",
    phoneNumber: "",
    saveAs: "",
  });
  const [yourLocation, setYourLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  //Hnadlers of the component
  const fetchLocation = async () => {
    // console.log("From fetch Loaction", yourLocation);
    if (yourLocation) {
      const location = await Location.reverseGeocodeAsync({
        latitude: yourLocation.coords.latitude,
        longitude: yourLocation.coords.longitude,
      });

      //address[0] is the object of address
      setAddress({
        ...address,
        province: location[0].region,
        city: location[0].city,
        area: location[0].district,
        houseAddress: location[0].formattedAddress,
      });
    } else {
      alert("Error fetching location details.");
    }
  };

  const saveAdressHandler = async () => {
    // console.log(address);
    if (
      address.province === "Select Province" ||
      address.city === "Select City" ||
      address.area === "Select Area" ||
      address.houseAddress === "" ||
      address.phoneNumber === ""
    ) {
      alert("Please Fill All Fields");
      return;
    } else {
      setLoading(true);
      await addAddressFunc(user.email, address);
      setLoading(false);

      ///Save Address to Database
    }

    //clear the state of address object
    setAddress({
      province: "Select Province",
      city: "Select City",
      area: "Select Area",
      houseAddress: "",
      phoneNumber: "",
      saveAs: "",
    });
  };

  return (
    <PaperProvider>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 350,
                backgroundColor: "#ddd",
                borderRadius: 30,
                marginTop: 40,
                justifyContent: "flex-end",
              }}
            >
              {!isLocationFetched && (
                <ActivityIndicator
                  size="large"
                  color="#0066b2"
                  style={{ flex: 1 }}
                />
              )}
              <LocationView
                setYourLocation={setYourLocation}
                setIsLocationFetched={setIsLocationFetched}
              />

              <Pressable
                onPress={() => fetchLocation()}
                style={{
                  backgroundColor: "#eee",
                  width: "100%",
                  paddingVertical: 10,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#0066b2",
                    alignSelf: "center",
                  }}
                >
                  Select this location
                </Text>
                <Text
                  style={{ fontSize: 13, alignSelf: "center", marginTop: 2 }}
                >
                  (Press here to get location details)
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}
            >
              Address Details
            </Text>
            <View style={{ marginTop: 30 }}>
              <Text style={{ marginBottom: 10 }}>Your Province</Text>
              <TextInput
                onChangeText={(text) =>
                  setAddress({ ...address, province: text })
                }
                mode="outlined"
                outlineColor="#D0D0D0"
                activeOutlineColor="#041E42"
                label="Province"
                contentStyle={{ fontSize: 16, letterSpacing: 1 }}
                value={address.province}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>Your City Name</Text>
              <TextInput
                onChangeText={(text) => setAddress({ ...address, city: text })}
                mode="outlined"
                outlineColor="#d0d0d0"
                activeOutlineColor="#041d5e"
                numberOfLines={1}
                value={address.city}
                label={"City"}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>Near By Area</Text>
              <TextInput
                onChangeText={(text) => setAddress({ ...address, area: text })}
                mode="outlined"
                outlineColor="#d0d0d0"
                activeOutlineColor="#041d5e"
                numberOfLines={1}
                value={address.area}
                label={"Area"}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>Complete House Address</Text>
              <TextInput
                onChangeText={(text) =>
                  setAddress({ ...address, houseAddress: text })
                }
                mode="outlined"
                outlineColor="#d0d0d0"
                activeOutlineColor="#041d5e"
                numberOfLines={1}
                value={address.houseAddress}
                label={"Address"}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>Phone Number</Text>
              <TextInput
                onChangeText={(text) =>
                  setAddress({ ...address, phoneNumber: text })
                }
                mode="outlined"
                outlineColor="#d0d0d0"
                activeOutlineColor="#041d5e"
                numberOfLines={1}
                value={address.phoneNumber}
                label={"Phone"}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10 }}>
                Save Address As (Home. Office.)
              </Text>
              <TextInput
                onChangeText={(text) =>
                  setAddress({ ...address, saveAs: text })
                }
                mode="outlined"
                outlineColor="#d0d0d0"
                activeOutlineColor="#041d5e"
                numberOfLines={1}
                value={address.saveAs}
                label={"Save"}
              />
            </View>
          </View>
          <Pressable
            onPress={saveAdressHandler}
            style={{
              backgroundColor: "#fab300",
              width: "60%",
              justifyContent: "center",
              alignContent: "center",
              paddingVertical: 15,
              borderRadius: 10,
              paddingHorizontal: 20,
              alignSelf: "center",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 17, fontWeight: "500" }}
            >
              Save Address
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      {loading && <ActivityLoading />}
    </PaperProvider>
  );
};

export default MapLocation;

const styles = StyleSheet.create({});
