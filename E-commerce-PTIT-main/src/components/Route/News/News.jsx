import React from "react";

const News = () => {
  return (
    <div className="mb-[30px] mt-[60px]">
      <div className="relative h-full w-full">
        <div className="absolute w-full h-full top-0 bg-[#f66315]"></div>
        <div className="z-1 pb-[100px] pt-[50px] relative xl:px-[45px] xl:max-w-[1349px] px-[10px] w-full max-w-full mx-auto">
          <div className="flex items-center gap-2 justify-between sm:mx-auto mx-[0px]">
            <h2 className="text-[40px] font-[700] text-[#fff]">Tin tức</h2>
            <div className="border border-solid border-[#f66315] w-fit mr-6 min-w-[120px] rounded-[4rem] relative">
              <div className="cursor-pointer relative bg-[#fff] hover:bg-[#f66315] hover:text-[#fff] hover:border hover:border-solid hover:border-[#fff] text-[#000] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                <a
                  href="/vot-cau-long"
                  className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]"
                >
                  <span className="text-[16px] font-[500] leading-[1.2]">
                    Xem tất cả
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="sm:mx-auto mx-[0px]">
            <div className="relative cursor-grab mx-auto overflow-hidden list-none p-0 z-1 box-border mt-[30px]">
              <div className="transition-transform relative w-full h-full z-1 flex flex-wrap box-content justify-between">
                <div className="xl:w-[290px] lg:w-[228px] md:w-[280px] sm:w-[280px] w-[210px] mr-[20px] shrink-0 h-full relative transition-transform">
                  <div>
                    <a
                      href="/tin-tuc"
                      className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                    >
                      <img
                        width="400"
                        height="400"
                        className="w-auto h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 "
                        src="https://cdn.shopvnb.com/img/400x240/uploads/tin_tuc/vot-cau-long-dat-nhat-the-gioi-2022.webp"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                    <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                      <a
                        href="/tin-tuc"
                        className="text-[#000] font-[500] line-clamp-2 no-underline hover:text-[#f66315]"
                      >
                        Top những cây vợt cầu lông đắt nhất thế giới năm 2024
                        của các thương hiệu nổi tiếng
                      </a>
                    </h3>
                    <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#f66315] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                      <span className="bg-[#f66315] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
                        15-01-2024 10:29
                      </span>
                    </p>
                    <p className="text-[14px] text-[#333] font-[400] text-center mb-0 line-clamp-3">
                      Bạn đam mê cầu lông, thường xuyên tìm hiểu về những sản
                      phẩm cầu lông thì chắc bạn đã biết để mua được một cây vợt
                      cầu lông chất lượng tốt thì phải bỏ ra khá nhiều chi phí.
                      Nhưng có lẽ rất nhiều người chơi cầu lông hiện tại vẫn
                      đang thắc mắc những cây vợt cầu lông đắt nhất thế giới,
                      vợt cầu lông xịn nhất thế giới là cây vợt nào? Cùng
                      ShopVNB điểm qua top những gương mặt sáng giá những cái
                      tên đang có giá trị nhất của 4 thương hiệu lớn bao gồm
                      Yonex, Lining, Victor và Mizuno, đây đều là các dòng cao
                      cấp được các VĐV trên thế giới sử dụng nhiều nhất hiện
                      nay. Đương nhiên những mặt hàng limited của các VĐV hay
                      các SET vợt sẽ không được liệt kê vào danh sach này.
                    </p>
                  </div>
                </div>

                <div className="xl:w-[290px] lg:w-[228px] md:w-[280px] sm:w-[280px] w-[210px] mr-[20px] shrink-0 h-full relative transition-transform">
                  <div>
                    <a
                      href="/tin-tuc"
                      className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                    >
                      <img
                        width="400"
                        height="400"
                        className="w-auto h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 "
                        src="https://cdn.shopvnb.com/img/400x240/uploads/tin_tuc/cac-giai-tennis.webp"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                    <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                      <a
                        href="/tin-tuc"
                        className="text-[#000] font-[500] line-clamp-2 no-underline hover:text-[#f66315]"
                      >
                        Top 10 giải quần vợt nổi tiếng nhất thế giới hiện nay
                        dành cho người chơi chuyên nghiệp
                      </a>
                    </h3>
                    <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#f66315] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                      <span className="bg-[#f66315] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
                        15-01-2024 10:29
                      </span>
                    </p>
                    <p className="text-[14px] text-[#333] font-[400] text-center mb-0 line-clamp-3">
                      Các giải quần vợt thế giới là sân chơi của những tay vợt
                      hàng đầu và thu hút hàng triệu người hâm mộ trên toàn thế
                      giới. Từ các giải Grand Slam, ATP World Tour đến các giải
                      đấu đồng đội, luôn đem đến sân chơi đầy cạnh tranh, kỳ thú
                      và đầy sức hút. Nhằm tạo cơ hội cho các vận động viên
                      tranh tài cũng như thu hút khán giả đến xem. Cùng VNB điểm
                      qua 10 giải đấu tennis chuyên nghiệp nhất hiện nay bao
                      gồm:
                    </p>
                  </div>
                </div>

                <div className="xl:w-[290px] lg:w-[228px] md:w-[280px] sm:w-[280px] w-[210px] mr-[20px] shrink-0 h-full relative transition-transform">
                  <div>
                    <a
                      href="/tin-tuc"
                      className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                    >
                      <img
                        width="400"
                        height="400"
                        className="w-auto h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 "
                        src="https://cdn.shopvnb.com/img/400x240/uploads/tin_tuc/vot-cau-long-thi-dau.webp"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                    <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                      <a
                        href="/tin-tuc"
                        className="text-[#000] font-[500] line-clamp-2 no-underline hover:text-[#f66315]"
                      >
                        Top 10 vợt cầu lông thi đấu dành cho người chơi chuyên
                        nghiệp hàng đầu hiện nay
                      </a>
                    </h3>
                    <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#f66315] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                      <span className="bg-[#f66315] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
                        15-01-2024 10:29
                      </span>
                    </p>
                    <p className="text-[14px] text-[#333] font-[400] text-center mb-0 line-clamp-3">
                      Để phù hợp với mục đích luyện tập và thi đấu khác nhau,
                      người chơi cần phãi thận trọng trong việc lựa chọn cho
                      mình những cây vợt phù hợp. Việc lựa chọn này không hề đơn
                      giản bởi ngày này, có rất nhiều loại vợt với nhiều mẫu mã
                      đa dạng. Đễ dễ dàng hơn, ShopVNB xin gợi ý Top 10 vợt cầu
                      lông thi đấu đang làm mưa làm gió trên thị trường hiện
                      nay. Đặc biệt chúng được các VĐV thi đấu hàng đầu thế giới
                      tin dùng và dành được nhiều thành tích nổi bật.
                    </p>
                  </div>
                </div>

                <div className="xl:w-[290px] lg:w-[228px] md:w-[280px] sm:w-[280px] w-[210px] mr-[20px] shrink-0 h-full relative transition-transform">
                  <div>
                    <a
                      href="/tin-tuc"
                      className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                    >
                      <img
                        width="400"
                        height="400"
                        className="h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 "
                        src="https://lh4.googleusercontent.com/pDPRzuVQRwwViYZ9jupiEPNOJitG0qBwOkXOnkjIa-UdG_NIxJGA_e4in6Hj2FzNoRgU6ZPX76gSsP0sYnGeDwL2sDpfG6t8vJrXf_hBMg9rZfg7v6Tn6GV6FMxncDziHJw_ESoD"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                    <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                      <a
                        href="/tin-tuc"
                        className="text-[#000] font-[500] line-clamp-2 no-underline hover:text-[#f66315]"
                      >
                        Top 8 cây vợt nặng đầu được ưa chuộng nhất hiện nay dành
                        cho lối chơi chuyên công
                      </a>
                    </h3>
                    <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#f66315] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                      <span className="bg-[#f66315] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
                        15-01-2024 10:29
                      </span>
                    </p>
                    <p className="text-[14px] text-[#333] font-[400] text-center mb-0 line-clamp-3">
                      Vợt nặng đầu được thiết kế đặc biệt để phục vụ những người
                      chơi có phong cách tấn công, cũng như có những đặc điểm
                      riêng biệt giúp người chơi tạo ra cú đánh mạnh mẽ. Trong
                      bài viết này, chúng ta sẽ tìm hiểu về đặc điểm của dòng
                      vợt này và điểm qua một vài cái tên tiêu biểu để người
                      chơi có thể tham khảo để nâng cao kỹ năng tấn công cho bản
                      thân.
                    </p>
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

export default News;
