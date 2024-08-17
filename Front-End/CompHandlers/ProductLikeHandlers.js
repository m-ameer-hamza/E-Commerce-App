import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProductLikeHandlers = () => {
  const likeItemSaveAsync = async (item) => {
    try {
      // Retrieve the existing liked items from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("likedItems");
      let likedItems = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Add the new item to the liked items array
      likedItems.push(item);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("likedItems", JSON.stringify(likedItems));
      console.log("Item liked successfully!");
      return true;
    } catch (e) {
      console.error("Error liking the item:", e);
      return false;
    }
  };

  //This function will remove Item from Async storage
  //It takes the id of the Product
  const unlikeItemAsync = async (itemId) => {
    try {
      // Retrieve the existing liked items from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("likedItems");
      let likedItems = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Remove the item by filtering out the one with the specified itemId
      likedItems = likedItems.filter((item) => item.id !== itemId);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("likedItems", JSON.stringify(likedItems));

      return true;
    } catch (e) {
      console.error("Error unliking the item:", e);
      return false;
    }
  };

  //This function will get all liked items from Async storage
  const getLikedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("likedItems");
      const items = jsonValue != null ? JSON.parse(jsonValue) : [];

      return items;
    } catch (e) {
      console.error("Error fetching liked items:", e);
    }
  };

  //function that search for the item in the liked items
  //based upon id of item. IT should return true if found  otherwise return false
  const isItemLiked = async (itemId) => {
    try {
      const jsonValue = await AsyncStorage.getItem("likedItems");
      const items = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Check if the item with the specified itemId exists in the liked items list
      const isLiked = items.some((item) => item.id === itemId);

      return isLiked;
    } catch (e) {
      return false;
    }
  };

  return {
    likeItemSaveAsync,
    unlikeItemAsync,
    getLikedItems,
    isItemLiked,
  };
};
