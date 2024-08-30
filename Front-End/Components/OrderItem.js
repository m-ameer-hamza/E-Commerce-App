import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import { BACK_END_URL } from "../Global";
import CartItemBottom from "./CartItemBottom";

const OrderItem = ({ item, cartItems, onSelect }) => {
  const isChecked = cartItems.some((cartItem) => cartItem._id === item._id);

  const handlePress = () => {
    if (isChecked) {
      // Add item to cart
      onSelect(item);
    } else {
      // Remove item from cart
      onSelect(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <RadioButton
          value={item.id}
          status={isChecked ? "checked" : "unchecked"}
          onPress={handlePress}
          color="#0066b2"
        />
        <Pressable onPress={handlePress} style={styles.pressable}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: `${BACK_END_URL}/${item?.image}` }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text numberOfLines={2} style={styles.description}>
              {item?.description}
            </Text>
            <View style={styles.extraContainer}>
              {item?.extra?.map((extra, idx) => (
                <View key={`extra-${idx}`}>
                  {Object.keys(extra).map((key, index) => (
                    <View
                      key={`extra-${idx}-${key}-${index}`}
                      style={styles.extraRow}
                    >
                      <Text style={styles.extraKey}>{key}</Text>
                      <View style={styles.extraValueContainer}>
                        <Text style={styles.extraValue}>{extra[key]}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      </View>
      <CartItemBottom item={item} disable={true} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#d0d0d0",
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
  },
  imageContainer: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderBottomColor: "#F0F0F0",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
  description: {
    marginTop: 5,
    flexShrink: 1,
  },
  extraContainer: {
    marginTop: 15,
  },
  extraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  extraKey: {
    fontSize: 14,
    fontWeight: "600",
  },
  extraValueContainer: {
    flexDirection: "row",
    maxWidth: "50%",
  },
  extraValue: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
});
