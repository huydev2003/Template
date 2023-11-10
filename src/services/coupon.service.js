import Http from "../helpers/http";

const http = new Http();

const fetchAllCoupons = async () => {
  try {
    const response = await http.get(`/coupon/getAllCoupons`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchCouponByUserID = async (id) => {
  try {
    const response = await http.get(`/coupon-user/getCouponUserByUserID/${id}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostCoupon = async (data) => {
  try {
    const response = await http.post(`/coupon-user/postCouponUser`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteCoupon = async (id) => {
  try {
    const response = await http.delete(`/coupon-user/deleteCouponUser/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const couponService = {
  fetchAllCoupons,
  fetchPostCoupon,
  fetchCouponByUserID,
  fetchDeleteCoupon,
};
