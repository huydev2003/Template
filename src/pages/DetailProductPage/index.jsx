import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { productService } from "../../services/product.service";
import { commentService } from "../../services/comment.service";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../stores/cart/actions";
import createNotification from "../../utils/notification";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {
  calculateDiscountPercentage,
  formatPrice,
} from "../../utils/fomatPrice";
import { AppContext } from "../../contexts/AppContextProvider";
import { URL_CONSTANTS } from "../../constants/url.constants";

export default function DetailProductPage() {
  const { accessToken } = useContext(AppContext);

  const [isSeeMore, setIsSeeMore] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReview, setIsReview] = useState(true);
  const [rating, setRating] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorError, setShowColorError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const toggleSeeMore = useCallback(() => {
    setIsSeeMore(!isSeeMore);
  }, [isSeeMore]);

  const toggleReview = useCallback(() => {
    setIsReview(!isReview);
  }, [isReview]);

  const handleRating = useCallback((rate) => {
    setRating(rate);
  }, []);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  const { slug } = useParams();
  const [isSlug, setSlug] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const [inputs, setInputs] = useState({
    comment: "",
  });

  const [detailProduct, setDetailProduct] = useState(null);
  const [isComment, setIsComment] = useState(null);

  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, [slug]);

  const queryKey = useMemo(() => ["edit-product", isSlug], [isSlug]);

  const { data: detailProductData, isLoading: isDetailProductLoading } =
    useQuery(queryKey, async () => {
      if (isSlug) {
        return await productService.fetchProductBySlug(isSlug);
      }
    }, {
      staleTime: 500,
      enabled: !!isSlug,
    });

  const { data: related, isLoading: loadingRelated } = useQuery(
    ["related", detailProductData?.brandID],
    () => productService.getProductOfBrand(detailProductData?.brandID),
    {
      staleTime: 500,
      enabled: !!detailProductData?.brandID,
    }
  );

  const filteredRelated = useMemo(() => related?.filter(
    (huydev) => huydev.slugProduct !== detailProductData?.slugProduct
  ) ?? [], [related, detailProductData]);

  useEffect(() => {
    if (detailProductData) {
      setDetailProduct(detailProductData);
    }
  }, [detailProductData]);

  const fetchCommentData = useCallback(async () => {
    if (detailProduct) {
      try {
        const commentData = await commentService.fetchByProductComments(
          detailProduct._id
        );
        setIsComment(commentData);
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    }
  }, [detailProduct]);

  useEffect(() => {
    fetchCommentData();
  }, [detailProduct, fetchCommentData]);

  // tổng, trung bình đánh giá
  const totalRating = useMemo(() => isComment?.reduce(
    (total, comment) => total + parseInt(comment.rating),
    0
  ), [isComment]);

  const averageRating = useMemo(() => totalRating / isComment?.length, [totalRating, isComment]);

  const handleColorClick = useCallback((color) => {
    if (color === "") {
      setShowColorError(true);
    } else {
      setSelectedColor(color);
      setShowColorError(false);
    }
  }, []);

  const buyCart = useCallback(async (product) => {
    if (!selectedColor) {
      setShowColorError(true);
      return;
    }
    if (!accessToken) {
      return navigate(URL_CONSTANTS.LOGIN);
    }

    const response = await dispatch(
      addToCart({
        productID: product._id,
        color: selectedColor,
        quantity,
      })
    );
    if (response.status === true) {
      createNotification("success", "topRight", response.message);
    } else {
      createNotification("error", "topRight", response.message);
    }
  }, [selectedColor, accessToken, dispatch, navigate, quantity]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }, []);

  const handleComment = useCallback(async (e) => {
    e.preventDefault();
    let data = {
      rating: rating,
      comment: inputs.comment,
      productID: detailProduct?._id,
    };

    try {
      const response = await commentService.fetchPostComment(data);
      if (response.status === true) {
        setValidationErrors([]);
        setRating(0);
        setInputs({ ...inputs, comment: "" });
        createNotification("success", "topRight", response.message);
        fetchCommentData();
      } else {
        if (response?.status === false) {
          setValidationErrors([]);
          setInputs({ ...inputs, comment: "" });
          createNotification("error", "topRight", response.message);
        }
        setValidationErrors(response.errors);
      }
    } catch (error) {
      console.log(error);
    }
  }, [rating, inputs, detailProduct, fetchCommentData]);

  const increaseQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const handleTabClick = useCallback((index) => {
    setActiveTab(index);
  }, []);


  return (
    <Layout>
      {isDetailProductLoading ? (
        <Loading />
      ) : (
        <div className="w-full  pt-0 pb-0">
          <div className="single-product-wrapper w-full">
            <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
              <div class="breadcrumb-wrapper w-full ">
                <div className="max-w-6xl mx-auto">
                  <div>
                    <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px]">
                      <span>
                        <a href="/">
                          <span className="mx-1 capitalize">home</span>
                        </a>
                        <span className="sperator">/</span>
                      </span>
                      <span>
                        <a href="/single-product">
                          <span className="mx-1 capitalize">
                            {detailProduct?.category.nameCategory}
                          </span>
                        </a>
                        /
                        <span className="mx-1 capitalize">
                          {detailProduct?.brand.nameBrand}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white pb-[60px]">
                  <div className="max-w-6xl mx-auto">
                    <div className="product-view w-full lg:flex justify-between ">
                      <div
                        data-aos="fade-right"
                        className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px] aos-init aos-animate"
                      >
                        <div className="w-full">
                          {detailProduct?.images && (
                            <div
                              key={selectedImageIndex}
                              className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3"
                            >
                              <img
                                src={
                                  detailProduct?.images
                                    ? detailProduct?.images[selectedImageIndex]
                                        .imagePath
                                    : null
                                }
                                alt={detailProduct?.nameProduct}
                                className="object-contain"
                              />
                              <div className="w-[80px] h-[80px] rounded-full bg-yellow-400 text-black flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                                <span>
                                  -
                                  {calculateDiscountPercentage(
                                    detailProduct?.initial_price,
                                    detailProduct?.price_has_dropped
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2 flex-wrap">
                            {detailProduct?.images.map((path, index) => (
                              <div
                                onClick={() => handleImageClick(index)}
                                key={index}
                                className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                              >
                                <img
                                  src={path.imagePath}
                                  alt={detailProduct?.nameProduct}
                                  className={`w-full h-full object-contain ${
                                    selectedImageIndex === index
                                      ? ""
                                      : "opacity-50"
                                  }`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="product-details w-full mt-10 lg:mt-0">
                          <span
                            data-aos="fade-up"
                            className="text-gray-500 text-xs font-normal uppercase tracking-wider mb-2 inline-block aos-init aos-animate"
                          >
                            {detailProduct?.category.nameCategory} /{" "}
                            {detailProduct?.brand.nameBrand}
                          </span>
                          <p
                            data-aos="fade-up"
                            className="text-xl font-medium text-qblack mb-4 aos-init aos-animate"
                          >
                            {detailProduct?.nameProduct}
                          </p>
                          <div
                            data-aos="fade-up"
                            className="flex space-x-[10px] items-center mb-6 aos-init aos-animate"
                          >
                            <div className="flex">
                              {Array.from(
                                { length: Math.min(5, averageRating) },
                                (_, index) => (
                                  <span key={index}>
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
                                )
                              )}
                            </div>
                            <span className="text-[13px] font-normal text-black">
                              {isComment?.length} Reviews
                            </span>
                          </div>

                          <div
                            data-aos="fade-up"
                            className="flex space-x-2 items-center mb-7 aos-init aos-animate"
                          >
                            <span className="text-sm font-500 text-gray-500 line-through mt-2">
                              {formatPrice(detailProduct?.initial_price)}
                            </span>
                            <span className="text-2xl font-500 text-qred">
                              {formatPrice(detailProduct?.price_has_dropped)}
                            </span>
                          </div>
                          <p
                            data-aos="fade-up"
                            className="text-gray-500 text-sm text-normal mb-[30px] leading-7 aos-init aos-animate"
                            dangerouslySetInnerHTML={{
                              __html: detailProduct?.contentProduct,
                            }}
                          ></p>
                          <div
                            data-aos="fade-up"
                            className="colors mb-[30px] aos-init aos-animate"
                          >
                            <span className="text-sm font-normal uppercase text-gray-500 mb-[14px] inline-block">
                              COLOR
                            </span>
                            <div className="flex space-x-2 items-center">
                              {detailProduct?.colors.map((item, index) => (
                                <div key={index}>
                                  <button
                                    onClick={() =>
                                      handleColorClick(item.nameColor)
                                    }
                                    className={`w-[20px] h-[20px] rounded-full ${
                                      selectedColor === item.nameColor
                                        ? "ring-2 ring-offset-2"
                                        : ""
                                    } flex justify-center items-center`}
                                  >
                                    <span
                                      className="w-[20px] h-[20px] rounded-full border"
                                      style={{ background: item.nameColor }}
                                    />
                                  </button>
                                </div>
                              ))}
                            </div>
                            {showColorError && (
                              <span style={{ color: "red", marginTop: "20px" }}>
                                (Vui lòng chọn màu)
                              </span>
                            )}
                          </div>

                          <div
                            data-aos="fade-up"
                            className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px] aos-init aos-animate"
                          >
                            <div className="w-[120px] h-full px-[26px] flex items-center border border-gray-border">
                              <div className="flex justify-between items-center w-full">
                                <button
                                  type="button"
                                  onClick={decreaseQuantity}
                                  className="text-base text-gray-500"
                                >
                                  -
                                </button>
                                <span className="text-black">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={increaseQuantity}
                                  className="text-base text-gray-500"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                       
                            <div className="flex-1 h-full">
                              <button
                                type="button"
                                onClick={() => buyCart(detailProduct)}
                                className="bg-black text-white text-sm font-semibold w-full h-full"
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                          <div
                            data-aos="fade-up"
                            className="mb-[20px] aos-init aos-animate"
                          >
                            <p className="text-[13px] text-gray-500 leading-7">
                              <span className="text-qblack">Category :</span>{" "}
                              {detailProduct?.category.nameCategory}
                            </p>
                            <p className="text-[13px] text-gray-500 leading-7">
                              <span className="text-qblack">SKU:</span>{" "}
                              {detailProduct?._id}
                            </p>
                          </div>
                          <div
                            data-aos="fade-up"
                            className="flex space-x-2 items-center mb-[20px] aos-init aos-animate"
                          >
                            <span>
                              <svg
                                width={12}
                                height={13}
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z"
                                  fill="#EB5757"
                                />
                              </svg>
                            </span>
                            <button
                              type="button"
                              className="text-qred font-semibold text-[13px]"
                            >
                              Report This Item
                            </button>
                          </div>
                          <div
                            data-aos="fade-up"
                            className="social-share flex items-center w-full aos-init aos-animate"
                          >
                            <span className="text-qblack text-[13px] mr-[17px] inline-block">
                              Share This
                            </span>
                            <div className="flex space-x-5 items-center">
                              <span>
                                <svg
                                  width={10}
                                  height={16}
                                  viewBox="0 0 10 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                                    fill="#3E75B2"
                                  />
                                </svg>
                              </span>
                              <span>
                                <svg
                                  width={16}
                                  height={16}
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 0C3.6 0 0 3.6 0 8C0 11.4 2.1 14.3 5.1 15.4C5 14.8 5 13.8 5.1 13.1C5.2 12.5 6 9.1 6 9.1C6 9.1 5.8 8.7 5.8 8C5.8 6.9 6.5 6 7.3 6C8 6 8.3 6.5 8.3 7.1C8.3 7.8 7.9 8.8 7.6 9.8C7.4 10.6 8 11.2 8.8 11.2C10.2 11.2 11.3 9.7 11.3 7.5C11.3 5.6 9.9 4.2 8 4.2C5.7 4.2 4.4 5.9 4.4 7.7C4.4 8.4 4.7 9.1 5 9.5C5 9.7 5 9.8 5 9.9C4.9 10.2 4.8 10.7 4.8 10.8C4.8 10.9 4.7 11 4.5 10.9C3.5 10.4 2.9 9 2.9 7.8C2.9 5.3 4.7 3 8.2 3C11 3 13.1 5 13.1 7.6C13.1 10.4 11.4 12.6 8.9 12.6C8.1 12.6 7.3 12.2 7.1 11.7C7.1 11.7 6.7 13.2 6.6 13.6C6.4 14.3 5.9 15.2 5.6 15.7C6.4 15.9 7.2 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z"
                                    fill="#E12828"
                                  />
                                </svg>
                              </span>
                              <span>
                                <svg
                                  width={18}
                                  height={14}
                                  viewBox="0 0 18 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17.0722 1.60052C16.432 1.88505 15.7562 2.06289 15.0448 2.16959C15.7562 1.74278 16.3253 1.06701 16.5742 0.248969C15.8985 0.640206 15.1515 0.924742 14.3335 1.10258C13.6933 0.426804 12.7686 0 11.7727 0C9.85206 0 8.28711 1.56495 8.28711 3.48557C8.28711 3.7701 8.32268 4.01907 8.39382 4.26804C5.51289 4.12577 2.9165 2.73866 1.17371 0.604639C0.889175 1.13814 0.71134 1.70722 0.71134 2.34742C0.71134 3.5567 1.31598 4.62371 2.27629 5.26392C1.70722 5.22835 1.17371 5.08608 0.675773 4.83711V4.87268C0.675773 6.5799 1.88505 8.00258 3.48557 8.32268C3.20103 8.39382 2.88093 8.42938 2.56082 8.42938C2.34742 8.42938 2.09845 8.39382 1.88505 8.35825C2.34742 9.74536 3.62784 10.7768 5.15722 10.7768C3.94794 11.7015 2.45412 12.2706 0.818041 12.2706C0.533505 12.2706 0.248969 12.2706 0 12.2351C1.56495 13.2309 3.37887 13.8 5.37062 13.8C11.8082 13.8 15.3294 8.46495 15.3294 3.84124C15.3294 3.69897 15.3294 3.52113 15.3294 3.37887C16.0052 2.9165 16.6098 2.31186 17.0722 1.60052Z"
                                    fill="#3FD1FF"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-des-wrapper w-full relative pb-[60px]">
              <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
                <div className="max-w-6xl mx-auto">
                  <ul className="flex space-x-12 ">
                    <li onClick={() => handleTabClick(0)}>
                      <span
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          activeTab === 0 ? "border-yellow-400 text-black" : ""
                        }`}
                      >
                        Description
                      </span>
                    </li>
                    <li onClick={() => handleTabClick(1)}>
                      <span
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          activeTab === 1 ? "border-yellow-400 text-black" : ""
                        }`}
                      >
                        Reviews
                      </span>
                    </li>
                    <li onClick={() => handleTabClick(2)}>
                      <span
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          activeTab === 2 ? "border-yellow-400 text-black" : ""
                        }`}
                      >
                        Seller Info
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10" />
              </div>
              <div className="tab-contents w-full min-h-[400px] ">
                <div className="max-w-6xl mx-auto">
                  {activeTab === 0 ? (
                    <div
                      data-aos="fade-up"
                      className="w-full tab-content-item aos-init"
                      dangerouslySetInnerHTML={{
                        __html: detailProduct?.descriptionProduct,
                      }}
                    ></div>
                  ) : activeTab === 1 ? (
                    <div className="max-w-6xl mx-auto">
                      <div
                        data-aos="fade-up"
                        className="w-full tab-content-item aos-init aos-animate"
                      >
                        <h6 className="text-[18px] font-medium text-qblack mb-2">
                          Reviews
                        </h6>
                        <div className="w-full">
                          <div className="review-wrapper w-full">
                            <div className="w-full reviews">
                              <div className="w-full comments">
                                {isComment?.map((item, index) => (
                                  <div
                                    key={index}
                                    className="comment-item bg-white mb-2.5"
                                  >
                                    <div className="comment-author flex justify-between items-center mb-3">
                                      <div className="flex space-x-3 items-center">
                                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
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
                                              src={`https://ui-avatars.com/api/name=${item.userID?.fullname}`}
                                              decoding="async"
                                              data-nimg="fill"
                                              className="w-full h-full object-cover"
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
                                        </div>
                                        <div>
                                          <p className="text-[18px] font-medium text-qblack">
                                            {item.userID.fullname}
                                          </p>
                                          <p className="text-[13px] font-normal text-qgray">
                                            {item.userID?.address}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className="flex">
                                          {Array.from(
                                            { length: item.rating },
                                            (_, index) => (
                                              <span key={index}>
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
                                            )
                                          )}
                                        </div>
                                        <span className="text-[13px] font-normal text-black mt-1 inline-block">
                                          ({item.rating}.0)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="comment">
                                      <p className="text-[15px] text-gray leading-7 text-normal">
                                        {item.comment}
                                      </p>
                                    </div>
                                    {/* <div className="sub-comment-item bg-white px-10 pt-[32px] border-t">
                                      <div className="comment-author mb-3">
                                        <div className="flex space-x-3 items-center">
                                          <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
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
                                                srcSet="/_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=640&q=75 640w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=750&q=75 750w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=828&q=75 828w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=1080&q=75 1080w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=1200&q=75 1200w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=1920&q=75 1920w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=2048&q=75 2048w, /_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=3840&q=75 3840w"
                                                src="/_next/image?url=%2Fassets%2Fimages%2Fcomment-user-2.png&w=3840&q=75"
                                                decoding="async"
                                                data-nimg="fill"
                                                className="w-full h-full object-cover"
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
                                          </div>
                                          <div>
                                            <p className="text-[18px] font-medium text-qblack" />
                                            <p className="text-[13px] font-normal text-qgray">
                                              London,UK
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="comment mb-[30px]">
                                        <p className="text-[15px] text-qgray leading-7 text-normal">
                                          Lorem Ipsum is simply dummy text of
                                          the printing and typesetting industry.
                                        </p>
                                      </div>
                                    </div> */}
                                  </div>
                                ))}
                              </div>
                              <div className="w-full flex justify-center">
                                <button
                                  type="button"
                                  className="bg-black text-white w-[300px] h-[50px] text-sm font-semibold"
                                >
                                  Load More
                                </button>
                              </div>
                            </div>
                            <form
                              onSubmit={handleComment}
                              className="write-review w-full"
                            >
                              <h1 className="text-2xl font-medium text-qblack mb-5">
                                Write Your Reviews
                              </h1>
                              <div className="flex space-x-1 items-center mb-[30px]">
                                <div className="star-rating flex">
                                  <button
                                    type="button"
                                    onClick={() => handleRating(1)}
                                    className={
                                      rating >= 1
                                        ? "text-yellow-400"
                                        : "text-gray-400"
                                    }
                                  >
                                    <svg
                                      width={19}
                                      height={18}
                                      viewBox="0 0 19 18"
                                      fill="none"
                                      className="fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRating(2)}
                                    className={
                                      rating >= 2
                                        ? "text-yellow-400"
                                        : "text-gray-400"
                                    }
                                  >
                                    <svg
                                      width={19}
                                      height={18}
                                      viewBox="0 0 19 18"
                                      fill="none"
                                      className="fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRating(3)}
                                    className={
                                      rating >= 3
                                        ? "text-yellow-400"
                                        : "text-gray-400"
                                    }
                                  >
                                    <svg
                                      width={19}
                                      height={18}
                                      viewBox="0 0 19 18"
                                      fill="none"
                                      className="fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRating(4)}
                                    className={
                                      rating >= 4
                                        ? "text-yellow-400"
                                        : "text-gray-400"
                                    }
                                  >
                                    <svg
                                      width={19}
                                      height={18}
                                      viewBox="0 0 19 18"
                                      fill="none"
                                      className="fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRating(5)}
                                    className={
                                      rating >= 5
                                        ? "text-yellow-400"
                                        : "text-gray-400"
                                    }
                                  >
                                    <svg
                                      width={19}
                                      height={18}
                                      viewBox="0 0 19 18"
                                      fill="none"
                                      className="fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" />
                                    </svg>
                                  </button>
                                </div>
                                <span className="text-qblack text-[15px] font-normal mt-1">
                                  ({rating}.0)
                                </span>
                              </div>
                              <div className="w-full review-form ">
                                <div className="sm:flex sm:space-x-[30px] items-center mb-5"></div>
                                <div className="w-full mb-[10px]">
                                  <h6 className="input-label text-gray-400 capitalize text-[13px] font-normal block mb-2 ">
                                    Message*
                                  </h6>
                                  <textarea
                                    name="comment"
                                    onChange={handleChange}
                                    cols={30}
                                    rows={3}
                                    placeholder="Mời bạn để lại bình luận..."
                                    value={inputs.comment}
                                    className="w-full focus:ring-0 focus:outline-none p-4 border border-yellow-400"
                                  />
                                </div>
                                {validationErrors &&
                                  validationErrors.comment && (
                                    <p className="mt-1 text-red-500">
                                      <li>{validationErrors.comment.msg}</li>
                                    </p>
                                  )}
                                <div className="flex justify-end">
                                  <button
                                    type="submit"
                                    className="bg-black text-white w-[300px] h-[50px] flex justify-center"
                                  >
                                    <span className="flex space-x-1 items-center h-full">
                                      <span className="text-sm font-semibold">
                                        Submit Review
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === 2 ? (
                    <div className="max-w-6xl mx-auto">
                      <div
                        data-aos="fade-up"
                        className="w-full tab-content-item aos-init aos-animate"
                      >
                        <div className="saller-info-wrapper w-full">
                          <div className="items-center flex justify-center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: detailProduct?.specificationsProduct,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="related-product w-full bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="w-full py-[60px]">
                  <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                    Related Product
                  </h1>
                  {filteredRelated.length > 0 ? (
                    <div
                      data-aos="fade-up"
                      className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 aos-init"
                    >
                      {filteredRelated?.map((item) => (
                        <div className="item">
                          <div
                            className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
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
                                  className="flex h-full w-full items-center justify-center opacity-1 leading-0 font-bold text-sx bg-yellow-400"
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
                                <span className="w-10 h-10 flex justify-center items-center bg-gray-300 rounded">
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
                                <span className="w-10 h-10 flex justify-center items-center bg-gray-300 rounded">
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
                                <span className="w-10 h-10 flex justify-center items-center bg-gray-300 rounded">
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
                  ) : (
                    <div className="items-center flex justify-center">
                      <img
                        src="https://i.imgur.com/2yNJN6H.png"
                        alt=""
                        width={200}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
