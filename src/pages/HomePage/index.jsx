import React from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";
import { calculateDiscountPercentage, formatPrice } from "../../utils/fomatPrice";
import brand from "../../json/brand.json";
import Slider from "../../components/Slider";

export default function HomePage() {
  const { data, isloading } = useQuery(
    ["product"],
    () => productService.fetchAllProducts(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  return (
    <Layout>
      {/* Banner */}
      <div className="w-full banner-wrapper mb-[60px]" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px] mb-[30px]">
              <div id="app">
              <Slider/>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10 aos-init"
            >
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H5.63636V24.1818H35"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M34.9982 1H11.8164V18H34.9982V1Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M11.8164 7.18164H34.9982"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Free Shipping
                    </p>
                    <p className="text-sm text-qgray">
                      When ordering over $100
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={34}
                        viewBox="0 0 32 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M30.7 2L29.5 10.85L20.5 9.65"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Free Return
                    </p>
                    <p className="text-sm text-qgray">
                      Get Return within 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={38}
                        viewBox="0 0 32 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Secure Payment
                    </p>
                    <p className="text-sm text-qgray">
                      100% Secure Online Payment
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={35}
                        viewBox="0 0 32 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M16 28V22"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Best Quality
                    </p>
                    <p className="text-sm text-qgray">
                      Original Product Guarenteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product */}

      <div className="section-style-one new-products mb-[60px]">
        <div className="section-wrapper w-full ">
          <div className="max-w-6xl mx-auto">
            <div className=" section-title flex justify-between items-center mb-5">
              <div>
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">
                  New Arrivals
                </h1>
              </div>
              <div>
                <Link to={URL_CONSTANTS.FILTER}>
                  <div className="flex space-x-2 items-center">
                    <p className="text-base font-600 text-qblack">View More</p>
                    <span className="animate-right-dir">
                      <svg
                        width={17}
                        height={14}
                        viewBox="0 0 17 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.0225 6.00243C13.9998 6.03738 13.9772 6.06941 13.9545 6.10436C13.8724 6.10727 13.7904 6.11601 13.7083 6.11601C9.93521 6.11601 6.16215 6.11601 2.38909 6.11601C1.87111 6.11601 1.35313 6.10728 0.835147 6.12475C0.351131 6.14514 0.00863998 6.51501 0.000148475 6.981C-0.00834303 7.45864 0.3483 7.83725 0.837977 7.8722C0.956858 7.88094 1.07857 7.87511 1.20028 7.87511C5.33565 7.87803 9.46818 7.87803 13.6035 7.88094C13.7253 7.88094 13.8498 7.88094 13.9715 7.88094C14.0026 7.93627 14.031 7.9887 14.0621 8.04403C13.9404 8.12267 13.7988 8.18383 13.697 8.28576C12.3355 9.67499 10.9797 11.0671 9.62669 12.4651C9.26155 12.8437 9.25306 13.3767 9.58423 13.732C9.91823 14.0902 10.4419 14.099 10.8127 13.7233C12.7855 11.702 14.7556 9.6779 16.7199 7.64794C17.0907 7.26351 17.0851 6.73053 16.7171 6.34901C14.7697 4.33652 12.8167 2.32987 10.858 0.329035C10.7278 0.195063 10.5466 0.0873038 10.3683 0.0319679C10.0088 -0.0757916 9.63235 0.116428 9.44554 0.451356C9.26438 0.78046 9.31533 1.20859 9.60687 1.51148C10.6768 2.62111 11.7524 3.72492 12.8308 4.82581C13.2271 5.2219 13.6262 5.60925 14.0225 6.00243Z"
                          fill="white"
                        />
                        <path
                          d="M14.0225 6.00241C13.6262 5.60923 13.2243 5.22188 12.8336 4.82288C11.7552 3.72199 10.6796 2.61818 9.60971 1.50855C9.31816 1.20566 9.26721 0.77753 9.44837 0.448427C9.63518 0.113498 10.0116 -0.0787213 10.3711 0.0290382C10.5466 0.0814617 10.7278 0.192134 10.8608 0.326105C12.8195 2.32694 14.7697 4.33359 16.7199 6.34608C17.0879 6.72469 17.0936 7.26058 16.7228 7.64501C14.7584 9.67497 12.7884 11.6991 10.8155 13.7203C10.4475 14.0989 9.92106 14.0873 9.58706 13.7291C9.25589 13.3737 9.26155 12.8408 9.62952 12.4622C10.9825 11.0642 12.3383 9.67206 13.6998 8.28284C13.8017 8.1809 13.9404 8.11974 14.0649 8.0411C14.0338 7.98577 14.0055 7.93334 13.9743 7.87801C13.8526 7.87801 13.7281 7.87801 13.6064 7.87801C9.47101 7.8751 5.33848 7.8751 1.20311 7.87218C1.0814 7.87218 0.962519 7.87801 0.840808 7.86927C0.3483 7.84015 -0.00834304 7.45862 0.00014847 6.98098C0.00863998 6.515 0.351131 6.14512 0.832316 6.12764C1.3503 6.10726 1.86828 6.11891 2.38626 6.11891C6.16215 6.11599 9.93521 6.11599 13.7083 6.11599C13.7904 6.11599 13.8724 6.10726 13.9574 6.10143C13.9772 6.0694 13.9998 6.03445 14.0225 6.00241Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
               </div>
            </div>
            <div className="section-content">
              <div className="products-section w-full">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                  {data?.map((item) => (
                    <div data-aos="fade-up" className="item aos-init">
                      <div
                        className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
                        }}
                      >
                        <Link
                          to={`/product/${item.slugProduct}`}
                          className="p-img"
                        >
                          <div
                            className="product-card-img w-full h-[300px]"
                            style={{
                              background: `url(${item.images[0].imagePath}) center center no-repeat`,
                              backgroundSize: "80%",
                            }}
                          />
                        </Link>

                        <div className="product-card-details px-[30px] pb-[30px] relative">
                          <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
                            <button
                              type="button"
                              className="bg-yellow-400 items-center flex h-full w-full justify-center opacity-1 leaning-6"
                            >
                              <div className="flex items-center space-x-3">
                                <span>
                                  <svg
                                    width={14}
                                    height={16}
                                    viewBox="0 0 14 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-current"
                                  >
                                    <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                  </svg>
                                </span>
                                <Link to={`/product/${item.slugProduct}`}>
                                  <span>Add To Cart</span>
                                </Link>
                              </div>
                            </button>
                          </div>
                          <div className="reviews flex space-x-[1px] mb-3">
                          <span className="text-sm italic">
                            (Tiết kiệm:{" "}
                            {calculateDiscountPercentage(
                              item?.initial_price,
                              item?.price_has_dropped
                            )}
                            )
                          </span>
                          </div>
                          <Link
                          to={`/product/${item.slugProduct}`}
                          className="p-name"
                          >
                          <p className="title mb-2 text-[15px] font-600 text-neutral-950 font-bold leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                            {item.nameProduct}
                          </p>
                          </Link>
                          <p className="price">
                            <span className="main-price text-qgray line-through font-500 text-[15px]">
                              {formatPrice(item.initial_price)}đ
                            </span>
                            <span className="offer-price text-qred font-500 text-[15px] ml-2">
                              {formatPrice(item.price_has_dropped)} đ
                            </span>
                          </p>
                        </div>
                        <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                          <a href="#">
                            <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.339844 3.18947V5.71272H0.991007H1.64217V4.31815V2.91815L4.6538 5.92978L7.66543 8.94141L8.13752 8.46389L8.61504 7.99179L5.60341 4.98017L2.59178 1.96854H3.99178H5.38636V1.31737V0.66621H2.8631H0.339844V3.18947Z"
                                  fill="black"
                                />
                                <path
                                  d="M13.9592 1.31737V1.96854H15.3537H16.7537L13.7421 4.98017L10.7305 7.99179L11.208 8.46389L11.6801 8.94141L14.6917 5.92978L17.7033 2.91815V4.31815V5.71272H18.3545H19.0057V3.18947V0.66621H16.4824H13.9592V1.31737Z"
                                  fill="black"
                                />
                                <path
                                  d="M4.63752 14.0803L1.64217 17.0811V15.6811V14.2865H0.991007H0.339844V16.8098V19.333H2.8631H5.38636V18.6818V18.0307H3.99178H2.59178L5.60341 15.0191L8.61504 12.0074L8.1538 11.5462C7.90419 11.2911 7.68171 11.0849 7.66543 11.0849C7.64915 11.0849 6.28713 12.4361 4.63752 14.0803Z"
                                  fill="black"
                                />
                                <path
                                  d="M11.1917 11.5462L10.7305 12.0074L13.7421 15.0191L16.7537 18.0307H15.3537H13.9592V18.6818V19.333H16.4824H19.0057V16.8098V14.2865H18.3545H17.7033V15.6811V17.0811L14.7026 14.0803C13.0584 12.4361 11.6964 11.0849 11.6801 11.0849C11.6638 11.0849 11.4413 11.2911 11.1917 11.5462Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                          <a href="#">
                            <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                              <svg
                                width={21}
                                height={18}
                                viewBox="0 0 21 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                          <a href="#">
                            <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                              <svg
                                width={20}
                                height={22}
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.33556 0.70842C8.33556 1.09592 8.32306 1.41675 8.31056 1.41675C8.29806 1.41675 8.09389 1.45425 7.86473 1.50425C3.90639 2.30425 0.952225 5.43342 0.402225 9.40843C0.273058 10.3168 0.327225 11.7001 0.523058 12.6251C1.01889 14.9918 2.55639 17.2126 4.58973 18.5126L4.82722 18.6626L5.41472 18.2209C5.73556 17.9793 6.00222 17.7709 6.00222 17.7543C6.00222 17.7418 5.89806 17.6751 5.77306 17.6084C5.13556 17.2751 4.30639 16.6084 3.74389 15.9793C2.67722 14.7834 1.99389 13.3251 1.77306 11.7918C1.69389 11.2251 1.69389 10.1001 1.77306 9.56259C1.94389 8.42509 2.34389 7.35009 2.94389 6.40842C3.69389 5.23759 4.83556 4.21259 6.08556 3.58342C6.71889 3.26676 7.59806 2.96675 8.20223 2.85842L8.33556 2.83342V3.41675C8.33556 3.73759 8.34389 4.00009 8.35639 4.00009C8.39806 4.00009 11.0022 2.02925 11.0022 2.00009C11.0022 1.97092 8.39806 8.58307e-05 8.35639 8.58307e-05C8.34389 8.58307e-05 8.33556 0.316753 8.33556 0.70842Z"
                                  fill="black"
                                />
                                <path
                                  d="M13.9234 3.11266C13.6026 3.35432 13.3443 3.56682 13.3568 3.58349C13.3693 3.60432 13.4943 3.68349 13.6401 3.76266C14.8609 4.45432 15.9984 5.62099 16.7026 6.91683C17.1276 7.69599 17.4859 8.82933 17.5859 9.71266C17.6693 10.4085 17.6193 11.6043 17.4859 12.2377C16.9109 14.9627 15.0151 17.1585 12.3984 18.1335C12.0693 18.2543 11.1776 18.5002 11.0609 18.5002C11.0151 18.5002 11.0026 18.396 11.0026 17.9168C11.0026 17.596 10.9943 17.3335 10.9818 17.3335C10.9401 17.3335 8.33594 19.3043 8.33594 19.3335C8.33594 19.3627 10.9401 21.3335 10.9818 21.3335C10.9943 21.3335 11.0026 21.0168 11.0026 20.6252V19.921L11.1609 19.896C11.5484 19.8335 12.6443 19.5377 13.0026 19.396C16.2526 18.1252 18.4776 15.3085 18.9401 11.8752C19.0609 10.9918 19.0068 9.60849 18.8151 8.70849C18.3193 6.34183 16.7818 4.12099 14.7484 2.82099L14.5109 2.67099L13.9234 3.11266Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        data-aos="fade-up"
        className="section-style-one category-products mb-[60px] aos-init aos-animate"
      >
        <div className="section-wrapper w-full ">
          <div className="max-w-6xl mx-auto">
            <div className=" section-title flex justify-between items-center mb-5">
              <div>
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">
                  Latest product
                </h1>
              </div>
              <div>
                <a href="/all-products">
                  <div className="flex space-x-2 items-center">
                    <p className="text-base font-600 text-qblack">View More</p>
                    <span className="animate-right-dir">
                      <svg
                        width={17}
                        height={14}
                        viewBox="0 0 17 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.0225 6.00243C13.9998 6.03738 13.9772 6.06941 13.9545 6.10436C13.8724 6.10727 13.7904 6.11601 13.7083 6.11601C9.93521 6.11601 6.16215 6.11601 2.38909 6.11601C1.87111 6.11601 1.35313 6.10728 0.835147 6.12475C0.351131 6.14514 0.00863998 6.51501 0.000148475 6.981C-0.00834303 7.45864 0.3483 7.83725 0.837977 7.8722C0.956858 7.88094 1.07857 7.87511 1.20028 7.87511C5.33565 7.87803 9.46818 7.87803 13.6035 7.88094C13.7253 7.88094 13.8498 7.88094 13.9715 7.88094C14.0026 7.93627 14.031 7.9887 14.0621 8.04403C13.9404 8.12267 13.7988 8.18383 13.697 8.28576C12.3355 9.67499 10.9797 11.0671 9.62669 12.4651C9.26155 12.8437 9.25306 13.3767 9.58423 13.732C9.91823 14.0902 10.4419 14.099 10.8127 13.7233C12.7855 11.702 14.7556 9.6779 16.7199 7.64794C17.0907 7.26351 17.0851 6.73053 16.7171 6.34901C14.7697 4.33652 12.8167 2.32987 10.858 0.329035C10.7278 0.195063 10.5466 0.0873038 10.3683 0.0319679C10.0088 -0.0757916 9.63235 0.116428 9.44554 0.451356C9.26438 0.78046 9.31533 1.20859 9.60687 1.51148C10.6768 2.62111 11.7524 3.72492 12.8308 4.82581C13.2271 5.2219 13.6262 5.60925 14.0225 6.00243Z"
                          fill="white"
                        />
                        <path
                          d="M14.0225 6.00241C13.6262 5.60923 13.2243 5.22188 12.8336 4.82288C11.7552 3.72199 10.6796 2.61818 9.60971 1.50855C9.31816 1.20566 9.26721 0.77753 9.44837 0.448427C9.63518 0.113498 10.0116 -0.0787213 10.3711 0.0290382C10.5466 0.0814617 10.7278 0.192134 10.8608 0.326105C12.8195 2.32694 14.7697 4.33359 16.7199 6.34608C17.0879 6.72469 17.0936 7.26058 16.7228 7.64501C14.7584 9.67497 12.7884 11.6991 10.8155 13.7203C10.4475 14.0989 9.92106 14.0873 9.58706 13.7291C9.25589 13.3737 9.26155 12.8408 9.62952 12.4622C10.9825 11.0642 12.3383 9.67206 13.6998 8.28284C13.8017 8.1809 13.9404 8.11974 14.0649 8.0411C14.0338 7.98577 14.0055 7.93334 13.9743 7.87801C13.8526 7.87801 13.7281 7.87801 13.6064 7.87801C9.47101 7.8751 5.33848 7.8751 1.20311 7.87218C1.0814 7.87218 0.962519 7.87801 0.840808 7.86927C0.3483 7.84015 -0.00834304 7.45862 0.00014847 6.98098C0.00863998 6.515 0.351131 6.14512 0.832316 6.12764C1.3503 6.10726 1.86828 6.11891 2.38626 6.11891C6.16215 6.11599 9.93521 6.11599 13.7083 6.11599C13.7904 6.11599 13.8724 6.10726 13.9574 6.10143C13.9772 6.0694 13.9998 6.03445 14.0225 6.00241Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="section-content">
              <div className="products-section w-full">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                  <div className="category-card hidden xl:block w-full">
                    <div
                      className="category-card-wrappwer w-full h-full p-[30px]"
                      style={{
                        background:
                          'url("https://shopo-next.vercel.app/assets/images/section-category-1.jpg") 0% 0% / cover no-repeat',
                      }}
                    >
                      <div>
                        <h1 className="text-base font-600 tracking-wide mb-2">
                          Mobile &amp; Tablet
                        </h1>
                        <div className="brands-list mb-[7px]">
                          <ul>
                            <li>
                              <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                                xioami
                              </span>
                            </li>
                            <li>
                              <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                                apple
                              </span>
                            </li>
                            <li>
                              <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                                google
                              </span>
                            </li>
                            <li>
                              <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                                samsung
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="flex space-x-2 items-center">
                          <span className="text-qblack font-600 text-sm">
                            Shop Now
                          </span>
                          <span>
                            <svg
                              width={7}
                              height={11}
                              viewBox="0 0 7 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="2.08984"
                                y="0.636719"
                                width="6.94219"
                                height="1.54271"
                                transform="rotate(45 2.08984 0.636719)"
                                fill="#1D1D1D"
                              />
                              <rect
                                x={7}
                                y="5.54492"
                                width="6.94219"
                                height="1.54271"
                                transform="rotate(135 7 5.54492)"
                                fill="#1D1D1D"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
                      }}
                    >
                      <div
                        className="product-card-img w-full h-[300px]"
                        style={{
                          background:
                            'url("https://shopo-next.vercel.app/assets/images/product-img-1.jpg") center center no-repeat',
                        }}
                      />
                      <div className="product-card-details px-[30px] pb-[30px] relative">
                        <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
                          <button
                            type="button"
                            className="bg-yellow-400 items-center flex h-full w-full justify-center opacity-1 leaning-6"
                          >
                            <div className="flex items-center space-x-3">
                              <span>
                                <svg
                                  width={14}
                                  height={16}
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="fill-current"
                                >
                                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                </svg>
                              </span>
                              <span>Add To Cart</span>
                            </div>
                          </button>
                        </div>
                        <div className="reviews flex space-x-[1px] mb-3">
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                          Xoggle aute et pariatur adipisicing nostrud et
                          excepteur
                        </p>
                        <p className="price">
                          <span className="main-price text-qgray line-through font-600 text-[18px]">
                            $27.27
                          </span>
                          <span className="offer-price text-qred font-600 text-[18px] ml-2">
                            $18.73
                          </span>
                        </p>
                      </div>
                      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.339844 3.18947V5.71272H0.991007H1.64217V4.31815V2.91815L4.6538 5.92978L7.66543 8.94141L8.13752 8.46389L8.61504 7.99179L5.60341 4.98017L2.59178 1.96854H3.99178H5.38636V1.31737V0.66621H2.8631H0.339844V3.18947Z"
                                fill="black"
                              />
                              <path
                                d="M13.9592 1.31737V1.96854H15.3537H16.7537L13.7421 4.98017L10.7305 7.99179L11.208 8.46389L11.6801 8.94141L14.6917 5.92978L17.7033 2.91815V4.31815V5.71272H18.3545H19.0057V3.18947V0.66621H16.4824H13.9592V1.31737Z"
                                fill="black"
                              />
                              <path
                                d="M4.63752 14.0803L1.64217 17.0811V15.6811V14.2865H0.991007H0.339844V16.8098V19.333H2.8631H5.38636V18.6818V18.0307H3.99178H2.59178L5.60341 15.0191L8.61504 12.0074L8.1538 11.5462C7.90419 11.2911 7.68171 11.0849 7.66543 11.0849C7.64915 11.0849 6.28713 12.4361 4.63752 14.0803Z"
                                fill="black"
                              />
                              <path
                                d="M11.1917 11.5462L10.7305 12.0074L13.7421 15.0191L16.7537 18.0307H15.3537H13.9592V18.6818V19.333H16.4824H19.0057V16.8098V14.2865H18.3545H17.7033V15.6811V17.0811L14.7026 14.0803C13.0584 12.4361 11.6964 11.0849 11.6801 11.0849C11.6638 11.0849 11.4413 11.2911 11.1917 11.5462Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={21}
                              height={18}
                              viewBox="0 0 21 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={22}
                              viewBox="0 0 20 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.33556 0.70842C8.33556 1.09592 8.32306 1.41675 8.31056 1.41675C8.29806 1.41675 8.09389 1.45425 7.86473 1.50425C3.90639 2.30425 0.952225 5.43342 0.402225 9.40843C0.273058 10.3168 0.327225 11.7001 0.523058 12.6251C1.01889 14.9918 2.55639 17.2126 4.58973 18.5126L4.82722 18.6626L5.41472 18.2209C5.73556 17.9793 6.00222 17.7709 6.00222 17.7543C6.00222 17.7418 5.89806 17.6751 5.77306 17.6084C5.13556 17.2751 4.30639 16.6084 3.74389 15.9793C2.67722 14.7834 1.99389 13.3251 1.77306 11.7918C1.69389 11.2251 1.69389 10.1001 1.77306 9.56259C1.94389 8.42509 2.34389 7.35009 2.94389 6.40842C3.69389 5.23759 4.83556 4.21259 6.08556 3.58342C6.71889 3.26676 7.59806 2.96675 8.20223 2.85842L8.33556 2.83342V3.41675C8.33556 3.73759 8.34389 4.00009 8.35639 4.00009C8.39806 4.00009 11.0022 2.02925 11.0022 2.00009C11.0022 1.97092 8.39806 8.58307e-05 8.35639 8.58307e-05C8.34389 8.58307e-05 8.33556 0.316753 8.33556 0.70842Z"
                                fill="black"
                              />
                              <path
                                d="M13.9234 3.11266C13.6026 3.35432 13.3443 3.56682 13.3568 3.58349C13.3693 3.60432 13.4943 3.68349 13.6401 3.76266C14.8609 4.45432 15.9984 5.62099 16.7026 6.91683C17.1276 7.69599 17.4859 8.82933 17.5859 9.71266C17.6693 10.4085 17.6193 11.6043 17.4859 12.2377C16.9109 14.9627 15.0151 17.1585 12.3984 18.1335C12.0693 18.2543 11.1776 18.5002 11.0609 18.5002C11.0151 18.5002 11.0026 18.396 11.0026 17.9168C11.0026 17.596 10.9943 17.3335 10.9818 17.3335C10.9401 17.3335 8.33594 19.3043 8.33594 19.3335C8.33594 19.3627 10.9401 21.3335 10.9818 21.3335C10.9943 21.3335 11.0026 21.0168 11.0026 20.6252V19.921L11.1609 19.896C11.5484 19.8335 12.6443 19.5377 13.0026 19.396C16.2526 18.1252 18.4776 15.3085 18.9401 11.8752C19.0609 10.9918 19.0068 9.60849 18.8151 8.70849C18.3193 6.34183 16.7818 4.12099 14.7484 2.82099L14.5109 2.67099L13.9234 3.11266Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
                      }}
                    >
                      <div
                        className="product-card-img w-full h-[300px]"
                        style={{
                          background:
                            'url("https://shopo-next.vercel.app/assets/images/product-img-2.jpg") center center no-repeat',
                        }}
                      >
                        <div className="px-[30px] absolute left-0 top-3 w-full">
                          <div className="progress-title flex justify-between ">
                            <p className="text-xs text-qblack font-400 leading-6">
                              Prodcuts Available
                            </p>
                            <span className="text-sm text-qblack font-600 leading-6">
                              20
                            </span>
                          </div>
                          <div className="progress w-full h-[5px] rounded-[22px] bg-gray-200 relative overflow-hidden">
                            <div
                              className="h-full absolute left-0 top-0  bg-qyellow"
                              style={{ width: "66.6667%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="product-card-details px-[30px] pb-[30px] relative">
                        <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
                          <button
                            type="button"
                            className="bg-yellow-400 items-center flex h-full w-full justify-center opacity-1 leaning-6"
                          >
                            <div className="flex items-center space-x-3">
                              <span>
                                <svg
                                  width={14}
                                  height={16}
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="fill-current"
                                >
                                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                </svg>
                              </span>
                              <span>Add To Cart</span>
                            </div>
                          </button>
                        </div>
                        <div className="reviews flex space-x-[1px] mb-3">
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                          Geeky ipsum esse repreh est consequat
                        </p>
                        <p className="price">
                          <span className="main-price text-qgray line-through font-600 text-[18px]">
                            $24.55
                          </span>
                          <span className="offer-price text-qred font-600 text-[18px] ml-2">
                            $17.79
                          </span>
                        </p>
                      </div>
                      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.339844 3.18947V5.71272H0.991007H1.64217V4.31815V2.91815L4.6538 5.92978L7.66543 8.94141L8.13752 8.46389L8.61504 7.99179L5.60341 4.98017L2.59178 1.96854H3.99178H5.38636V1.31737V0.66621H2.8631H0.339844V3.18947Z"
                                fill="black"
                              />
                              <path
                                d="M13.9592 1.31737V1.96854H15.3537H16.7537L13.7421 4.98017L10.7305 7.99179L11.208 8.46389L11.6801 8.94141L14.6917 5.92978L17.7033 2.91815V4.31815V5.71272H18.3545H19.0057V3.18947V0.66621H16.4824H13.9592V1.31737Z"
                                fill="black"
                              />
                              <path
                                d="M4.63752 14.0803L1.64217 17.0811V15.6811V14.2865H0.991007H0.339844V16.8098V19.333H2.8631H5.38636V18.6818V18.0307H3.99178H2.59178L5.60341 15.0191L8.61504 12.0074L8.1538 11.5462C7.90419 11.2911 7.68171 11.0849 7.66543 11.0849C7.64915 11.0849 6.28713 12.4361 4.63752 14.0803Z"
                                fill="black"
                              />
                              <path
                                d="M11.1917 11.5462L10.7305 12.0074L13.7421 15.0191L16.7537 18.0307H15.3537H13.9592V18.6818V19.333H16.4824H19.0057V16.8098V14.2865H18.3545H17.7033V15.6811V17.0811L14.7026 14.0803C13.0584 12.4361 11.6964 11.0849 11.6801 11.0849C11.6638 11.0849 11.4413 11.2911 11.1917 11.5462Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={21}
                              height={18}
                              viewBox="0 0 21 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={22}
                              viewBox="0 0 20 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.33556 0.70842C8.33556 1.09592 8.32306 1.41675 8.31056 1.41675C8.29806 1.41675 8.09389 1.45425 7.86473 1.50425C3.90639 2.30425 0.952225 5.43342 0.402225 9.40843C0.273058 10.3168 0.327225 11.7001 0.523058 12.6251C1.01889 14.9918 2.55639 17.2126 4.58973 18.5126L4.82722 18.6626L5.41472 18.2209C5.73556 17.9793 6.00222 17.7709 6.00222 17.7543C6.00222 17.7418 5.89806 17.6751 5.77306 17.6084C5.13556 17.2751 4.30639 16.6084 3.74389 15.9793C2.67722 14.7834 1.99389 13.3251 1.77306 11.7918C1.69389 11.2251 1.69389 10.1001 1.77306 9.56259C1.94389 8.42509 2.34389 7.35009 2.94389 6.40842C3.69389 5.23759 4.83556 4.21259 6.08556 3.58342C6.71889 3.26676 7.59806 2.96675 8.20223 2.85842L8.33556 2.83342V3.41675C8.33556 3.73759 8.34389 4.00009 8.35639 4.00009C8.39806 4.00009 11.0022 2.02925 11.0022 2.00009C11.0022 1.97092 8.39806 8.58307e-05 8.35639 8.58307e-05C8.34389 8.58307e-05 8.33556 0.316753 8.33556 0.70842Z"
                                fill="black"
                              />
                              <path
                                d="M13.9234 3.11266C13.6026 3.35432 13.3443 3.56682 13.3568 3.58349C13.3693 3.60432 13.4943 3.68349 13.6401 3.76266C14.8609 4.45432 15.9984 5.62099 16.7026 6.91683C17.1276 7.69599 17.4859 8.82933 17.5859 9.71266C17.6693 10.4085 17.6193 11.6043 17.4859 12.2377C16.9109 14.9627 15.0151 17.1585 12.3984 18.1335C12.0693 18.2543 11.1776 18.5002 11.0609 18.5002C11.0151 18.5002 11.0026 18.396 11.0026 17.9168C11.0026 17.596 10.9943 17.3335 10.9818 17.3335C10.9401 17.3335 8.33594 19.3043 8.33594 19.3335C8.33594 19.3627 10.9401 21.3335 10.9818 21.3335C10.9943 21.3335 11.0026 21.0168 11.0026 20.6252V19.921L11.1609 19.896C11.5484 19.8335 12.6443 19.5377 13.0026 19.396C16.2526 18.1252 18.4776 15.3085 18.9401 11.8752C19.0609 10.9918 19.0068 9.60849 18.8151 8.70849C18.3193 6.34183 16.7818 4.12099 14.7484 2.82099L14.5109 2.67099L13.9234 3.11266Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
                      }}
                    >
                      <div
                        className="product-card-img w-full h-[300px]"
                        style={{
                          background:
                            'url("https://shopo-next.vercel.app/assets/images/product-img-3.jpg") center center no-repeat',
                        }}
                      >
                        <div className="product-type absolute right-[14px] top-[17px]">
                          <span className="text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider bg-[#19CC40]">
                            popular
                          </span>
                        </div>
                      </div>
                      <div className="product-card-details px-[30px] pb-[30px] relative">
                        <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
                          <button
                            type="button"
                            className="bg-yellow-400 items-center flex h-full w-full justify-center opacity-1 leading-6"
                          >
                            <div className="flex items-center space-x-3">
                              <span>
                                <svg
                                  width={14}
                                  height={16}
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="fill-current"
                                >
                                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                </svg>
                              </span>
                              <span>Add To Cart</span>
                            </div>
                          </button>
                        </div>
                        <div className="reviews flex space-x-[1px] mb-3">
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width={18}
                              height={17}
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="#FFA800"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                          Conjurica ea magna eiusmod esse cupt anim aliquip
                        </p>
                        <p className="price">
                          <span className="main-price text-qgray line-through font-600 text-[18px]">
                            $32.63
                          </span>
                          <span className="offer-price text-qred font-600 text-[18px] ml-2">
                            $18.03
                          </span>
                        </p>
                      </div>
                      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.339844 3.18947V5.71272H0.991007H1.64217V4.31815V2.91815L4.6538 5.92978L7.66543 8.94141L8.13752 8.46389L8.61504 7.99179L5.60341 4.98017L2.59178 1.96854H3.99178H5.38636V1.31737V0.66621H2.8631H0.339844V3.18947Z"
                                fill="black"
                              />
                              <path
                                d="M13.9592 1.31737V1.96854H15.3537H16.7537L13.7421 4.98017L10.7305 7.99179L11.208 8.46389L11.6801 8.94141L14.6917 5.92978L17.7033 2.91815V4.31815V5.71272H18.3545H19.0057V3.18947V0.66621H16.4824H13.9592V1.31737Z"
                                fill="black"
                              />
                              <path
                                d="M4.63752 14.0803L1.64217 17.0811V15.6811V14.2865H0.991007H0.339844V16.8098V19.333H2.8631H5.38636V18.6818V18.0307H3.99178H2.59178L5.60341 15.0191L8.61504 12.0074L8.1538 11.5462C7.90419 11.2911 7.68171 11.0849 7.66543 11.0849C7.64915 11.0849 6.28713 12.4361 4.63752 14.0803Z"
                                fill="black"
                              />
                              <path
                                d="M11.1917 11.5462L10.7305 12.0074L13.7421 15.0191L16.7537 18.0307H15.3537H13.9592V18.6818V19.333H16.4824H19.0057V16.8098V14.2865H18.3545H17.7033V15.6811V17.0811L14.7026 14.0803C13.0584 12.4361 11.6964 11.0849 11.6801 11.0849C11.6638 11.0849 11.4413 11.2911 11.1917 11.5462Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={21}
                              height={18}
                              viewBox="0 0 21 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="#">
                          <span className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded">
                            <svg
                              width={20}
                              height={22}
                              viewBox="0 0 20 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.33556 0.70842C8.33556 1.09592 8.32306 1.41675 8.31056 1.41675C8.29806 1.41675 8.09389 1.45425 7.86473 1.50425C3.90639 2.30425 0.952225 5.43342 0.402225 9.40843C0.273058 10.3168 0.327225 11.7001 0.523058 12.6251C1.01889 14.9918 2.55639 17.2126 4.58973 18.5126L4.82722 18.6626L5.41472 18.2209C5.73556 17.9793 6.00222 17.7709 6.00222 17.7543C6.00222 17.7418 5.89806 17.6751 5.77306 17.6084C5.13556 17.2751 4.30639 16.6084 3.74389 15.9793C2.67722 14.7834 1.99389 13.3251 1.77306 11.7918C1.69389 11.2251 1.69389 10.1001 1.77306 9.56259C1.94389 8.42509 2.34389 7.35009 2.94389 6.40842C3.69389 5.23759 4.83556 4.21259 6.08556 3.58342C6.71889 3.26676 7.59806 2.96675 8.20223 2.85842L8.33556 2.83342V3.41675C8.33556 3.73759 8.34389 4.00009 8.35639 4.00009C8.39806 4.00009 11.0022 2.02925 11.0022 2.00009C11.0022 1.97092 8.39806 8.58307e-05 8.35639 8.58307e-05C8.34389 8.58307e-05 8.33556 0.316753 8.33556 0.70842Z"
                                fill="black"
                              />
                              <path
                                d="M13.9234 3.11266C13.6026 3.35432 13.3443 3.56682 13.3568 3.58349C13.3693 3.60432 13.4943 3.68349 13.6401 3.76266C14.8609 4.45432 15.9984 5.62099 16.7026 6.91683C17.1276 7.69599 17.4859 8.82933 17.5859 9.71266C17.6693 10.4085 17.6193 11.6043 17.4859 12.2377C16.9109 14.9627 15.0151 17.1585 12.3984 18.1335C12.0693 18.2543 11.1776 18.5002 11.0609 18.5002C11.0151 18.5002 11.0026 18.396 11.0026 17.9168C11.0026 17.596 10.9943 17.3335 10.9818 17.3335C10.9401 17.3335 8.33594 19.3043 8.33594 19.3335C8.33594 19.3627 10.9401 21.3335 10.9818 21.3335C10.9943 21.3335 11.0026 21.0168 11.0026 20.6252V19.921L11.1609 19.896C11.5484 19.8335 12.6443 19.5377 13.0026 19.396C16.2526 18.1252 18.4776 15.3085 18.9401 11.8752C19.0609 10.9918 19.0068 9.60849 18.8151 8.70849C18.3193 6.34183 16.7818 4.12099 14.7484 2.82099L14.5109 2.67099L13.9234 3.11266Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Shop By Brand */}
      <div
        data-aos="fade-up"
        className="w-full brand-section-wrapper mb-[60px] aos-init aos-animate"
      >
        <div className="max-w-6xl mx-auto">
          <div className=" section-title flex justify-between items-center mb-5">
            <div>
              <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
                Shop by Brand
              </h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {brand?.map((item) => (
            <div className="item">
              <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center relative">
                <span
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    overflow: "hidden",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    position: "absolute",
                    inset: 0,
                  }}
                >
                  <img
                    alt="logo"
                    src={item.image}
                    decoding="async"
                    data-nimg="fill"
                    sizes="100vw"
                    style={{
                      position: "absolute",
                      inset: 0,
                      boxSizing: "border-box",
                      padding: 0,
                      border: "none",
                      margin: "auto",
                      display: "block",
                      width: 0,
                      height: 0,
                      minWidth: "60%",
                      maxWidth: "90%",
                      minHeight: "90%",
                      maxHeight: "90%",
                      objectFit: "scale-down",
                    }}
                  />
                  <noscript />
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      {/* Khuyến Mãi */}
      <div>
        <div className="w-full lg:h-[460px] mb-[60px]">
          <div className="max-w-6xl mx-auto h-full">
            <div className="lg:flex xl:space-x-[30px] lg:space-x-5 items-center h-full">
              <div
                data-aos="fade-right"
                className="campaign-countdown lg:w-1/2 h-full w-full mb-5 lg:mb-0 aos-init aos-animate"
                style={{
                  background:
                    'url("https://shopo-next.vercel.app/assets/images/campaign-cover-countdown.jpg") 0% 0% / cover no-repeat',
                }}
              >
                <div className="w-full xl:p-12 p-5">
                  <div className="countdown-wrapper w-full flex lg:justify-between justify-evenly mb-10">
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                          131
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Days
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                          8
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Hours
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                          12
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Minutes
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                          8
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Seconds
                      </p>
                    </div>
                  </div>
                  <div className="countdown-title mb-4">
                    <h1 className="text-[44px] text-black font-600">
                      WOO! Flash Sale
                    </h1>
                  </div>
                  <div className="inline-flex space-x-2 items-center border-b border-qyellow">
                    <span className="text-sm font-600 tracking-wide leading-7">
                      Shop Now
                    </span>
                    <span>
                      <svg
                        width={7}
                        height={11}
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2.08984"
                          y="0.636719"
                          width="6.94219"
                          height="1.54271"
                          transform="rotate(45 2.08984 0.636719)"
                          fill="#1D1D1D"
                        />
                        <rect
                          x={7}
                          y="5.54492"
                          width="6.94219"
                          height="1.54271"
                          transform="rotate(135 7 5.54492)"
                          fill="#1D1D1D"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-left"
                className="download-app flex-1 lg:h-full h-[430px] xl:p-12 p-5 aos-init aos-animate"
                style={{
                  background:
                    'url("https://shopo-next.vercel.app/assets/images/download-app-cover.png") 0% 0% / cover no-repeat',
                }}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="get-app">
                    <p className="text-[13px] font-600 text-qblack mb-3">
                      MOBILE APP VERSION
                    </p>
                    <h1 className="text-[30px] font-600 text-qblack leading-10 mb-8">
                      Get Our
                      <span className="text-qred border-b-2 border-qred mx-2">
                        Mobile App
                      </span>
                      <br /> It’s Make easy for you life !
                    </h1>
                    <div className="flex space-x-5 items-center">
                      <div>
                        <a href="/#">
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "inline-block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              position: "relative",
                              maxWidth: "100%",
                            }}
                          >
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                maxWidth: "100%",
                              }}
                            >
                              <img
                                alt
                                aria-hidden="true"
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27170%27%20height=%2769%27/%3e"
                                style={{
                                  display: "block",
                                  maxWidth: "100%",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                }}
                              />
                            </span>
                            <img
                              alt
                              src="/_next/image?url=%2Fassets%2Fimages%2Fplay-store.png&w=384&q=75"
                              decoding="async"
                              data-nimg="intrinsic"
                              srcSet="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fplay-store.png&w=256&q=75"
                              style={{
                                position: "absolute",
                                inset: 0,
                                boxSizing: "border-box",
                                padding: 0,
                                border: "none",
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "100%",
                                maxHeight: "100%",
                              }}
                            />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a href="/#">
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "inline-block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              position: "relative",
                              maxWidth: "100%",
                            }}
                          >
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                maxWidth: "100%",
                              }}
                            >
                              <img
                                alt
                                aria-hidden="true"
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27170%27%20height=%2769%27/%3e"
                                style={{
                                  display: "block",
                                  maxWidth: "100%",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                }}
                              />
                            </span>
                            <img
                              alt
                              src="/_next/image?url=%2Fassets%2Fimages%2Fapple-store.png&w=384&q=75"
                              decoding="async"
                              data-nimg="intrinsic"
                              srcSet="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fapple-store.png&w=256&q=75"
                              style={{
                                position: "absolute",
                                inset: 0,
                                boxSizing: "border-box",
                                padding: 0,
                                border: "none",
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "100%",
                                maxHeight: "100%",
                              }}
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="app-screen w-full h-full relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        src="/_next/image?url=%2Fassets%2Fimages%2Fapp-screen.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        sizes="100vw"
                        srcSet="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fapp-screen.png&w=1920&q=75"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Best Saller */}
      <div className="section-wrapper w-full best-sallers-section mb-[60px]">
        <div className="max-w-6xl mx-auto">
          <div className=" section-title flex justify-between items-center mb-5">
            <div>
              <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">
                Best Saller
              </h1>
            </div>
            <div>
              <a href="/sallers">
                <div className="flex space-x-2 items-center">
                  <p className="text-base font-600 text-qblack">View More</p>
                  <span className="animate-right-dir">
                    <svg
                      width={17}
                      height={14}
                      viewBox="0 0 17 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0225 6.00243C13.9998 6.03738 13.9772 6.06941 13.9545 6.10436C13.8724 6.10727 13.7904 6.11601 13.7083 6.11601C9.93521 6.11601 6.16215 6.11601 2.38909 6.11601C1.87111 6.11601 1.35313 6.10728 0.835147 6.12475C0.351131 6.14514 0.00863998 6.51501 0.000148475 6.981C-0.00834303 7.45864 0.3483 7.83725 0.837977 7.8722C0.956858 7.88094 1.07857 7.87511 1.20028 7.87511C5.33565 7.87803 9.46818 7.87803 13.6035 7.88094C13.7253 7.88094 13.8498 7.88094 13.9715 7.88094C14.0026 7.93627 14.031 7.9887 14.0621 8.04403C13.9404 8.12267 13.7988 8.18383 13.697 8.28576C12.3355 9.67499 10.9797 11.0671 9.62669 12.4651C9.26155 12.8437 9.25306 13.3767 9.58423 13.732C9.91823 14.0902 10.4419 14.099 10.8127 13.7233C12.7855 11.702 14.7556 9.6779 16.7199 7.64794C17.0907 7.26351 17.0851 6.73053 16.7171 6.34901C14.7697 4.33652 12.8167 2.32987 10.858 0.329035C10.7278 0.195063 10.5466 0.0873038 10.3683 0.0319679C10.0088 -0.0757916 9.63235 0.116428 9.44554 0.451356C9.26438 0.78046 9.31533 1.20859 9.60687 1.51148C10.6768 2.62111 11.7524 3.72492 12.8308 4.82581C13.2271 5.2219 13.6262 5.60925 14.0225 6.00243Z"
                        fill="white"
                      />
                      <path
                        d="M14.0225 6.00241C13.6262 5.60923 13.2243 5.22188 12.8336 4.82288C11.7552 3.72199 10.6796 2.61818 9.60971 1.50855C9.31816 1.20566 9.26721 0.77753 9.44837 0.448427C9.63518 0.113498 10.0116 -0.0787213 10.3711 0.0290382C10.5466 0.0814617 10.7278 0.192134 10.8608 0.326105C12.8195 2.32694 14.7697 4.33359 16.7199 6.34608C17.0879 6.72469 17.0936 7.26058 16.7228 7.64501C14.7584 9.67497 12.7884 11.6991 10.8155 13.7203C10.4475 14.0989 9.92106 14.0873 9.58706 13.7291C9.25589 13.3737 9.26155 12.8408 9.62952 12.4622C10.9825 11.0642 12.3383 9.67206 13.6998 8.28284C13.8017 8.1809 13.9404 8.11974 14.0649 8.0411C14.0338 7.98577 14.0055 7.93334 13.9743 7.87801C13.8526 7.87801 13.7281 7.87801 13.6064 7.87801C9.47101 7.8751 5.33848 7.8751 1.20311 7.87218C1.0814 7.87218 0.962519 7.87801 0.840808 7.86927C0.3483 7.84015 -0.00834304 7.45862 0.00014847 6.98098C0.00863998 6.515 0.351131 6.14512 0.832316 6.12764C1.3503 6.10726 1.86828 6.11891 2.38626 6.11891C6.16215 6.11599 9.93521 6.11599 13.7083 6.11599C13.7904 6.11599 13.8724 6.10726 13.9574 6.10143C13.9772 6.0694 13.9998 6.03445 14.0225 6.00241Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="section-content">
            <div className="w-full ">
              <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
                <div
                  data-aos="fade-left"
                  data-aos-duration={500}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-1.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Shopno BD
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration={400}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-2.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Eecoms Shop
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration={300}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-3.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Fusion X
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration={200}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-4.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Rikayi Rox
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration={100}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-5.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Habbriyi
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-duration={100}
                  className="item w-full flex flex-col items-center aos-init"
                >
                  <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                    <span
                      style={{
                        boxSizing: "border-box",
                        display: "block",
                        overflow: "hidden",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <img
                        alt
                        sizes="100vw"
                        src="https://shopo-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsaller-6.png&w=3840&q=75"
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                      />
                    </span>
                  </div>
                  <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                    Rayhans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
     
    </Layout>
  );
}
