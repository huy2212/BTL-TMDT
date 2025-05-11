import React from "react";
const IntroBrands = () => {
  return (
    <div className="relative py-[100px] z-1 mb-[80px]">
      <div className="text-center bg-2 w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="w-[120px] h-[110px] mx-auto object-contain">
          <a href="/">
            <img
              src="/static/images/web-images/logo.png"
              alt=""
              width="397"
              height="398"
              className="max-w-full h-auto"
            />
          </a>
        </div>
        <div className="lg:text-[40px] text-[35px] font-[700] text-[#031230] text-center mb-[20px] mt-1">
          Đồng hành cùng nhiều nhãn hàng
          <br />
          uy tín trên thế giới
        </div>
        <div className="text-[#444545] text-center text-[16px]">
          Chúng tôi hân hạnh trở thành đối tác phân phối
          <br />
          của các nhãn hàng uy tín trên toàn thế giới
        </div>
      </div>

      <div className="md:left-[5%] md:top-[45%] left-0 top-[55%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/dell.svg"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="md:right-[5%] right-0 md:top-[60%] top-[54%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/asus.svg"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="left-[20%] md:top-[65%] top-[90%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/samsung.svg"

          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="md:left-[25%] left-[20%] top-[25%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/lenovo.svg"

          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="right-[18%] top-[30%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/kingston.svg"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="right-[28%] md:top-[80%] top-[90%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="/static/images/web-images/brands/lexar-1.svg"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default IntroBrands;
