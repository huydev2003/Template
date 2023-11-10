import {
  APPLY_COUPON_FAILED,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  UNCHECKED_COUPON_FAILED,
  UNCHECKED_COUPON_REQUEST,
  UNCHECKED_COUPON_SUCCESS,
} from "./types";

const initialState = {
  discounts: null,
  loading: false,
  error: null,
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return { ...state, loading: true };

    case APPLY_COUPON_SUCCESS:
      const { coupon } = action.payload;
      return {
        ...state,
        discounts: coupon,
      };

    case APPLY_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UNCHECKED_COUPON_REQUEST:
      return { ...state, loading: true };

    case UNCHECKED_COUPON_SUCCESS:
      return {
        ...state,
      };

    case UNCHECKED_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export default discountReducer;
