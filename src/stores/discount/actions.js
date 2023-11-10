import { couponService } from "../../services/coupon.service";
import {
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILED,
  APPLY_COUPON_REQUEST,
  UNCHECKED_COUPON_SUCCESS,
  UNCHECKED_COUPON_REQUEST,
  UNCHECKED_COUPON_FAILED,
} from "./types";

export const applyCoupon = (data) => {
  return async (dispatch) => {
    dispatch({
      type: APPLY_COUPON_REQUEST,
      payload: data,
    });

    try {
      const response = await couponService.fetchPostCoupon(data);
      if (response.status === true) {
        dispatch({
          type: APPLY_COUPON_SUCCESS,
          payload: response.result,
        });
        return {
          status: true,
          message: response.message,
        };
      } else {
        dispatch({
          type: APPLY_COUPON_FAILED,
          payload: response,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: APPLY_COUPON_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};

export const uncheckedCoupon = (data) => {
  return async (dispatch) => {
    dispatch({
      type: UNCHECKED_COUPON_REQUEST,
      payload: data,
    });

    try {
      const response = await couponService.fetchDeleteCoupon(data.couponID);
      if (response.status === true) {
        dispatch({
          type: UNCHECKED_COUPON_SUCCESS,
          payload: response,
        });
        return response;
      } else {
        dispatch({
          type: UNCHECKED_COUPON_FAILED,
          payload: response,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: UNCHECKED_COUPON_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};
