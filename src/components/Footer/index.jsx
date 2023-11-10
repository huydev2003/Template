import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      <footer className="footer-section-wrapper bg-white print:hidden">
        <div className="max-w-6xl block mx-auto pt-[56px]">
          <div className="w-full flex flex-col items-center mb-[50px]">
            <div className="mb-[40px]">
              <img
                width={152}
                height={36}
                src="https://shopo-next.vercel.app/assets/images/logo.svg"
                alt="logo"
              />
            </div>
            <div className="w-full h-[1px] bg-[#E9E9E9]" />
          </div>
          <div className="lg:flex justify-between mb-[50px]">
            <div className="lg:w-[424px] ml-0 w-full mb-10 lg:mb-0">
              <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">
                About Us
              </h1>
              <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
                We know there are a lot of threa developers our but we pride
                into a firm in the industry.
              </p>
            </div>
            <div className="flex-1 lg:flex">
              <div className="lg:w-1/3 w-full mb-10 lg:mb-0">
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">Feature</h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        About Us
                      </span>
                    </li>
                    <li>
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Terms Condition
                      </span>
                    </li>
                    <li>
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Best Products
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
                <div>
                  <div className="mb-5">
                    <h6 className="text-[18] font-500 text-[#2F2F2F]">
                      General Links
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-4 ">
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Blog
                        </span>
                      </li>
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Tracking Order
                        </span>
                      </li>
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Become Seller
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
                <div>
                  <div className="mb-5">
                    <h6 className="text-[18] font-500 text-[#2F2F2F]">
                      Helpful
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-4 ">
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Flash Sale
                        </span>
                      </li>
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          FAQ
                        </span>
                      </li>
                      <li>
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Support
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
            <div className="flex lg:space-x-5 justify-between items-center mb-3">
              <div className="flex space-x-5 items-center">
                <a rel="noopener noreferrer" href="/#">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    className="fill-current text-qgray hover:text-qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.1016 4.90039C12.6538 4.90039 13.1016 4.45268 13.1016 3.90039C13.1016 3.34811 12.6538 2.90039 12.1016 2.90039C11.5493 2.90039 11.1016 3.34811 11.1016 3.90039C11.1016 4.45268 11.5493 4.90039 12.1016 4.90039Z" />
                    <path d="M8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z" />
                    <path d="M12 16H4C1.9 16 0 14.1 0 12V4C0 1.9 1.9 0 4 0H12C14.1 0 16 1.9 16 4V12C16 14.1 14.1 16 12 16ZM4 2C3.1 2 2 3.1 2 4V12C2 13 3 14 4 14H12C12.9 14 14 12.9 14 12V4C14 3.1 12.9 2 12 2H4Z" />
                  </svg>
                </a>
                <a rel="noopener noreferrer" href="/#">
                  <svg
                    width={10}
                    height={16}
                    viewBox="0 0 10 16"
                    fill="none"
                    className="fill-current text-qgray hover:text-qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z" />
                  </svg>
                </a>
                <a rel="noopener noreferrer" href="/#">
                  <svg
                    width={16}
                    height={12}
                    viewBox="0 0 16 12"
                    fill="none"
                    className="fill-current text-qgray hover:text-qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8 2.8C15.6 1.5 15 0.6 13.6 0.4C11.4 8.9407e-08 8 0 8 0C8 0 4.6 8.9407e-08 2.4 0.4C1 0.6 0.3 1.5 0.2 2.8C0 4.1 0 6 0 6C0 6 0 7.9 0.2 9.2C0.4 10.5 1 11.4 2.4 11.6C4.6 12 8 12 8 12C8 12 11.4 12 13.6 11.6C15 11.3 15.6 10.5 15.8 9.2C16 7.9 16 6 16 6C16 6 16 4.1 15.8 2.8ZM6 9V3L11 6L6 9Z" />
                  </svg>
                </a>
              </div>
              <span className="sm:text-base text-[10px] text-qgray font-300">
                ©2023
                <b
                  target="_blank"
                  rel="noreferrer"
                  className="font-500 text-qblack mx-1"
                >
                  GradTechShop
                </b>
                All rights reserved
              </span>
            </div>
            <div className>
              <img
                width={318}
                height={28}
                src="https://shopo-next.vercel.app/assets/images/payment-getways.png"
                alt="payment-getways"
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
