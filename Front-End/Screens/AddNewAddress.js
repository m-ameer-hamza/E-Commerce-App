import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { List, TextInput, PaperProvider } from "react-native-paper";
import ActivityLoader from "../Components/ActivityLoader";
import { addressHandlers } from "../Handlers/addressHandler";
import { useSelector } from "react-redux";

const AddNewAddress = () => {
  const [loading, setLoading] = useState(false);

  const [expandedL1, setExpandedL1] = useState(false);
  const [expandedL2, setExpandedL2] = useState(false);
  const [expandedL3, setExpandedL3] = useState(false);

  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [address, setAddress] = useState({
    province: "Select Province",
    city: "Select City",
    area: "Select Area",
    houseAddress: "",
    phoneNumber: "",
    saveAs: "",
  });

  const user = useSelector((state) => state.user);

  const { addAddressFunc } = addressHandlers();

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

  const toggleExpandedL1 = () => {
    setExpandedL1(!expandedL1);
  };

  const toggleExpandedL2 = () => {
    if (address.province === "Select Province") {
      setAddressError(true);
    } else {
      setExpandedL2(!expandedL2);
      setAddressError(false);
    }
  };

  const toggleExpandedL3 = () => {
    if (address.city === "Select City") {
      setCityError(true);
    } else {
      setExpandedL3(!expandedL3);
      setCityError(false);
    }
  };

  return (
    <PaperProvider>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: "7%" }}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 21,
            fontWeight: "500",
            letterSpacing: 0.8,
          }}
        >
          Add New Address
        </Text>

        {addressError && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 17,
              fontWeight: "300",
              letterSpacing: 0.4,
              color: "red",
            }}
          >
            *Please Select Province First
          </Text>
        )}

        {cityError && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 17,
              fontWeight: "300",
              letterSpacing: 0.4,
              color: "red",
            }}
          >
            *Please Select City First
          </Text>
        )}

        <View style={{ marginTop: 30, flexDirection: "column" }}>
          {/* Province */}
          <Text style={{ marginTop: "6%", fontSize: 15 }}>
            {" "}
            Choose Your Province from List
          </Text>
          <List.Accordion
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
            }}
            title={address.province}
            expanded={expandedL1}
            onPress={toggleExpandedL1}
          >
            <List.Item
              title="Punjab"
              onPress={() => {
                setAddress({ ...address, province: "Punjab" });
                setExpandedL1(!expandedL1);
              }}
            />
            <List.Item
              title="Sindh"
              onPress={() => {
                setAddress({ ...address, province: "Sindh" });
                setExpandedL1(!expandedL1);
              }}
            />
          </List.Accordion>

          {/* City */}
          <Text style={{ marginTop: "10%", fontSize: 15 }}>
            {" "}
            Choose Your City from List
          </Text>
          <List.Accordion
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
            }}
            title={address.city}
            expanded={expandedL2}
            onPress={toggleExpandedL2}
          >
            {address.province === "Punjab" ? (
              <>
                <List.Item
                  title="Lahore"
                  onPress={() => {
                    setAddress({ ...address, city: "Lahore" });
                    setExpandedL2(!expandedL2);
                  }}
                />
                <List.Item
                  title="Multan"
                  onPress={() => {
                    setAddress({ ...address, city: "Multan" });
                    setExpandedL2(!expandedL2);
                  }}
                />
              </>
            ) : (
              <>
                <List.Item
                  title="Karachi"
                  onPress={() => {
                    setAddress({ ...address, city: "Karachi" });
                    setExpandedL2(!expandedL2);
                  }}
                />
                <List.Item
                  title="Naushahro Feroze"
                  onPress={() => {
                    setAddress({ ...address, city: "Naushahro Feroze" });
                    setExpandedL2(!expandedL2);
                  }}
                />
              </>
            )}
          </List.Accordion>

          {/* Area */}
          <Text style={{ marginTop: "10%", fontSize: 15 }}>
            {" "}
            Choose Your Area from List
          </Text>
          <List.Accordion
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
            }}
            title={address.area}
            expanded={expandedL3}
            onPress={toggleExpandedL3}
          >
            {address.city === "Lahore" && (
              <>
                <List.Item
                  title="Johar Town"
                  onPress={() => {
                    setAddress({ ...address, area: "Johar Town" });
                    setExpandedL3(!expandedL3);
                  }}
                />
                <List.Item
                  title="Model Town"
                  onPress={() => {
                    setAddress({ ...address, area: "Model Town" });
                    setExpandedL3(!expandedL3);
                  }}
                />
              </>
            )}
            {address.city === "Multan" && (
              <>
                <List.Item
                  title="Bosan Road"
                  onPress={() => {
                    setAddress({ ...address, area: "Bosan Road" });
                    setExpandedL3(!expandedL3);
                  }}
                />
                <List.Item
                  title="Cantt"
                  onPress={() => {
                    setAddress({ ...address, area: "Cantt" });
                    setExpandedL3(!expandedL3);
                  }}
                />
              </>
            )}
            {address.city === "Karachi" && (
              <>
                <List.Item
                  title="Clifton"
                  onPress={() => {
                    setAddress({ ...address, area: "Clifton" });
                    setExpandedL3(!expandedL3);
                  }}
                />
                <List.Item
                  title="Gulshan-e-Iqbal"
                  onPress={() => {
                    setAddress({ ...address, area: "Gulshan-e-Iqbal" });
                    setExpandedL3(!expandedL3);
                  }}
                />
              </>
            )}
            {address.city === "Naushahro Feroze" && (
              <>
                <List.Item
                  title="Bhirya Road"
                  onPress={() => {
                    setAddress({ ...address, area: "Bhirya Road" });
                    setExpandedL3(!expandedL3);
                  }}
                />
                <List.Item
                  title="Kandiaro"
                  onPress={() => {
                    setAddress({ ...address, area: "Kandiaro" });
                    setExpandedL3(!expandedL3);
                  }}
                />
              </>
            )}
          </List.Accordion>
        </View>

        {/*Phone Number*/}
        <Text style={{ marginTop: "12%", fontSize: 15 }}>
          {" "}
          Enter Your Phone Number
        </Text>
        <TextInput
          onChangeText={(text) => setAddress({ ...address, phoneNumber: text })}
          mode="outlined"
          style={{ marginTop: "5%", padding: 2 }}
          outlineColor="#d0d0d0"
          activeOutlineColor="#f77707"
          numberOfLines={1}
          value={address.phoneNumber}
        />
        {/* House */}
        <Text style={{ marginTop: "12%", fontSize: 15 }}>
          {" "}
          Enter Your Complete Address
        </Text>
        <TextInput
          onChangeText={(text) =>
            setAddress({ ...address, houseAddress: text })
          }
          mode="outlined"
          style={{ marginTop: "5%", padding: 10 }}
          outlineColor="#d0d0d0"
          activeOutlineColor="#f77707"
          numberOfLines={5}
          multiline={true}
          value={address.houseAddress}
        />

        {/* Safe As */}
        <Text style={{ marginTop: "12%", fontSize: 15 }}>
          {" "}
          Safe Address as (Home, Office, etc)
        </Text>
        <TextInput
          onChangeText={(text) => setAddress({ ...address, saveAs: text })}
          mode="outlined"
          style={{ marginTop: "5%" }}
          outlineColor="#d0d0d0"
          activeOutlineColor="#f77707"
          numberOfLines={1}
          value={address.saveAs}
        />

        <Pressable
          onPress={saveAdressHandler}
          style={{
            backgroundColor: "#f78307",
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
      {loading && <ActivityLoader />}
    </PaperProvider>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({});
