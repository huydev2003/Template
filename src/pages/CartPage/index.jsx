import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteToCartAll,
  deleteToCartItem,
  getCart,
  updateToCart,
} from "../../stores/cart/actions";
import { formatPrice } from "../../utils/fomatPrice";
import { AppContext } from "../../contexts/AppContextProvider";
import { v4 as uuidv4 } from "uuid";
import createNotification from "../../utils/notification";

export default function CartPage() {
  const dispatch = useDispatch();
  const { carts, user } = useContext(AppContext);

  const totalAmountAll = carts?.reduce(
    (total, item) => total + item?.product.price_has_dropped * item.quantity,
    0
  );

  const handleUpdateCart = useCallback(async (item, operation) => {
    const updatedItem = { ...item };
    const quantityCart = parseInt(updatedItem.quantity, 10);
    if (operation === "increment") {
      updatedItem.quantity = quantityCart + 1;
    } else if (operation === "decrement") {
      if (updatedItem.quantity > 1) {
        updatedItem.quantity = quantityCart - 1;
      }
    }
    delete updatedItem.product;
    delete updatedItem._id;
    const response = await dispatch(updateToCart(updatedItem));
    if (response.status === true) {
      // Xử lý logic thành công
    } else {
      createNotification("error", "topRight", response.message);
    }
  }, [dispatch]);

  const handleDeleteItem = useCallback(async (item) => {
    const response = await dispatch(deleteToCartItem(item));
    // Xử lý logic sau khi xóa một mục
  }, [dispatch]);

  const handleDeleteAll = useCallback(async () => {
    const response = await dispatch(deleteToCartAll());
    // Xử lý logic sau khi xóa tất cả mục
  }, [dispatch]);
  return (
    <Layout>
      <div className="w-full pt-0 pb-0">
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
              <div className="max-w-6xl mx-auto">
                <div className="mb-5">
                  <div>
                    <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px]">
                      <span>
                        <a href="/">
                          <span className="mx-1 capitalize">home</span>
                        </a>
                        <span className="sperator">/</span>
                      </span>
                      <span>
                        <a href="/cart">
                          <span className="mx-1 capitalize">cart</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-qblack">
                    Your Cart
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[23px]">
            {carts?.length > 0 ? (
              <div className="max-w-6xl mx-auto">
                <div>
                  <div className="w-full mb-[30px]">
                    <React.Fragment>
                      <button
                        type="button"
                        onClick={handleDeleteAll}
                        className="mb-2 float-right border border-qgray w-[34px] h-[34px] rounded-full flex justify-center items-center"
                      >
                        <svg
                          width={17}
                          height={19}
                          viewBox="0 0 17 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7768 5.95215C15.6991 6.9104 15.6242 7.84603 15.5471 8.78237C15.3691 10.9285 15.1917 13.0747 15.0108 15.2209C14.9493 15.9473 14.9097 16.6773 14.8065 17.3988C14.6963 18.1726 14.0716 18.7161 13.2929 18.7196C10.3842 18.7323 7.47624 18.7337 4.56757 18.7189C3.70473 18.7146 3.08639 18.0794 3.00795 17.155C2.78181 14.493 2.57052 11.8302 2.35145 9.16821C2.2716 8.19442 2.1875 7.22133 2.10623 6.24824C2.09846 6.15638 2.09563 6.06451 2.08998 5.95286C6.65579 5.95215 11.2061 5.95215 15.7768 5.95215ZM5.25375 8.05803C5.25234 8.05803 5.25163 8.05803 5.25022 8.05803C5.27566 8.4573 5.3011 8.85657 5.32583 9.25584C5.46717 11.5228 5.60709 13.7891 5.75125 16.0561C5.77245 16.3897 5.99081 16.6038 6.28196 16.6024C6.58724 16.601 6.80066 16.3636 6.8056 16.0159C6.80702 15.9339 6.80136 15.8512 6.79571 15.7692C6.65367 13.4789 6.51304 11.1886 6.36888 8.89826C6.33849 8.41702 6.31164 7.93507 6.26146 7.45524C6.22966 7.1549 6.0318 6.99732 5.73076 6.99802C5.44526 6.99873 5.24033 7.2185 5.23043 7.52873C5.22619 7.7054 5.24598 7.88207 5.25375 8.05803ZM12.6102 8.05521C12.6088 8.05521 12.6074 8.05521 12.606 8.05521C12.6152 7.89055 12.6321 7.7259 12.6307 7.56195C12.6286 7.24465 12.4399 7.02417 12.1622 6.99873C11.888 6.97329 11.6484 7.16268 11.5961 7.46443C11.5665 7.63756 11.5615 7.81494 11.5502 7.9909C11.4626 9.38799 11.3749 10.7851 11.2887 12.1822C11.2103 13.4499 11.1276 14.7184 11.0576 15.9869C11.0379 16.3431 11.2463 16.5819 11.5495 16.6003C11.8562 16.6194 12.088 16.4017 12.1099 16.0505C12.2788 13.3856 12.4441 10.7208 12.6102 8.05521ZM9.45916 11.814C9.45916 10.4727 9.45986 9.13147 9.45916 7.79091C9.45916 7.25101 9.28603 6.99449 8.92845 6.99661C8.56805 6.99802 8.40198 7.24819 8.40198 7.79586C8.40127 10.4664 8.40127 13.1369 8.40268 15.8074C8.40268 15.948 8.37088 16.1289 8.44296 16.2194C8.56946 16.3763 8.76591 16.5748 8.93198 16.5741C9.09805 16.5734 9.29309 16.3727 9.41746 16.2151C9.48955 16.124 9.45704 15.9431 9.45704 15.8032C9.46057 14.4725 9.45916 13.1432 9.45916 11.814Z"
                            fill="#EB5757"
                          />
                          <path
                            d="M5.20143 2.75031C5.21486 2.49449 5.21839 2.2945 5.23747 2.09593C5.31733 1.25923 5.93496 0.648664 6.77449 0.637357C8.21115 0.618277 9.64923 0.618277 11.0859 0.637357C11.9254 0.648664 12.5438 1.25852 12.6236 2.09522C12.6427 2.2938 12.6462 2.49379 12.6582 2.73335C12.7854 2.739 12.9084 2.74889 13.0314 2.7496C13.9267 2.75101 14.8221 2.74677 15.7174 2.75172C16.4086 2.75525 16.8757 3.18774 16.875 3.81244C16.8742 4.43643 16.4078 4.87103 15.716 4.87174C11.1926 4.87386 6.66849 4.87386 2.14508 4.87174C1.45324 4.87103 0.986135 4.43713 0.985429 3.81314C0.984722 3.18915 1.45183 2.75525 2.14296 2.75243C3.15421 2.74677 4.16545 2.75031 5.20143 2.75031ZM11.5799 2.73335C11.5799 2.59625 11.5806 2.49096 11.5799 2.38637C11.5749 1.86626 11.4018 1.69313 10.876 1.69242C9.55878 1.69101 8.24225 1.68959 6.92501 1.69313C6.48546 1.69454 6.30031 1.87545 6.28265 2.3051C6.27699 2.4422 6.28194 2.58 6.28194 2.73335C8.05851 2.73335 9.7941 2.73335 11.5799 2.73335Z"
                            fill="#EB5757"
                          />
                        </svg>
                      </button>
                      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                                product
                              </td>
                              <td className="py-4 whitespace-nowrap text-center">
                                color
                              </td>

                              <td className="py-4 whitespace-nowrap text-center">
                                price
                              </td>
                              <td className="py-4 whitespace-nowrap text-center">
                                quantity
                              </td>
                              <td className="py-4 whitespace-nowrap text-center">
                                total
                              </td>
                              <td className="py-4 whitespace-nowrap text-right w-[114px]" />
                            </tr>
                            {carts?.map((item) => (
                              <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="pl-10 py-4 w-[380px]">
                                  <div className="flex space-x-6 items-center">
                                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
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
                                          alt={item.product.nameProduct}
                                          sizes="100vw"
                                          src={item.product.image}
                                          decoding="async"
                                          data-nimg="fill"
                                          className="w-full h-full object-contain"
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
                                    <div className="flex-1 flex flex-col">
                                      <p className="font-medium text-[15px] text-qblack">
                                        {item.product.nameProduct}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center py-4 px-2">
                                  <div className=" flex justify-center items-center">
                                    <span
                                    style={{
                                      backgroundColor: item.color
                                    }}
                                      className={`w-[20px] h-[20px] border block rounded-full`}
                                    />
                                  </div>
                                </td>

                                <td className="text-center py-4 px-2">
                                  <div className="flex space-x-1 items-center justify-center">
                                    <span className="text-[15px] font-normal">
                                      {formatPrice(
                                        item.product.price_has_dropped
                                      )}
                                    </span>
                                  </div>
                                </td>
                                <td className=" py-4">
                                  <div className="flex justify-center items-center">
                                    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
                                      <div className="flex justify-between items-center w-full">
                                        <button
                                          onClick={() =>
                                            handleUpdateCart(item, "decrement")
                                          }
                                          type="button"
                                          className="text-base text-gray-400"
                                        >
                                          -
                                        </button>
                                        <span className="text-black">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleUpdateCart(item, "increment")
                                          }
                                          type="button"
                                          className="text-base text-gray-400"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right py-4">
                                  <div className="flex space-x-1 items-center justify-center">
                                    <span className="text-[15px] font-normal">
                                      {formatPrice(
                                        item.product.price_has_dropped *
                                          item.quantity
                                      )}
                                    </span>
                                  </div>
                                </td>
                                <td className="text-right py-4">
                                  <div
                                    className="flex space-x-1 items-center justify-center"
                                    onClick={() => handleDeleteItem(item._id)}
                                  >
                                    <span>
                                      <svg
                                        width={10}
                                        height={10}
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                          fill="#AAAAAA"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  </div>
                  <div className="w-full sm:flex justify-between">
                    <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
                      <div className="flex-1 h-full">
                        <div className="input-com w-full h-full">
                          <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                            <input
                              placeholder="Discount Code"
                              className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none "
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-[90px] h-[50px] bg-black text-white"
                      >
                        <span className="text-sm font-semibold">Apply</span>
                      </button>
                    </div>
                    <div className="space-x-2.5">
                      <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Continue Shopping
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-[30px] flex sm:justify-end">
                    <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                      <div className="total mb-6">
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-black">
                            Total
                          </p>
                          <p className="text-[18px] font-medium text-red-500">
                            {formatPrice(totalAmountAll)}
                          </p>
                        </div>
                      </div>
                      <Link to={`/checkout/${uuidv4()}`} className="w-full h-[50px] bg-black text-white flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Proceed to Checkout
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className="flex justify-center items-center">
                  <img
                    width={400}
                    src="https://i.imgur.com/fHhc8EN.png"
                    alt="empty_cart"
                  />
                </div>
                <p className="flex justify-center items-center text-gray-400">
                  Giỏ hàng chưa có sản phẩm nào
                </p>
                <Link
                  to="/filter/all-product"
                  className="p-2 text-yellow-400 items-center flex justify-center opacity-1 leaning-6"
                >
                  Mua Sắm Ngay
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
