import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LocationView = ({ setYourLocation, setIsLocationFetched }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        alert("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setYourLocation(location);
      } catch (error) {
        setErrorMsg("Error fetching location");
        alert("Error fetching location");
      } finally {
        setIsLocationFetched(true); // Stop loading indicator
      }
    })();
  }, []);

  const handleChangeRegion = (region) => {
    setLocation({
      coords: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005, // zoom level
            longitudeDelta: 0.005, // zoom level
          }}
          showsUserLocation={true}
          onRegionChangeComplete={handleChangeRegion} // Remove parentheses to properly pass the function
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"This is where you are"}
          />
        </MapView>
      ) : (
        <Text style={{ alignSelf: "center", marginVertical: 5 }}>
          {errorMsg || "Fetching location..."}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationView;
