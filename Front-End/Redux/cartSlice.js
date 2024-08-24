// Initial state of the cart
const initialStateCart = {
  cartArray: [],
  total: 0,
  discountedTotal: 0,
  paymentInstanceKey: "",
};

// Reducer function
export default cartSlice = (state = initialStateCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      // Check if product is already in the cart
      const existingProduct = state.cartArray.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // If the product exists, increment the quantity
        const updatedCart = state.cartArray.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        return { ...state, cartArray: updatedCart };
      } else {
        // If the product doesn't exist, add it with quantity 1
        const updatedCart = [...state.cartArray, { ...product, quantity: 1 }];
        return { ...state, cartArray: updatedCart };
      }
    }

    case "REMOVE_FROM_CART": {
      const productId = action.payload;
      // Find the index of the product in the cart
      const index = state.cartArray.findIndex((item) => item._id === productId);

      if (index !== -1) {
        const product = state.cartArray[index];
        // Decrease the quantity or remove the item if quantity is 1
        let updatedCart;
        if (product.quantity > 1) {
          updatedCart = state.cartArray.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          updatedCart = state.cartArray.filter(
            (item) => item._id !== productId
          );
        }
        return { ...state, cartArray: updatedCart };
      }
      return state;
    }

    case "CLEAR_CART": {
      return initialStateCart;
    }

    case "CALCULATE_TOTAL": {
      const total = state.cartArray.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      return { ...state, total };
    }

    case "CALCULATE_DISCOUNTED_TOTAL": {
      const discountedTotal = state.cartArray.reduce((sum, item) => {
        // Remove '%' from discount and convert it to a number
        const discountValue = item.discount
          ? parseFloat(item.discount.replace("%", "").trim())
          : 0;

        // Calculate the price after discount
        const discountedPrice =
          discountValue > 0
            ? item.price * (1 - discountValue / 100)
            : item.price;

        return sum + discountedPrice * item.quantity;
      }, 0);

      return { ...state, discountedTotal };
    }

    default:
      return state;
  }
};

// Action creators
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeItemCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

// Action creators to calculate total and discounted total
export const calculateTotal = () => ({
  type: "CALCULATE_TOTAL",
});

export const calculateDiscountedTotal = () => ({
  type: "CALCULATE_DISCOUNTED_TOTAL",
});
