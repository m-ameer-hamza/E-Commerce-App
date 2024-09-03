import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import CategoriesData from "../Const/CategoriesData";

import ProductsList from "../Components/ProductList";
import DropDownList from "../Components/DropDownList";
import BottomModal from "../Components/BottomModal";
import Header from "../Components/Header";
import ActiivityLoading from "../Components/ActivityLoading";
import { productHandler } from "../Handlers/productsHandler";
import DealsProducts from "../Components/DealsProducts";
import Crousal from "../Components/Crousal";

const Home = () => {
  const [DropDownCategory, setDropDownCategory] = useState("Select Category");
  const [mainCategories, setMainCategories] = useState("All");
  const [addressModel, setAddressModel] = useState(false);

  const [page, setPage] = useState(1);
  const [DealsData, setDealsData] = useState([]);
  const [ProductsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { getAllProductsFunc, products, saleProducts } = productHandler();

  useEffect(() => {
    setLoading(true);
    getAllProductsFunc(page);

    setLoading(false);
  }, []);

  useEffect(() => {
    setProductsData(products);
    if (saleProducts.length > 0) {
      setDealsData(saleProducts);
    }
  }, [products]);

  const filteredProducts = ProductsData.filter(
    (item) => item.category === mainCategories
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // 10 seconds

    if (products.length > 0) {
      clearTimeout(timer); // Clear the timer if products.length > 0
      setLoading(false);
    }

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [products]);

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <PaperProvider>
          <ScrollView>
            {/* Header Component. This will be used to display the search bar and location. */}

            <Header
              setAddressModel={setAddressModel}
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSearchResults={setSearchResults}
            />

            {/* Search Query. If search query is empty than display all item. otherwise display 
          search Result */}
            {searchQuery === "" ? (
              <View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 5 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    // Main Categories. It will display all the main categories card with horizontal scroll
                    // and when user click on any category it will display the products of that category.
                    CategoriesData.map((item, index) => {
                      const backgroundColor =
                        item.id === 1
                          ? "#fff"
                          : item.id === selectedCategoryId
                            ? "#eee"
                            : "#fff";

                      return (
                        <Pressable
                          onPress={() => {
                            setSelectedCategoryId(item.id);
                            setMainCategories(item.name);
                          }}
                          key={index}
                          style={{
                            backgroundColor: backgroundColor,
                            margin: 10,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 2,
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
                            style={{
                              textAlign: "center",
                              fontSize: 12,
                              marginTop: 5,
                            }}
                          >
                            {item.name}
                          </Text>
                        </Pressable>
                      );
                    })
                  }
                </ScrollView>

                {/* This will display the Crousal cmponent. */}
                {/* The crousal is present in the Components folder. It is used to display the images in a slider. */}
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                  }}
                >
                  <Crousal />
                </View>
                {mainCategories === "All" ? (
                  // This View will be displayed on default when no category is seleceted from the main top.
                  // It will display all the products.
                  //This is the default option
                  <View>
                    {/* Trending Deals for the week */}

                    <Text
                      style={{ padding: 15, fontSize: 20, fontWeight: "bold" }}
                    >
                      Trending Deals of the week
                    </Text>

                    <View>
                      {DealsData.map((item, index) => {
                        return (
                          <DealsProducts
                            key={item._id}
                            index={index}
                            item={item}
                          />
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
                        justifyContent: "space-around",
                        marginTop: 20,
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
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((item, index) => (
                        <ProductsList key={index} product={item} />
                      ))
                    ) : (
                      <Text
                        style={{
                          marginLeft: 80,
                          marginTop: 180,
                          fontSize: 18,
                          fontWeight: "500",
                        }}
                      >
                        Sorry! No Products Available
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ) : (
              //This View will be displayed when the user types in the search bar.
              <View>
                <Text style={{ padding: 15, fontSize: 20, fontWeight: "bold" }}>
                  Search Results
                </Text>
                <View>
                  {searchResults?.map((item, index) => {
                    return (
                      <DealsProducts key={item._id} index={index} item={item} />
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>

          {addressModel && <BottomModal toggleState={setAddressModel} />}
        </PaperProvider>
      </View>
      {loading && <ActiivityLoading />}
    </PaperProvider>
  );
};

export default Home;

const styles = StyleSheet.create({});
