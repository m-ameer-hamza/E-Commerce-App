import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { RadioButton, IconButton } from "react-native-paper";
import React from "react";
import { List } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const ProductInfo = ({ route }) => {
  const { product } = route.params;

  const { width } = Dimensions.get("window");
  const height = (width * 75) / 100;

  const [expandedId, setExpandedId] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [iconName, setIconName] = useState("cards-heart-outline");
  const [iconColor, setIconColor] = useState("#777");
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  //this function will handle the like button.
  //this function will change the icon and color of the icon
  const likeHandler = () => {
    if (iconName === "cards-heart-outline" && iconColor === "#777") {
      setIconName("cards-heart");
      setIconColor("#ffac1c");
    } else {
      setIconName("cards-heart-outline");
      setIconColor("#777");
    }
  };

  //this function will handle the press event of the accordion
  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  //this function will handle the value change of the radio button
  const handleValueChange = (key, value) => {
    setSelectedValues((prev) => [...prev, { [key]: value }]);
  };

  //this function will apply discount on the price.
  //it will trim any commas in the price and then apply the discount
  const applyDiscount = (price, discount) => {
    return price - (price * parseInt(discount)) / 100;
  };

  //this function will handle the add to cart button
  const addToCartHandler = (item) => {
    if (selectedValues.length !== item.extra.length) {
      alert("Please select all the options");
      return;
    }

    const product = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.images[0],
      discount: item.discount,
      extra: selectedValues,
    };

    console.log(product);
    dispatch(addToCart(product));
    setAddedToCart(true);
    alert("Product added to cart");
  };

  //console.log(product);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{ flexDirection: "row", marginTop: 25, marginBottom: "2%" }}
        >
          {product.images.map((image, index) => (
            <ImageBackground
              resizeMode="contain"
              key={index}
              source={image}
              style={{ width: width, height: height, marginRight: 10 }}
            />
          ))}
        </View>
        <View style={{ position: "absolute", bottom: 0, right: 30, zIndex: 1 }}>
          <IconButton
            icon={iconName}
            mode="contained"
            iconColor={iconColor}
            containerColor="#eee"
            size={30}
            onPress={() => {
              likeHandler();
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            {product.title}-{"  "}
            <Text style={{ fontWeight: "400", paddingLeft: 10 }}>
              {product.description}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "#caeded",

            paddingHorizontal: 20,
            paddingVertical: 15,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Sold By.</Text>
            <Text style={{ fontSize: 19, fontWeight: "600" }}>Dummy </Text>
          </View>
          <Text>Location: Lahore </Text>
        </View>
        <View
          style={{
            width: "100%",
            padding: 25,
            backgroundColor: "#e4f5f5",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {/* Check if discount is avaliable than apply the discount and display the new price */}
              {/*Inside the dynamic rendring  it will call applyDiscount Function */}
              Rs{"  "}
              {product.discount && parseInt(product.discount) > 0
                ? applyDiscount(product.price, product.discount)
                : product.price}
            </Text>

            {/*Producing old price cutting effect if discount exist */}
            {product.discount && (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  marginTop: 5,
                  textDecorationLine: "line-through",
                }}
              >
                Rs. {product.price}
              </Text>
            )}
          </View>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Item Sold: {product.sold}
          </Text>
        </View>

        <View>
          <List.AccordionGroup>
            <List.Accordion
              title="Description"
              id="1"
              titleStyle={{
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              <List.Item title={product.description} />
            </List.Accordion>
            <List.Accordion
              title="Features"
              id="2"
              titleStyle={{
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {product.features.map((feature, index) => (
                  <List.Item
                    titleNumberOfLines={1}
                    key={index}
                    title={feature}
                  />
                ))}
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          {product.extra && product.extra.length > 0 && (
            <List.Accordion title="Options" id="1">
              {product.extra.map((item, index) => {
                const key = Object.keys(item)[0]; // Get the key like "Color" or "Size"
                const values = item[key]; // Get the corresponding array

                return (
                  <List.Accordion
                    title={key}
                    id={`child-${index}`}
                    key={index}
                    expanded={expandedId === index}
                    onPress={() => handlePress(index)}
                  >
                    {values.length === 1 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          alignContent: "space-around",
                        }}
                      >
                        <RadioButton.Item
                          label={values[0]}
                          value={values[0]}
                          status={
                            selectedValues[key] === values[0]
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => handleValueChange(key, values[0])}
                        />
                      </View>
                    ) : (
                      <RadioButton.Group
                        onValueChange={(newValue) =>
                          handleValueChange(key, newValue)
                        }
                        value={selectedValues[key]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {values.map((value, subIndex) => (
                            <RadioButton.Item
                              label={value}
                              value={value}
                              key={subIndex}
                            />
                          ))}
                        </View>
                      </RadioButton.Group>
                    )}
                  </List.Accordion>
                );
              })}
            </List.Accordion>
          )}
        </View>
      </View>

      <Pressable
        onPress={() => addToCartHandler(product)}
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 15,
          marginTop: 35,
          width: "70%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Add to Cart</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#ffac1c",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",

          marginVertical: 10,
          width: "70%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});