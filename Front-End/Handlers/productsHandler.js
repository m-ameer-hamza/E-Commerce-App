import { useState, useEffect } from "react";

import { useProductsApi } from "../CustomeHooks/useProductsApi";
import { BACK_END_URL } from "../Global";
export const productHandler = () => {
  const [clicked, setIsClicked] = useState(false);

  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);

  const {
    getAllProducts,

    searchProduct,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
    setStatusCode,
  } = useProductsApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Provide Details") {
        alert("Provide Details");
      } else if (error === "User not authenticated") {
        alert("User is Not Logined In");
      } else if (error === "Product not found") {
        alert("Products not found");
      } else {
        alert("Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //clear the states
      setError(false);
      setLoading(false);
      setResponse(false);

      if (response.message === "Product Added" || statusCode == 201) {
        alert(" Product Added Successfully");
      } else if (response.message === "Products Fetched") {
        setProducts(response.products);
        setSaleProducts(response.discountedProducts);
      } else if (response.message === "Product Searched!!") {
        console.log(
          "From Products Handler Searched Products is",
          response.data
        );
        setSearchedProduct(response.data);
      }
    }
  }, [response, error]);

  const getAllProductsFunc = async (page) => {
    setIsClicked(true);

    let url = `${BACK_END_URL}/e-commerce/products`;
    try {
      await getAllProducts(url, page);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const searchProductFunc = async (productId) => {
    setIsClicked(true);

    try {
      const url = `${BACK_END_URL}/products`;
      await searchProduct(url, productId);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    getAllProductsFunc,

    searchProductFunc,
    saleProducts,
    searchedProduct,
    products,
  };
};
