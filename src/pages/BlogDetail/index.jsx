import React from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "../../services/blog.service";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

export default function BlogDetail() {
  const { slug } = useParams();
  const { data, isLoading } = useQuery(
    ["blog"],
    () => blogService.fetchBlogBySlug(slug),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  return (
    <Layout>
      <div className="w-full  pt-0 pb-0">
        <div className="blog-page-wrapper w-full" >
          <div className="title-area mb-[60px]">
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
                        <a href="/blogs/blog">
                          <span className="mx-1 capitalize">blog details</span>
                        </a>

                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-qblack">
                    Blog Details
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="content-area w-full" >
              <div className="max-w-6xl mx-auto">
                <div className="blog-article lg:flex lg:space-x-[30px] mb-7">
                  <div className="flex-1">
                    <div className="img w-full h-[457px] relative">
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
                          alt="blog"
                          sizes="100vw"
                          srcSet={data.imageBlog}
                          src={data.imageBlog}
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
                    <div className="blog pl-[24px] pt-[24px]">
                      <div className="short-data flex space-x-9 items-center mb-3">
                        <div className="flex space-x-1.5 items-center">
                          <span>
                            <svg
                              width={12}
                              height={15}
                              viewBox="0 0 12 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.761 14.9996C1.55973 14.9336 1.35152 14.8896 1.16065 14.7978C0.397206 14.4272 -0.02963 13.6273 0.00160193 12.743C0.0397743 11.6936 0.275749 10.7103 0.765049 9.7966C1.42439 8.56373 2.36829 7.65741 3.59327 7.07767C3.67309 7.04098 3.7529 7.00428 3.85007 6.95658C2.68061 5.9512 2.17396 4.67062 2.43422 3.10017C2.58691 2.18285 3.03804 1.42698 3.72514 0.847238C5.24163 -0.42967 7.34458 -0.216852 8.60773 1.1738C9.36424 2.00673 9.70779 3.01211 9.61757 4.16426C9.52734 5.31642 9.01375 6.23374 8.14619 6.94924C8.33359 7.04098 8.50363 7.11436 8.6702 7.20609C10.1485 8.006 11.1618 9.24254 11.6997 10.9011C11.9253 11.5945 12.0328 12.3137 11.9912 13.0476C11.9357 14.0163 11.2243 14.8235 10.3151 14.9703C10.2908 14.974 10.2665 14.9886 10.2387 14.9996C7.41051 14.9996 4.58575 14.9996 1.761 14.9996ZM6.00507 13.8475C7.30293 13.8475 8.60079 13.8401 9.89518 13.8512C10.5684 13.8548 10.9571 13.3338 10.9015 12.7577C10.8807 12.5486 10.8773 12.3394 10.846 12.1303C10.6309 10.6185 9.92294 9.41133 8.72225 8.5784C7.17106 7.50331 5.50883 7.3602 3.84313 8.23349C2.05944 9.16916 1.15718 10.7506 1.09125 12.8568C1.08778 13.0072 1.12595 13.1723 1.18494 13.3044C1.36193 13.6934 1.68466 13.8438 2.08026 13.8438C3.392 13.8475 4.70027 13.8475 6.00507 13.8475ZM5.99119 6.53462C7.38969 6.54195 8.53833 5.33843 8.54527 3.85238C8.55221 2.37733 7.41745 1.16647 6.00507 1.15179C4.62046 1.13344 3.45794 2.35531 3.45099 3.8377C3.44405 5.31275 4.58922 6.52728 5.99119 6.53462Z"
                                fill="#FFBB38"
                              />
                            </svg>
                          </span>
                          <span className="text-base text-qgraytwo capitalize">
                            By {data.userBlog}
                          </span>
                        </div>
                      </div>
                      <div className="details">
                        <h1 className="text-[22px] text-qblack font-semibold line-clamp-2 mb-1 capitalize">
                          {data.titleBlog}
                        </h1>
                        <p
                          className="text-qgraytwo text-[15px] leading-[30px] mb-10 text-slate-500"
                          dangerouslySetInnerHTML={{
                            __html: data.contentBlog,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
