import { orderService } from "../../services/order.service";
import { paymentService } from "../../services/payment.service";
import createNotification from "../../utils/notification";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_UPDATE,
} from "./types";

export const redirectPayment = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ORDER_SUCCESS,
      payload: data,
    });
    try {
      if (data.paymentID === "64f98dfe26535a0cff5054ea") {
        const response = await paymentService.fetchPostVNPAYAPI(
          data?.totalPrice
        );
        if (response && response.vnpUrl) {
          return {
            paymentMethod: true,
            result: response.vnpUrl,
          };
        } else {
          throw new Error("VNPAY URL is missing or invalid.");
        }
      }
      if (data.paymentID === "64f98e1e26535a0cff5054f0") {
        const response = await paymentService.fetchPostMOMOAPI(
          data?.totalPrice
        );
        if (response && response.payUrl) {
          return {
            paymentMethod: true,
            result: response.payUrl,
          };
        } else {
          throw new Error("MOMO URL is missing or invalid.");
        }
      }
      if (data.paymentID === "64f98e3926535a0cff5054f3") {
        const receive = import.meta.env.VITE_URL_ORDER_RECEIVE;
        return {
          paymentMethod: false,
          result: receive,
        };
      } else {
        createNotification(
          "error",
          "topRight",
          "Vui lòng chọn phương thức thanh toán nhé"
        );
      }
    } catch (error) {
      dispatch({
        type: ORDER_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};

export const orders = (data, paymentMethod) => {
  return async (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
      payload: data,
    });
    try {
      const response = await orderService.fetchPostOrder(paymentMethod, data);
      if (response.status === true) {
        dispatch({
          type: ORDER_SUCCESS,
          payload: response,
        });
        return {
          status: true,
          message: response.message,
        };
      } else {
        dispatch({
          type: ORDER_FAILED,
          payload: response,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: ORDER_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};
