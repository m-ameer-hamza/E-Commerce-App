import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SaleTag from "../assets/Tags/pngegg (2).png";
import { Icon } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { BACK_END_URL } from "../Global";
const Product = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const defaultValues = (extra) => {
    if (!Array.isArray(extra) || extra.length === 0) {
      return [];
    }

    return extra
      .map((item) => {
        if (
          typeof item === "object" &&
          item !== null &&
          "key" in item &&
          "values" in item &&
          Array.isArray(item.values) &&
          item.values.length > 0
        ) {
          const key = item.key;
          const value = item.values[0];

          return { [key]: value };
        }

        return {};
      })
      .filter((item) => Object.keys(item).length > 0);
  };

  const addProToCart = (item) => {
    const temp = {
      _id: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.images[0],
      discount: item.discount,
      extra: defaultValues(item.extra),
    };
    dispatch(addToCart(temp));

    alert("Product added to cart");
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProductInfo", { product: product });
      }}
      style={{
        marginVertical: 20,

        backgroundColor: "#fff",
        width: "45%",
        alignItems: "center",
      }}
    >
      {product.discount && (
        <Image
          resizeMode="contain"
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            width: 60,
            height: 60,
            zIndex: 1,
          }}
          source={SaleTag}
        />
      )}
      <Image
        resizeMode="contain"
        style={{ width: "80%", height: 150, marginTop: 5 }}
        source={{ uri: `${BACK_END_URL}/${product.images[0]}` }}
      />
      <Text
        numberOfLines={1}
        style={{
          width: 150,
          marginTop: 10,
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        {product.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Rs. {product.price}
        </Text>
        {product.sold > 0 ? (
          <Text
            style={{
              paddingLeft: 20,
              color: "#f78307",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {product.sold} Sold
          </Text>
        ) : (
          <Text
            style={{
              paddingLeft: 20,
              color: "#f77707",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            New
          </Text>
        )}
      </View>
      <Pressable
        onPress={() => {
          addProToCart(product);
        }}
        style={{
          //backgroundColor: "#ffc72c",

          backgroundColor: "#f7b707",
          padding: 10,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 20,
          width: "93%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: 0.4,
            fontSize: 15,
          }}
        >
          Add to Cart
        </Text>
        <Icon source="cart-plus" color="#000" size={23} />
      </Pressable>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({});
