import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";
import { AppContext } from "../../contexts/AppContextProvider";
import { formatPrice } from "../../utils/fomatPrice";
import { deleteToCartItem } from "../../stores/cart/actions";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function HeaderCenter() {
  const { carts } = useContext(AppContext);
  const dispatch = useDispatch();
  const totalAmountAll = carts?.reduce(
    (total, item) => total + item?.product.price_has_dropped * item.quantity,
    0
  );
  const handleDeleteItem = async (item) => {
    const response = await dispatch(deleteToCartItem(item));
    console.log(response);
  };
  return (
    <React.Fragment>
      <div className="w-full h-[86px] bg-white quomodo-shop-middle-bar lg:block hidden">
        <div className="max-w-6xl mx-auto h-full">
          <div className="relative h-full">
            <div className="flex justify-between items-center h-full">
              <Link to={URL_CONSTANTS.HOME} className="cursor-pointer">
                <img
                  width={152}
                  height={36}
                  src="https://shopo-next.vercel.app/assets/images/logo.svg"
                  alt="logo"
                />
              </Link>
              <div className="w-[417px] h-[44px]">
                <div className="w-full h-full flex items-center border border-qgray-border bg-white search-com">
                  <div className="flex-1 h-full">
                    <form className="h-full">
                      <input
                        type="text"
                        className="outline-none leading-4 font-medium h-full w-full text-xs pl-3"
                        placeholder="Search Product..."
                      />
                    </form>
                  </div>
                  <div className="w-[1px] h-[22px] bg-gray-200" />
           
                  <button
                    className=" w-[93px] h-full text-sm font-600 bg-yellow-400"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="flex space-x-6 items-center">
                <div className="cart-wrapper group relative py-4">
                  <div className="cart relative cursor-pointer">
                    <Link rel="noopener noreferrer" to={URL_CONSTANTS.CART}>
                      <span>
                        <svg
                          width={18}
                          height={20}
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.1568 5.1772C16.0284 4.84626 15.7343 4.81766 14.2887 4.81766H13.0875V4.2947C13.0875 3.48165 12.9716 2.91374 12.6899 2.32949C12.1804 1.2713 11.3272 0.531797 10.2213 0.188601C9.68279 0.0251747 8.87923 -0.0442816 8.39047 0.0292604C7.03602 0.241715 5.88039 1.09562 5.29223 2.31315C5.00642 2.90966 4.89045 3.48165 4.89045 4.2947V4.82175H3.68511C2.23954 4.82175 1.94546 4.85035 1.81705 5.19354C1.75078 5.41008 1.12948 10.0637 0.864385 12.0697C0.632431 13.8184 0.417045 15.469 0.259648 16.711C-0.0137267 18.8519 -0.00544266 18.8846 0.00284141 18.9214V18.9255C0.0401198 19.0644 0.408761 19.428 0.520596 19.5342L1.00521 20H16.9438L17.3041 19.6854C17.4657 19.5424 18 19.0562 18 18.8152C18 18.6517 16.1899 5.27117 16.1568 5.1772ZM16.6911 18.5046C16.687 18.5332 16.6538 18.619 16.5958 18.6803L16.513 18.7702H1.46498L1.2496 18.5414L2.09871 12.2863C2.39694 10.0596 2.66203 8.11888 2.81943 6.95855C2.88984 6.45193 2.92298 6.19453 2.93955 6.06788C3.49872 6.06379 5.94252 6.0597 8.98278 6.0597H15.0302L15.0384 6.10465C15.1047 6.4315 16.6621 18.141 16.6911 18.5046ZM6.1372 4.82175V4.35598C6.1372 4.04139 6.17862 3.6083 6.22418 3.40811C6.46856 2.38669 7.30111 1.5573 8.34076 1.29173C8.77568 1.1855 9.48811 1.22228 9.92303 1.37753H9.92717C10.3828 1.5287 10.7556 1.77384 11.0994 2.14972C11.6544 2.74623 11.8408 3.28145 11.8408 4.27018V4.82175H6.1372Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-yellow-400">
                      {carts?.length > 0 ? carts?.length : 0}
                    </span>
                  </div>
                  <div
                    className="w-[300px] bg-white border-t-[3px] border-yellow-500  absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.14) 0px 15px 50px 0px",
                    }}
                  >
                    <div className="w-full h-full">
                      {carts?.length > 0 ? (
                        <React.Fragment>
                          <div className="product-items overflow-y-scroll">
                            <ul>
                              {carts?.map((item) => (
                                <li className="w-full h-full flex">
                                  <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                                    <div className="w-[65px] h-full">
                                      <img
                                        src={item.product.image}
                                        alt={item.product.nameProduct}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div className="flex-1 h-full flex flex-col justify-center ">
                                      <p className="title mb-2 text-[13px] font-600 text-black leading-4 line-clamp-2 hover:text-blue-600">
                                        {item.product.nameProduct}
                                      </p>
                                      <p className="price">
                                        <span className="offer-price text-red-500 font-600 text-[15px] ml-2">
                                          {formatPrice(
                                            item.product.price_has_dropped *
                                              item.quantity
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className="mt-[20px] mr-[15px] inline-flex cursor-pointer"
                                    onClick={() => handleDeleteItem(item._id)}
                                  >
                                    <svg
                                      width={8}
                                      height={8}
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      className="inline fill-current text-[#AAAAAA] hover:text-qred"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z" />
                                    </svg>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full px-4 mt-[20px] mb-[12px]">
                            <div className="h-[1px] bg-[#F0F1F3]" />
                          </div>
                          <div className="product-actions px-4 mb-[30px]">
                            <div className="total-equation flex justify-between items-center mb-[28px]">
                              <span className="text-[15px] font-500 text-black">
                                Subtotal
                              </span>
                              <span className="text-[15px] font-500 text-red-500">
                                {formatPrice(totalAmountAll)}
                              </span>
                            </div>
                            <div className="product-action-btn">
                              <Link to={URL_CONSTANTS.CART}
                                style={{
                                  backgroundColor: "#f0f1f3",
                                }}
                                className="flex items-center justify-center leading-3 font-bold  w-full h-[50px] mb-[10px] cursor-pointer"
                              >
                                <span>View Cart</span>
                              </Link>
                              <div className="w-full h-[50px] cursor-pointer">
                                <Link to={`/checkout/${uuidv4()}`} className="bg-yellow-400 flex h-full w-full opacity-1 leading-0 font-bold items-center justify-center">
                                  <span className="text-sm">Checkout Now</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className="p-4">
                          <div className="flex justify-center items-center">
                            <img
                              width={200}
                              src="https://i.imgur.com/7ebt4Bn.png"
                              alt="empty_cart"
                            />
                          </div>
                          <p className="text-sm flex justify-center items-center text-gray-400 pb-2">
                            Giỏ hàng chưa có sản phẩm nào
                          </p>
                          <Link
                            to="/filter/all-product"
                            className="p-2 bg-yellow-400 items-center flex h-full w-full justify-center opacity-1 leaning-6"
                          >
                            Mua Sắm Ngay
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Link rel="noopener noreferrer" to={URL_CONSTANTS.PROFILE}>
                    <span>
                      <svg
                        width={21}
                        height={20}
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.992 19.729C19.9004 18.043 19.438 16.4886 18.617 15.1176C17.6046 13.4237 16.2096 12.1244 14.4679 11.2475C14.0773 11.0522 13.878 10.9645 13.3878 10.7772L12.9334 10.6138L13.4954 10.1833C14.5476 9.38621 15.3408 8.08689 15.6118 6.70387C15.6955 6.28936 15.7035 5.22918 15.6317 4.78278C15.4643 3.77043 14.9582 2.70227 14.2766 1.92507C13.4356 0.976485 12.2439 0.30291 11.0084 0.079713C10.7971 0.0398565 10.1515 0 9.75289 0C9.60542 0 9.55361 0.00398565 9.53766 0.0079713H9.53368C9.49781 0.011957 9.42607 0.0239139 9.33838 0.0358709H9.32642C9.25468 0.0438422 9.17896 0.0557991 9.10323 0.0677561C8.1666 0.195297 7.01873 0.73336 6.25349 1.41092C5.27302 2.27581 4.59147 3.50339 4.38023 4.78278C4.3045 5.22918 4.31646 6.28936 4.40016 6.70387C4.67118 8.08689 5.46433 9.38621 6.51654 10.1833L7.07852 10.6138L6.62415 10.7772C6.13392 10.9645 5.93464 11.0522 5.54404 11.2475C3.80231 12.1244 2.40335 13.4237 1.39498 15.1176C0.569948 16.4926 0.107613 18.043 0.0159426 19.729L0 20H0.255082H1.1957H18.8123H19.4938H20.008L19.992 19.729ZM5.56397 4.98605C5.73934 3.92188 6.28537 2.95735 7.10642 2.25986C7.91949 1.57035 8.94779 1.19171 10 1.19171C10.2352 1.19171 10.4743 1.21164 10.7094 1.24751C13.1606 1.64607 14.8386 3.95775 14.444 6.39299C14.2686 7.45715 13.7226 8.42168 12.9016 9.11917C12.0885 9.80869 11.0602 10.1873 10.008 10.1873C9.77282 10.1873 9.53368 10.1674 9.29852 10.1315C6.84735 9.72898 5.16939 7.42128 5.56397 4.98605ZM2.54285 15.5281C3.73057 13.7146 5.31287 12.4751 7.25389 11.8414C8.17059 11.5424 9.09526 11.391 10.004 11.391C10.9127 11.391 11.8374 11.5424 12.7541 11.8414C14.6951 12.4751 16.2814 13.7146 17.4651 15.5281C18.047 16.4169 18.5134 17.6963 18.7086 18.8721H1.29932C1.49462 17.6963 1.96094 16.4169 2.54285 15.5281Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // Header Reponsive  */}

      <div className="lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div className="cursor-pointer">
            <img
              width={152}
              height={36}
              src="https://i.imgur.com/gSR0WOr.jpg"
              alt="logo"
            />
          </div>
          <div className="cart relative cursor-pointer">
            <a rel="noopener noreferrer" href="/cart">
              <span>
                <svg
                  width={18}
                  height={20}
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1568 5.1772C16.0284 4.84626 15.7343 4.81766 14.2887 4.81766H13.0875V4.2947C13.0875 3.48165 12.9716 2.91374 12.6899 2.32949C12.1804 1.2713 11.3272 0.531797 10.2213 0.188601C9.68279 0.0251747 8.87923 -0.0442816 8.39047 0.0292604C7.03602 0.241715 5.88039 1.09562 5.29223 2.31315C5.00642 2.90966 4.89045 3.48165 4.89045 4.2947V4.82175H3.68511C2.23954 4.82175 1.94546 4.85035 1.81705 5.19354C1.75078 5.41008 1.12948 10.0637 0.864385 12.0697C0.632431 13.8184 0.417045 15.469 0.259648 16.711C-0.0137267 18.8519 -0.00544266 18.8846 0.00284141 18.9214V18.9255C0.0401198 19.0644 0.408761 19.428 0.520596 19.5342L1.00521 20H16.9438L17.3041 19.6854C17.4657 19.5424 18 19.0562 18 18.8152C18 18.6517 16.1899 5.27117 16.1568 5.1772ZM16.6911 18.5046C16.687 18.5332 16.6538 18.619 16.5958 18.6803L16.513 18.7702H1.46498L1.2496 18.5414L2.09871 12.2863C2.39694 10.0596 2.66203 8.11888 2.81943 6.95855C2.88984 6.45193 2.92298 6.19453 2.93955 6.06788C3.49872 6.06379 5.94252 6.0597 8.98278 6.0597H15.0302L15.0384 6.10465C15.1047 6.4315 16.6621 18.141 16.6911 18.5046ZM6.1372 4.82175V4.35598C6.1372 4.04139 6.17862 3.6083 6.22418 3.40811C6.46856 2.38669 7.30111 1.5573 8.34076 1.29173C8.77568 1.1855 9.48811 1.22228 9.92303 1.37753H9.92717C10.3828 1.5287 10.7556 1.77384 11.0994 2.14972C11.6544 2.74623 11.8408 3.28145 11.8408 4.27018V4.82175H6.1372Z"
                    fill="black"
                  />
                </svg>
              </span>
            </a>
            <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow text-qblack">
              15
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
