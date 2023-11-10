import {
  ADD_CART_FAILED,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  GET_CART_FAILED,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_ALL_CART_FAILED,
  REMOVE_ALL_CART_REQUEST,
  REMOVE_ALL_CART_SUCCESS,
  REMOVE_CART_FAILED,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  UPDATE_CART_FAILED,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
} from "./types";

const initialState = {
  carts: [],
  loading: false,
  error: null,
};

// const cartReducer = (state = initialState, action) => {
//   // switch (action.type) {
//   //   case ADD_TO_CART:
//   //     const { product, color, quantity } = action.payload;
//   //     const existingProduct = state.carts.find(
//   //       (item) => item.product._id === product._id
//   //     );
//   //     const newQuantity = parseInt(quantity);

//   //     if (existingProduct) {
//   //       // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng mới
//   //       existingProduct.quantity += newQuantity;
//   //       return { ...state };
//   //     } else {
//   //       // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
//   //       const newProduct = {
//   //         product: product,
//   //         color: color,
//   //         quantity: newQuantity,
//   //       };
//   //       return { ...state, carts: [...state.carts, newProduct] };
//   //     }
//   //   case REMOVE_CART:
//   //     const productToRemove = action.payload;
//   //     const updatedCarts = state.carts.filter(
//   //       (item) => item.product._id !== productToRemove.product._id
//   //     );
//   //     return { ...state, carts: updatedCarts };

//   //   case DECREASE_QUANTIRY_CART:
//   //     const productToDecrease = action.payload;
//   //     const updatedCartsDecrease = state.carts.map((item) => {
//   //       if (
//   //         item.product._id === productToDecrease.product._id &&
//   //         item.quantity > 1
//   //       ) {
//   //         item.quantity -= 1;
//   //       }
//   //       return item;
//   //     });
//   //     return { ...state, carts: updatedCartsDecrease };

//   //   case INCREASING_QUANTIRY_CART:
//   //     const productToIncrease = action.payload;
//   //     const updatedCartsIncrease = state.carts.map((item) => {
//   //       if (item.product._id === productToIncrease.product._id) {
//   //         item.quantity += 1;
//   //       }
//   //       return item;
//   //     });
//   //     return { ...state, carts: updatedCartsIncrease };

//   //   case REMOVE_ALL_CART:
//   //     return { ...state, carts: [] };

//   //   default:
//   //     return state;
//   // }
// }

const handleCartAction = (state, actionType, payload) => {
  return {
    ...state,
    loading: false,
    error: null,
    carts: [payload],
  };
};

const handleError = (state, actionType, error) => {
  return {
    ...state,
    loading: false,
    error: error,
  };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case ADD_CART_REQUEST:
    case REMOVE_CART_REQUEST:
    case UPDATE_CART_REQUEST:
    case REMOVE_ALL_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CART_SUCCESS:
      return {
        ...state,
        carts: action.payload,
      };

    case ADD_CART_SUCCESS:
      const { productID: addProductID } = action.payload;
      const existingItemPostIndex = state.carts.findIndex(
        (item) => item.productID === addProductID
      );
      if (existingItemPostIndex !== -1) {
        const updatedCarts = [...state.carts];
        updatedCarts[existingItemPostIndex] = action.payload;
        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload],
        };
      }

    case UPDATE_CART_SUCCESS:
      const { productID: updateProductID } = action.payload;
      const existingItemUpdateIndex = state.carts.findIndex(
        (item) => item.productID === updateProductID
      );
      // console.log(existingItemUpdateIndex);
      // console.log(action.payload);
      if (existingItemUpdateIndex !== -1) {
        const updatedCarts = [...state.carts];
        // console.log("update carts", updatedCarts);
        updatedCarts[existingItemUpdateIndex] = action.payload;
        return {
          ...state,
          carts: updatedCarts,
        };
      }
      return state;

    case REMOVE_CART_SUCCESS:
      const { productID: removeProductID } = action.payload;
      // console.log(removeProductID);
      const deleteCart = state.carts.filter(
        (item) => item._id !== removeProductID
      );
      // console.log("delete cart", deleteCart);
      return {
        ...state,
        carts: deleteCart,
      };
    case REMOVE_ALL_CART_SUCCESS:
      return {
        ...state,
        carts: [],
      };
    case GET_CART_FAILED:
    case ADD_CART_FAILED:
    case REMOVE_CART_FAILED:
    case UPDATE_CART_FAILED:
    case REMOVE_ALL_CART_FAILED:
      return handleError(state, action.type, action.payload);

    default:
      return state;
  }
};

export default cartReducer;
