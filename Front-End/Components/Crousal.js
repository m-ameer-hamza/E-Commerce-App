import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

const images = [
  { id: "1", src: require("../assets/SliderImages/image1.png") },
  { id: "2", src: require("../assets/SliderImages/image2.png") },
  { id: "3", src: require("../assets/SliderImages/image3.png") },
];

const Carousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <Image
      source={item.src}
      style={{
        width: width * 0.98, // Set image width to 98% of screen width
        height: 200,
        resizeMode: "cover",
      }}
    />
  );

  const keyExtractor = (item) => item.id;

  return (
    <View
      style={{
        width: "98%", // Set container width to 98%
        alignSelf: "center", // Center the carousel on the screen
      }}
    >
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (width * 0.98)
          );
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

export default Carousel;
