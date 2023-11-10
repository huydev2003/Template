import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../contexts/AppContextProvider";
import huydev from "../../json/address.json";
import { formatPrice } from "../../utils/fomatPrice";
import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../../services/payment.service";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { redirectPayment } from "../../stores/order/actions";
import { userService } from "../../services/user.service";
import { LOAD_CURRENT_LOGIN_USER_SUCCESS } from "../../stores/authentication/types";
import { history } from "../../helpers/history";

const initialValues = (user) => ({
  fullname: user?.fullname || "",
  username: user?.username || "",
  address: user?.address || "",
  city: user?.city || "",
  district: user?.district || "",
  commune: user?.commune || "",
  phone: user?.phone || "",
});

export default function CheckoutPage() {
  const { code } = useParams();
  const { carts, user } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [activeItem, setActiveItem] = useState("64f98dfe26535a0cff5054ea");

  const [inputs, setInputs] = useState(initialValues(user));

  const { data: isPayments, isloading: loadingPayment } = useQuery(
    ["payment"],
    () => paymentService.fetchAllPayments(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );

  const handleClickPayment = useCallback((itemId) => {
    setActiveItem(itemId);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }, []);

  const handleSelectProvince = useCallback((e) => {
    const selectedCity = e.target.value;
    setSelectedProvince(selectedCity);
    setInputs((prevInputs) => ({
      ...prevInputs,
      city: selectedCity,
    }));
  }, []);

  const handleSelectDistrict = useCallback((e) => {
    const selectedDistrictValue = e.target.value;
    setSelectedDistrict(selectedDistrictValue);
    setInputs((prevInputs) => ({
      ...prevInputs,
      district: selectedDistrictValue,
    }));
  }, []);

  const handleSelectCommune = useCallback((e) => {
    const selectedCommuneValue = e.target.value;
    setSelectedCommune(selectedCommuneValue);
    setInputs((prevInputs) => ({
      ...prevInputs,
      commune: selectedCommuneValue,
    }));
  }, []);

  useEffect(() => {
    setProvinces(huydev.provinces);
    setDistricts(huydev.districts);
    setWards(huydev.wards);
    if (user) {
      setSelectedProvince(user.city);
      setSelectedDistrict(user.district);
      setSelectedCommune(user.commune);
    }
  }, [user]);

  const totalAmountAll = useMemo(
    () =>
      carts?.reduce(
        (total, cart) => total + cart.product.price_has_dropped * cart.quantity,
        0
      ),
    [carts]
  );

  const filteredDistricts = useMemo(
    () =>
      districts?.filter(
        (district) => district.province_id === Number(selectedProvince)
      ),
    [districts, selectedProvince]
  );

  const filteredWards = useMemo(
    () =>
      wards?.filter((ward) => ward.district_id === Number(selectedDistrict)),
    [wards, selectedDistrict]
  );

  const products = useMemo(
    () =>
      carts?.map((cart) => ({
        color: cart.color,
        productID: cart.productID,
        quantity: cart.quantity,
      })),
    [carts]
  );

  const orderData = useMemo(
    () => ({
      code,
      totalPrice: totalAmountAll,
      paymentID: activeItem,
      products,
    }),
    [code, totalAmountAll, activeItem, products]
  );

  const handleSubmitOrder = useCallback(
    async (e) => {
      e.preventDefault();

      const updateResponse = await userService.updateMe(inputs);
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
        payload: updateResponse.user,
      });

      const paymentResponse = await dispatch(redirectPayment(orderData));

      if (paymentResponse && paymentResponse.paymentMethod === true) {
        history.push(paymentResponse.result);
      } else {
        navigate(paymentResponse.result);
      }
    },
    [inputs, orderData, navigate, history]
  );

  return (
    <Layout>
      <div className="w-full  pt-0 pb-0">
        <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full mb-5">
            <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
              <div className="max-w-6xl mx-auto">
                <div className="mb-5">
                  <div>
                    <div className="breadcrumb-wrapper font-400 text-[13px] text-black mb-[23px]">
                      <span>
                        <a href="/">
                          <span className="mx-1 capitalize">home</span>
                        </a>
                        <span className="sperator">/</span>
                      </span>
                      <span>
                        <a href="/checkout">
                          <span className="mx-1 capitalize">checkout</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-black">
                    Checkout
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-main-content w-full">
            <div className="max-w-6xl mx-auto">
              <form
                onSubmit={handleSubmitOrder}
                className="w-full lg:flex lg:space-x-[30px] pt-4"
              >
                <div className="lg:w-1/2 w-full">
                  <h1 className="sm:text-2xl text-xl text-black font-medium mb-5">
                    Billing Details
                  </h1>
                  <div className="form-area">
                    <div>
                      <div className="sm:flex sm:space-x-5 items-center mb-6">
                        <div className="sm:w-1/2 mb-5 sm:mb-0">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Full Name*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <input
                                placeholder="Nguyen Van A"
                                name="fullname"
                                onChange={handleInputChange}
                                value={inputs.fullname}
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              User Name*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <input
                                placeholder="Username"
                                name="username"
                                onChange={handleInputChange}
                                value={inputs.username}
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Email Address*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <input
                                placeholder="demoemial@gmail.com"
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                value={user?.email}
                                disabled
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Phone Number*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <input
                                placeholder="012 3 *******"
                                type="number"
                                name="phone"
                                onChange={handleInputChange}
                                value={inputs.phone}
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-item mb-8">
                        <div className="w-full">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Address*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <input
                                placeholder="Address"
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                                type="text"
                                name="address"
                                onChange={handleInputChange}
                                value={inputs.address}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-item mb-8">
                        <div className="w-full">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Tỉnh / TP*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <select
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                                name="city"
                                onChange={handleSelectProvince}
                                value={selectedProvince}
                                placeholder={`Vui lòng chọn Tỉnh / TP`}
                              >
                                <option value="">
                                  Vui lòng chọn Tỉnh / TP
                                </option>
                                {provinces?.map((province) => (
                                  <option key={province.id} value={province.id}>
                                    {province.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-item flex space-x-2.5 mb-8">
                        <div className="w-1/2 h-full">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Quận / Huyện*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <select
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                                name="district"
                                value={selectedDistrict}
                                onChange={handleSelectDistrict}
                                disabled={!selectedProvince}
                                placeholder={`Vui Lòng Chọn Quận / Huyện ${selectedDistrict}`}
                              >
                                <option value="">
                                  Vui lòng chọn Quận / Huyện
                                </option>
                                {filteredDistricts?.map((district) => (
                                  <option key={district.id} value={district.id}>
                                    {district.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2 h-full">
                          <div className="input-com w-full h-full">
                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              Phường / Xã*
                            </label>
                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                              <select
                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                                name="commune"
                                value={selectedCommune}
                                onChange={handleSelectCommune}
                                disabled={!selectedDistrict}
                                placeholder="Vui Lòng Chọn Phường / Xã"
                              >
                                <option value="">
                                  Vui lòng chọn Phường / Xã
                                </option>
                                {filteredWards?.map((ward) => (
                                  <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="sm:text-2xl text-xl text-black font-medium mb-5">
                    Order Summary
                  </h1>
                  <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-black uppercase">
                          Product
                        </p>
                        <p className="text-[13px] font-medium text-black uppercase">
                          total
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]" />
                    </div>
                    <div className="product-list w-full mb-[30px]">
                      <ul className="flex flex-col space-y-5">
                        {carts?.map((item, index) => (
                          <li key={index}>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-black mb-2.5">
                                  {item.product.nameProduct}
                                  <sup className="text-[13px] text-gray-500 ml-2 mt-2">
                                    x{item.quantity}
                                  </sup>
                                </h4>
                                <p className="text-[13px] text-gray-500 capitalize">
                                  {item.color}
                                </p>
                              </div>
                              <div>
                                <span className="text-[15px] text-black font-medium">
                                  {formatPrice(
                                    item.product.price_has_dropped *
                                      item.quantity
                                  )}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-black uppercase">
                          SUBTOTAL
                        </p>
                        <p className="text-[15px] font-medium text-black uppercase">
                          {formatPrice(totalAmountAll)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full mt-[30px]">
                      <div className="sub-total mb-6">
                        <div className=" flex justify-between mb-5">
                          <div>
                            <span className="text-xs text-qgraytwo mb-3 block">
                              SHIPPING
                            </span>
                            <p className="text-base font-medium text-black">
                              Free Shipping
                            </p>
                          </div>
                          <p className="text-[15px] font-medium text-black">
                            +15,000
                          </p>
                        </div>
                        <div className="w-full h-[1px] bg-[#EDEDED]" />
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-2xl font-medium text-black">Total</p>
                        <p className="text-2xl font-medium text-qred">
                          {" "}
                          {formatPrice(totalAmountAll - 15000)}
                        </p>
                      </div>
                    </div>
                    <div className="shipping mt-[30px]">
                      {loadingPayment ? (
                        <Loading />
                      ) : (
                        <ul className="flex flex-col space-y-1 pb-5">
                          {isPayments?.map((item, index) => (
                            <li className="pb-2" key={index}>
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    type="radio"
                                    className="accent-pink-500"
                                    checked={activeItem === item._id}
                                    onClick={() => handleClickPayment(item._id)}
                                    id={item._id}
                                  />
                                </div>
                                <label
                                  htmlFor={item._id}
                                  className="text-[17px] text-normal text-black"
                                >
                                  {item.namePayment}
                                </label>
                              </div>

                              <p className="text-gray-500 text-[15px] ml-6">
                                {item.descriptionPayment}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full h-[50px] bg-black text-white flex justify-center items-center"
                    >
                      <span className="text-sm font-semibold">
                        Place Order Now
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
