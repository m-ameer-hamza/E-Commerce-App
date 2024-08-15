import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CategoriesData from "../Const/CategoriesData";
import DealsData from "../Const/DealsData";
import ProductsData from "../Const/ProductsData";

import ProductsList from "../Components/ProductList";
import DropDownList from "../Components/DropDownList";
import BottomModal from "../Components/BottomModal";
import Header from "../Components/Header";

const Home = () => {
  const [DropDownCategory, setDropDownCategory] = useState("Select Category");
  const [mainCategories, setMainCategories] = useState("All");
  const [addressModel, setAddressModel] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <PaperProvider>
        <ScrollView>
          {/* Header Component. This will be used to display the search bar and location. */}

          <Header setAddressModel={setAddressModel} />

          {/* Categories List */}

          <ScrollView
            horizontal
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 5 }}
            showsHorizontalScrollIndicator={false}
          >
            {CategoriesData.map((item, index) => {
              return (
                <Pressable
                  onPress={() => setMainCategories(item.name)}
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    elevation: 5,
                    width: 100,
                    height: 100,
                    justifyContent: "space-around",
                  }}
                >
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                      height: 50,
                      justifyContent: "center",
                    }}
                  />

                  <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {mainCategories === "All" ? (
            <View>
              {/* Image Slider */}

              {/* Hot Deals for the week */}

              <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
                Trending Deals of the week
              </Text>

              {/* Image source={require("../assets/Category/cloths.png")} */}

              <View>
                {DealsData.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("ProductInfo", { product: item });
                      }}
                      key={index}
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        elevation: 5,
                      }}
                    >
                      <Image
                        source={item.images[0]}
                        resizeMode="contain"
                        style={{
                          width: 100,
                          height: 100,
                          justifyContent: "center",
                        }}
                      />

                      <View style={{ marginLeft: 10 }}>
                        <Text
                          numberOfLines={1}
                          style={{ fontSize: 16, fontWeight: "bold" }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{ fontSize: 14, color: "#444" }}
                        >
                          {item.description}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#444" }}>
                          {item.features.map((feature, index) => (
                            <Text numberOfLines={1} key={index}>
                              {feature}{" "}
                            </Text>
                          ))}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#444" }}>
                          Rs. {"  "}
                          {item.price}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#444" }}>
                          Discount {item.discount}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <DropDownList categoryHandler={setDropDownCategory} />
              {/* Products */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {DropDownCategory === "Select Category"
                  ? ProductsData.map((item, index) => {
                      return <ProductsList key={index} product={item} />;
                    })
                  : ProductsData.filter(
                      (item) => item.name === DropDownCategory
                    ).map((item, index) => {
                      return <ProductsList key={index} product={item} />;
                    })}
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {ProductsData.filter(
                (item) => item.category === mainCategories
              ).map((item, index) => {
                return <ProductsList key={index} product={item} />;
              })}
            </View>
          )}
        </ScrollView>

        {addressModel && <BottomModal toggleState={setAddressModel} />}
      </PaperProvider>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
