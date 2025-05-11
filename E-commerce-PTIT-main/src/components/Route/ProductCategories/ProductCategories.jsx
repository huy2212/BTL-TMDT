import React from "react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  return (
    <div className="pt-[12px] relative mb-5">
      <div className="absolute left-0 top-[5%] w-[5%] translate-x-[50%]">
        <img
          src="https://fbshop.vn/template/assets/images/hcate-dcor.svg"
          alt=""
          className="block w-full max-w-full h-auto"
        />
      </div>
      <div className="absolute right-0 top-[60px] w-[5%] translate-x-[-50%]">
        <img
          src="https://fbshop.vn/template/assets/images/hcate-dcor.svg"
          alt=""
          className="block w-full max-w-full h-auto"
        />
      </div>
      <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="relative z-1">
          <div className="mt-[20px]">
            <h2 className="mb-[30px] text-center text-[40px] font-[700] text-[#031230]">
              Danh mục sản phẩm
            </h2>
            <div className="mx-auto relative overflow-hidden list-none p-0 z-1">
              <div className="max-w-[1230px] flex-row flex mb-[-24px] flex-wrap mx-auto">
                <div className="md:w-[276px] w-[190px] md:mr-[24px] mx-auto mt-0 mb-[24px] h-auto shrink-0 relative">
                  <div className="h-full">
                    <Link to="/category/laptop"
                      className="group cursor-pointer  flex items-center justify-center flex-col gap-[20px] px-[12px] py-[32px] rounded-[12px] relative overflow-hidden h-full text-center "
                    >
                      <div className="absolute w-full bottom-0 h-[60%] bg-[#feefe8] duration-300 transition-all ease-in-out -z-1 group-hover:h-full group-hover:bg-[linear-gradient(0deg,rgba(148,187,233,1)_0%,rgba(238,174,202,1)_89%)]"></div>
                      <span className="flex items-center justify-center w-[126px]">
                        <img
                          width=""
                          // height="150"
                          className="block w-full max-w-full h-auto"
                          src="/static/images/category/laptop.jpg"
                          alt=""
                        />
                      </span>
                      <span className="group-hover:text-[#fff] text-[#031230] text-[24px] font-[700] duration-300 transition-all ease-in-out">
                        Máy tính xách tay
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="md:w-[276px] w-[190px] md:mr-[24px] mx-auto mt-0 mb-[24px] h-auto shrink-0 relative">
                  <div className="h-full">
                    <Link to="/category/dienthoai"
                      className="group cursor-pointer  flex items-center justify-center flex-col gap-[20px] px-[12px] py-[32px] rounded-[12px] relative overflow-hidden h-full text-center "
                    >
                      <div className="absolute w-full bottom-0 h-[60%] bg-[#fefae8] duration-300 transition-all ease-in-out -z-1 group-hover:h-full group-hover:bg-[linear-gradient(0deg,rgba(148,187,233,1)_0%,rgba(238,174,202,1)_89%)]"></div>
                      <span className="flex items-center justify-center w-[126px]">
                        <img
                          width=""
                          // height="150"
                          className="block w-full max-w-full h-auto"
                          src="/static/images/category/phone.webp"
                          alt=""
                        />
                      </span>
                      <span className="group-hover:text-[#fff] text-[#031230] text-[24px] font-[700] duration-300 transition-all ease-in-out">
                        Điện thoại di động
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="md:w-[276px] w-[190px] md:mr-[24px] mx-auto mt-0 mb-[24px] h-auto shrink-0 relative">
                  <div className="h-full">
                    <Link to="/category/phukien"
                      className="group cursor-pointer  flex items-center justify-center flex-col gap-[20px] px-[12px] py-[32px] rounded-[12px] relative overflow-hidden h-full text-center "
                    >
                      <div className="absolute w-full bottom-0 h-[60%] bg-[#ece8fe] duration-300 transition-all ease-in-out -z-1 group-hover:h-full group-hover:bg-[linear-gradient(0deg,rgba(148,187,233,1)_0%,rgba(238,174,202,1)_89%)]"></div>
                      <span className="flex items-center justify-center w-[126px]">
                        <img
                          width=""
                          // height="150"
                          className="block w-full max-w-full h-auto"
                          src="/static/images/category/phukien.jpg"
                          alt=""
                        />
                      </span>
                      <span className="group-hover:text-[#fff] text-[#031230] text-[24px] font-[700] duration-300 transition-all ease-in-out">
                        Phụ kiện công nghệ
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
