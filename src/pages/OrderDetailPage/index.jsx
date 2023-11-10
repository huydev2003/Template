import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import { formatPrice } from "../../utils/fomatPrice";

export default function OrderDetailPage() {
  const { slug } = useParams();
  const [isSlug, setSlug] = useState(null);
  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, [slug]);

  const { data: isOrder, isloading: loadingOrder } = useQuery({
    queryKey: ["detailOrder", isSlug],
    queryFn: () => orderService.fetchOrderByCode(isSlug),
    staleTime: 500,
    enabled: !!isSlug,
  });
  return (
    <Layout>
      {loadingOrder ? (
        <Loading />
      ) : (
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
                          <span className="mx-1 capitalize">Order</span>
                        </a>
                        <span className="sperator">/ {isOrder?.code}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-2xl font-semibold text-black">
                    Mã Đơn Hàng [{isOrder?.code}]
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[23px]">
            <div className="max-w-6xl mx-auto">
              <div className="w-full mb-[30px]">
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
                      {isOrder?.products.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b hover:bg-gray-50"
                        >
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
                                    alt="product"
                                    src={item.huydev.images[0].imagePath}
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
                                    sizes="100vw"
                                  />
                                  <noscript />
                                </span>
                              </div>
                              <div className="flex-1 flex flex-col">
                                <p className="font-medium text-[15px] text-qblack">
                                  {item.huydev.nameProduct}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className=" flex justify-center items-center">
                              <span
                                style={{
                                  backgroundColor: item.color,
                                }}
                                className={`w-[20px] h-[20px] block rounded-full`}
                              />
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px] font-normal">
                                {formatPrice(item.huydev.price_has_dropped)}
                              </span>
                            </div>
                          </td>

                          <td className=" py-4">
                            <div className="flex justify-center items-center">
                              <div className="w-[61px] h-[40px] px-[26px] flex items-center border border-qgray-border">
                                <div className="flex justify-between items-center w-full">
                                  <span className="text-qblack">
                                    {" "}
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px] font-normal">
                                {formatPrice(
                                  item.huydev.price_has_dropped * item.quantity
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[635px] h-[250px] w-full border border-[#EDEDED] px-[30px] py-[26px] mr-auto">
                  <h2 className="text-2xl font-semibold">Địa chỉ nhận hàng</h2>
                  <div className="mt-3">
                    <p className="text-gray-600 text-xl font-semibold mb-1">
                     {isOrder?.user.fullname}
                    </p>
                    <p className="text-gray-600  mb-1">Email: {isOrder?.user.email}</p>
                    <p className="text-gray-600  mb-1">(+84): {isOrder?.user.phone}</p>
                    <p className="text-gray-600">
                      Địa chỉ: {isOrder?.user.address}
                    </p>
                  </div>
                </div>
                <div className="sm:w-[500px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Tổng tiền hàng
                      </p>
                      <p className="text-[15px] font-medium text-qred">{formatPrice(isOrder?.totalPrice)}</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Phí vận chuyển
                      </p>
                      <p className="text-[15px] font-medium text-qred">0</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Vocher của shop
                      </p>
                      <p className="text-[15px] font-medium text-qred">0</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Thành tiền
                      </p>
                      <p className="text-[15px] font-medium text-qred">{formatPrice(isOrder?.totalPrice)}</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Phương thức thanh toán
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                      {isOrder?.payment[0].namePayment}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
