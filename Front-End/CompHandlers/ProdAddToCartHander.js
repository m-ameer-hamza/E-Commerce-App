import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

export const ProdAddToCartHander = () => {
  const dispatch = useDispatch();

  const objToArray = (obj) => {
    // Initialize an empty array
    const resultArray = [];

    // Iterate over each key-value pair in the object
    for (const [key, value] of Object.entries(obj)) {
      // Push a new object with the current key-value pair into the result array
      resultArray.push({ [key]: value });
    }

    // Return the resulting array
    console.log(resultArray);
    return resultArray;
  };
  //this function will add the product to cart

  const addProductToCart = (prod, selectedValues) => {
    console.log("Selected Values", selectedValues);
    console.log("Product", prod);

    if (Object.keys(selectedValues).length !== prod.extra.length) {
      alert("Please select all the options");
      return false;
    }

    const product = {
      _id: prod._id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      image: prod.images[0],
      discount: prod.discount,
      extra: objToArray(selectedValues),
    };

    dispatch(addToCart(product));

    alert("Product added to cart");
    return true;
  };

  return {
    addProductToCart,
  };
};
