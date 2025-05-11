import React from "react";
import { FaPaperPlane } from "react-icons/fa";
const Consultation = () => {
  return (
    <div>
      <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="flex items-end mx-[-12px] justify-between flex-wrap">
          <div className="md:w-[41.666667%] w-full px-[12px]">
            <div>
              <h2 className="text-[40px] font-[700] text-[#031230]">
                Đăng ký tư vấn ngay{" "}
              </h2>
            </div>
            <div className="pb-[24px] mt-[30px]">
              <form action="" className="relative">
                <div className="mb-[25px] w-full">
                  <span className="relative flex">
                    <input
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                    />
                  </span>
                </div>
                <div className="mb-[25px] w-full">
                  <span className="relative flex">
                    <input
                      type="text"
                      placeholder="Nhập email của bạn"
                      className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                    />
                  </span>
                </div>
                <div className="mb-[25px] w-full">
                  <span className="relative flex">
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại của bạn"
                      className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                    />
                  </span>
                </div>
                <div className="mb-[25px] w-full">
                  <span className="relative flex">
                    <textarea
                      cols="40"
                      rows="10"
                      type="text"
                      placeholder="Nhập nội dung yêu cầu"
                      className="w-full text-[14px] font-[400] min-h-[84px] px-[20px] py-[10px] rounded-[12px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                    ></textarea>
                  </span>
                </div>
                <div className="border border-solid border-[#f66315] w-fit mx-auto min-w-[120px] rounded-[4rem] relative">
                  <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                    <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                      <FaPaperPlane className="text-[16px]" />
                      <span className="text-[16px] font-[500] leading-[1.2]">
                        Gửi đi
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-[50%] w-full px-[12px]">
            <div className="h-full relative">
              <div className="absolute w-[130%] pt-[130%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] -z-1 opacity-[0.5] bg-4"></div>
              <img
                src="/static/images/web-images/footer.png"
                alt=""
                width="606"
                height="527"
                className="w-full block max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
