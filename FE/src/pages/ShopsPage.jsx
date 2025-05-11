import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Consultation from "../components/Route/Consultation/Consultation";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const ShopsPage = () => {
  return (
    <div className="font-Roboto">
      <Header />
      <div>
        <div className="bg-[#fff] mt-[58px]">
          <div className="relative">
            <div className="relative pt-[36%]">
              <div className="absolute left-0 top-0 right-0 bottom-0 z-1">
                <img
                  className="w-full h-full max-w-full"
                  src="/static/images/web-images/bn.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="bottom-[30%] left-[8%] text-center absolute">
              <div className="relative font-[700] lg:text-[64px] md:text-[48px] sm:text-[36px] text-[24px] text-white z-[2]">
                <h1>HỆ THỐNG CỬA HÀNG</h1>
              </div>
            </div>
            <div className="absolute w-full top-0 left-0 h-full z-1 bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(96,96,98,0.7)_0%,rgba(255,255,255,0.01)_100%);]">

            </div>
          </div>
        </div>
        <div className="relative z-1 my-[100px]">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="flex mx-[-20px]">
              <div className="w-[50%] px-[20px]">
                <div className="h-full relative">
                  <img
                    src="/static/images/web-images/shopdetail.jpg"
                    className="w-full h-auto max-w-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[50%] px-[20px]">
                <div className="pr-[30px] max-h-[570px] overflow-y-auto">
                  {/* options */}
                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          Huge Nguyễn Shop
                        </span>
                        <Link to="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>05849422222</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 83 Xuân La, Tây Hồ, Hà Nội </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          TechShop Tây Hồ
                        </span>
                        <a href="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>058494231132</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 221, Tân Mai, Hà Nội </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          TechShop Đà Nẵng
                        </span>
                        <a href="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>058494131231</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 123 đường Sơn Trà, quận Sơn Trà, thành phố Đà Nẵng </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          TechShop Đà Nẵng
                        </span>
                        <a href="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>05842131222</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 83 Xuân La, Tây Hồ, Đà Nẵng </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          TechShop TP. Hồ Chí Minh 1
                        </span>
                        <a href="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>03119422222</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 11 đường Nguyễn Huệ, Quận 1, thành phố Hồ Chí Minh </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-[30px]">
                    <div className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center justify-between gap-[12px]">
                        <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                          TechShop TP. Hồ Chí Minh 2
                        </span>
                        <a href="https://maps.google.com/">
                          <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                            <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                              <FaMapMarkerAlt className="text-[16px]" />
                              <span className="text-[16px] font-[500] leading-[1.2]">
                                Xem bản đồ
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-[10px] mt-[12px]">
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaPhone className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Hotline</p>
                            <p>05849422222</p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Địa chỉ</p>
                            <p>Số 123 đường Trần Phú, Quận Bình Thạnh, thành phố Hồ Chí Minh </p>
                          </div>
                        </div>
                        <div className="flex gap-[10px] text-[16px] text-[#444545]">
                          <MdEmail className="text-[12px] mt-[6px]" />
                          <div className="flex flex-col">
                            <p className="font-[700]">Email</p>
                            <p>hugenguyen@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Consultation />
      <Footer />
    </div>
  );
};

export default ShopsPage;
