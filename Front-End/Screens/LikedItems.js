import { StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { PaperProvider, IconButton } from "react-native-paper";
import ActivityLoader from "../Components/ActivityLoader";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LikedItems = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const getLikedItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("likedItems");
        const items = jsonValue != null ? JSON.parse(jsonValue) : [];
        setLikedItems(items); // Set the state with the retrieved items
      } catch (e) {
        console.error("Error fetching liked items:", e);
      }
    };

    getLikedItems();
    setLoading(false);
  }, [likedItems]);

  return (
    <PaperProvider>
      <Pressable
        style={{
          flexDirection: "row",

          backgroundColor: "#AFEEEE",
          height: 60,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <IconButton
          icon="menu"
          iconColor="#000"
          size={30}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ fontSize: 23, fontWeight: "500" }}> Liked Items </Text>
      </Pressable>
      <ScrollView></ScrollView>
      {loading && <ActivityLoader />}
    </PaperProvider>
  );
};

export default LikedItems;

const styles = StyleSheet.create({});
