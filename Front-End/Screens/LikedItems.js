import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { PaperProvider, IconButton } from "react-native-paper";
import ActivityLoader from "../Components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LikedItems = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state
  const navigation = useNavigation();

  const getLikedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("likedItems");
      const items = jsonValue != null ? JSON.parse(jsonValue) : [];
      setLikedItems(items); // Set the state with the retrieved items
    } catch (e) {
      console.error("Error fetching liked items:", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getLikedItems();
    setLoading(false);
    console.log("Liked Items useEffect");
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLikedItems().finally(() => {
      setRefreshing(false);
    });
  }, []);

  // This function will remove the liked item from the liked items list
  const unlikeItem = async (itemId) => {
    setLoading(true);
    try {
      // Retrieve the existing liked items from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("likedItems");
      let likedItems = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Remove the item by filtering out the one with the specified itemId
      likedItems = likedItems.filter((item) => item.id !== itemId);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("likedItems", JSON.stringify(likedItems));

      // Update the state with the new list
      setLikedItems(likedItems);

      alert("Item unliked successfully");
    } catch (e) {
      console.error("Error unliking the item:", e);
      alert("Error unliking the item");
    }
    setLoading(false);
  };

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
        <Text style={{ fontSize: 23, fontWeight: "500" }}>Liked Items</Text>
      </Pressable>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0066b2"]}
          />
        }
      >
        {likedItems.length > 0 ? (
          <View style={{ padding: 10 }}>
            {likedItems.map((item, index) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("ProductInfo", { product: item });
                }}
                key={index}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  margin: 3,
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.images[0]}
                  resizeMode="contain"
                  style={{
                    width: 140,
                    height: 150,
                    justifyContent: "center",
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    margin: 10,
                    gap: 10,
                    paddingRight: 10,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{ fontSize: 14, color: "#444" }}
                  >
                    {item.description}
                  </Text>
                  <View>
                    {item.features.map((feature, index) => (
                      <Text
                        numberOfLines={2}
                        key={index}
                        style={{ fontSize: 14, color: "#444" }}
                      >
                        {feature}
                      </Text>
                    ))}
                  </View>
                  <Text style={{ fontSize: 14, color: "#444" }}>
                    Rs. {"  "}
                    {item.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.discount && (
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#f58d25",
                          fontWeight: "700",
                        }}
                      >
                        Discount {item.discount}
                      </Text>
                    )}
                  </View>
                </View>

                <IconButton
                  onPress={() => {
                    unlikeItem(item.id);
                  }}
                  icon="heart"
                  iconColor="#ffac1c"
                  size={25}
                  containerColor="#eee"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                />
              </Pressable>
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: "30%",
            }}
          >
            <Text style={{ fontSize: 20, color: "#444" }}>
              No liked items found.
            </Text>
            <Text style={{ fontSize: 16, color: "#888", marginTop: 10 }}>
              Refresh the page.
            </Text>
          </View>
        )}
      </ScrollView>

      {loading && <ActivityLoader />}
    </PaperProvider>
  );
};

export default LikedItems;

const styles = StyleSheet.create({});
