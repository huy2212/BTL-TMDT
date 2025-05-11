import React, { useEffect, useState } from "react";
import { FaBatteryHalf, FaCartShopping } from "react-icons/fa6";
import { FaCheck, FaTimes, FaRegHeart, FaMinus, FaPlus, FaStar, FaStarHalfAlt, FaUsb, FaWeight, FaSimCard } from "react-icons/fa";
import { MdWarehouse, MdOutlineFolderSpecial } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";
import { GiLightningFrequency } from "react-icons/gi";
import { AiFillWindows } from "react-icons/ai";
import { RiPhoneCameraLine, RiPhoneCameraFill } from "react-icons/ri";
import { IoMdWifi } from "react-icons/io";


import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/reducer/ProductSlice";
import ItemDetail from "./ItemDetail";
import cartSlice, { addItemToCart } from "../../redux/reducer/CartSlice";
import { notify } from "../Admin/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchCommentOfProduct } from "../../redux/reducer/ReviewSlice";
import willistSlice, { addToWillist } from "../../redux/reducer/WillistSlice";
const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [selectImage, setSelectImage] = useState(0);
  const [active, setActive] = useState(1);
  const [displayProduct, setDisplayProduct] = useState({})
  const product = useSelector(state => state.product.currentSetProduct)
  const [rating, setRating] = useState(3.5);
  const [selectItemDetail, setSelectItemDetail] = useState(null);
  const [quantity, setQuantity] = useState(1)
  const images = product.images ? product.images.map(img => img.path) : []

  const message = useSelector((state) => state.cart.alert)
  const messageFavour = useSelector(state => state.willist.alert)
  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(fetchCommentOfProduct(id))
  }, [])
  useEffect(() => {
    if (message !== undefined) notify(message.message, message.code)
    return () => {
      dispatch(cartSlice.actions.resetAlert(undefined))
    }
  }, [message, dispatch])

  useEffect(() => {
    if (messageFavour !== undefined) notify(messageFavour.message, messageFavour.code)
    dispatch(willistSlice.actions.resetAlert(undefined))
  }, [messageFavour])
  useEffect(() => {
    if (product.productId != -1) {
      let priceArray = product.itemDetails.map(item => {
        return item.at(-1).price
      })
      let totalSold = product.itemDetails.reduce((a, b) => a + b.at(-1).quantity_sold, 0)
      let tmpProduct = {
        ...product,
        isAvailable: product.itemDetails.some(item => item.at(-1).quantity_stock > item.at(-1).quantity_sold),
        minPrice: Math.min(...priceArray),
        maxPrice: Math.max(...priceArray),
        totalSold: totalSold
      }
      console.log(tmpProduct)
      setDisplayProduct(tmpProduct)
      setRating(product.rating)
    }
  }, [product])
  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      return value; // Trả về giá trị gốc nếu không phải là số
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    const formattedValue = formatter.format(value);

    return formattedValue.replace(/₫/g, 'đ');
  }
  const changeQuantity = (value) => {
    if (quantity < 2 && value === 1) return
    if(value===-1) {
      if(!selectItemDetail){
        notify("Chưa chọn mặt hàng",2)
        return;
      }
      console.log(selectItemDetail)
      const productLeft = selectItemDetail.quantity_stock - selectItemDetail.quantity_sold
      if(quantity-value>productLeft) {
        notify("Không còn sản phẩm trong kho để thêm",2)
        return;
      }
    }
    setQuantity((pre) => pre - value)
  }
  const handleAddToCart = () => {
    if (selectItemDetail) {
      let cartItem = {
        quantity: quantity,
        productItemId: selectItemDetail.productItemId
      }
      console.log(cartItem)
      dispatch(addItemToCart(cartItem))
    }
    else notify("Bạn chưa chọn loại sản phẩm", 0)
  }

  return (
    <div className="my-[100px]">
      <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="flex mx-[-12px] flex-wrap">
          {/* left */}
          <div className="w-[41.6666667%] px-[12px] max-[850px]:w-full">
            <div>
              <div className="relative">
                <div className="mx-auto relative overflow-hidden z-1">
                  <div className="w-full relative max-[850px]:w-[65%] max-[600px]:w-full mx-auto cursor-pointer duration-300 ease-in-out">
                    <img
                      className="w-full h-full object-cover max-w-full rounded-[5px]"
                      src={`${images[selectImage]}`}
                      alt=""
                    />
                    <div className="flex absolute min-w-[48px] top-[20px] left-[10px] z-1 items-center justify-center">
                      <div className="absolute w-full min-h-[48px] top-[-10px] -z-1 left-[0px] bg-no-repeat bg-contain bg-sale"></div>
                      <div className="font-[700] text-[#fff] mt-[2px]">
                        -12%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[12px]">
                <div className="w-full flex justify-center">
                  {images &&
                    images.map((i, index) => (
                      <div key={index}
                        className={`w-[100px] mr-[10px] border border-solid cursor-pointer bg-[#fff] h-full ${selectImage === index
                          ? "border-[#f66315]"
                          : "border-[#ebebeb]"
                          }`}
                      >
                        <div className={`pb-[100%] h-0 relative`}>
                          <img
                            src={`${i}`}
                            alt=""
                            height="80"
                            width="80"
                            onClick={() => setSelectImage(index)}
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-full max-h-full w-auto h-auto"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* tình trạng */}
            <div className="mt-[20px]">
              <div className="flex justify-between gap-2">
                <div className="mb-0"></div>
                {displayProduct.isAvailable ? (
                  <div className="bg-[#dcf3d8] py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] text-[#1d9d06] text-[14px]">
                    <FaCheck />
                    <div className="font-[500]">Còn hàng</div>
                  </div>
                ) : (
                  <div className="bg-[#feefe8] py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] text-[#f63e15] text-[14px]">
                    <FaTimes />
                    <div className="font-[500]">Hết hàng</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-[58.3333333%] px-[12px] max-[850px]:w-full">
            <div>
              <div className="flex gap-2 items-center justify-between">
                <h1 className="max-[1200px]:text-[35px] text-[40px] font-[700] text-[#031230]">
                  {displayProduct.name}
                </h1>
              </div>
              <div className="flex gap-[28px]">
                <div className="flex items-center gap-1">
                  <span className="font-[700] text-[#f6af15]">{rating}</span>
                  <div className="flex">
                    {
                      Array.from({ length: parseInt(displayProduct.rating) }, (_, index) => (
                        <FaStar key={index} color="orange" />
                      ))
                    }
                    {
                      (displayProduct.rating - parseInt(displayProduct.rating) >= 0.5 ? <FaStarHalfAlt color="orange" /> : '')
                    }
                    {
                      Array.from({ length: 5 - Math.round(displayProduct.rating) }, (_, index) => (
                        <FaStar key={index} color="rgb(209,209,211)" />
                      ))
                    }
                  </div>
                </div>
                <div className="flex items-center gap-1 relative">
                  <div className="absolute h-4 w-[1px] bg-[#000] top-[50%] left-[-1rem] translate-x-[-50%] translate-y-[-50%]"></div>
                  <span className="font-[700]">{displayProduct.number_rating}</span>
                  <span className="text-[14px] mt-[1px]"> đánh giá</span>
                </div>
                <div className="flex items-center gap-1 relative">
                  <div className="absolute h-4 w-[1px] bg-[#000] top-[50%] left-[-1rem] translate-x-[-50%] translate-y-[-50%]"></div>
                  <span className="font-[700]">{selectItemDetail ? selectItemDetail.quantity_sold : displayProduct.totalSold}</span>
                  <span className="text-[14px] mt-[1px]"> lượt mua</span>
                </div>
                <div className="w-[30px] h-[30px] relative rounded-[50%] flex items-center justify-center text-[#f66315] bg-[#feefe8] text-[13px] duration-300 cursor-pointer hover:text-white hover:bg-[#f66315]"
                  onClick={()=>dispatch(addToWillist(displayProduct))}
                >
                  <FaRegHeart />
                </div>
              </div>
              <div className="mt-[10px]">
                <div className="flex gap-[20px] items-center">
                  <div className="leading-[1] flex items-center gap-[10px] p-1">
                    {
                      selectItemDetail ? (
                        <span className="max-[1200px]:text-[29px] font-[700] text-[#f66315] text-[34px]">{formatCurrency(selectItemDetail.price)}</span>
                      ) : (
                        <div>
                          <span className="max-[1200px]:text-[29px] font-[700] text-[#f66315] text-[34px]">
                            {displayProduct.minPrice===displayProduct.maxPrice?`${formatCurrency(displayProduct.maxPrice)}`: `${formatCurrency(displayProduct.minPrice)} - ${formatCurrency(displayProduct.maxPrice)}` }
                          </span>
                        </div>
                      )
                    }

                  </div>
                </div>
                <div className="mt-4 flex gap-x-4 cursor-pointer">
                  {
                    displayProduct.itemDetails && displayProduct.itemDetails.map((detail, index) => (
                      <ItemDetail
                        key={index}
                        data={detail}
                        selectItemDetail={selectItemDetail}
                        setSelectImage={setSelectImage}
                        setSelectItemDetail={setSelectItemDetail}
                      />
                    ))
                  }

                </div>
                <div className="mt-[20px] flex items-center gap-[30px]">

                  <div className="flex items-center gap-[10px]">
                    <span className="min-w-[80px] font-[500]">Số lượng:</span>
                    <div className="flex mt-auto">
                      <div className="flex gap-[20px] p-[6px] rounded-[30px] border border-solid border-[#eee]">
                        <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]"
                          onClick={() => changeQuantity(1)}
                        >
                          <FaMinus className="text-[14px]" />
                        </div>

                        <p className="text-[14px] text-[#031230]">{quantity}</p>
                        <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]"
                          onClick={() => changeQuantity(-1)}
                        >
                          <FaPlus className="text-[14px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[20px] pr-[20px] flex gap-[10px]">
                  <div className="bg-[#fff] hover:bg-[#f66315] text-[#031230]  hover:text-[white] border border-solid border-[#f66315] min-w-[180px] cursor-pointer relative overflow-hidden transition-all my-0  rounded-[40px] flex items-center justify-center"

                    onClick={handleAddToCart}
                  >
                    <span className="flex items-center justify-center py-[10px] px-[20px]">
                      <span className="leading-[1.2] text-[16px] font-[700] "
                      >
                        Thêm vào giỏ
                      </span>
                    </span>
                  </div>

                  <div className="hover:bg-[#fff] bg-[#f66315] hover:text-[#031230] text-white border border-solid border-[#f66315] min-w-[180px] cursor-pointer relative overflow-hidden transition-all my-0 rounded-[40px] flex items-center justify-center">
                    <span className="flex items-center justify-center py-[10px] px-[20px] gap-[6px]">
                      <FaCartShopping className="text-[16px]" />
                      <span className="leading-[1.2] text-[16px] font-[700] ">
                        Mua ngay
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[15px]">
              <div className="relative">
                <div className="absolute w-[15%] top-[15%] right-0">
                  <img
                    className="block w-full max-w-full h-auto"
                    src="/static/images/web-images/bot.png"
                    alt=""
                  />
                </div>
                <span className="inline-block py-1 px-5 text-[#f66315] font-[500] text-[14px] rounded-t-[12px] border border-solid border-[rgb(11,116,229)] border-b-0 relative z-1 bg-[#fff] translate-y-[1px]">
                  Thông tin sản phẩm
                </span>
                <div className="flex flex-col gap-[10px] p-5 rounded-b-[12px] rounded-r-[12px] border border-solid border-[rgb(11,116,229)] relative overflow-hidden min-h-[100px]">
                  <div className="absolute w-full pt-[55%] top-0 right-0 z-0 bg-6 translate-x-[42%] rotate-[220deg]"></div>

                  {
                    displayProduct.brand && <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <MdWarehouse color="red" />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Nhà cung cấp: <span className="font-bold">{displayProduct.brand.name}</span>
                      </span>
                    </div>
                  }

                  {
                    displayProduct.itemDetails && displayProduct.itemDetails[0].slice(0, displayProduct.itemDetails[0].length - 1).map((attr) => {
                      if (attr.important !== 1)
                        return (
                          <div key={attr.id_variation_option} className="flex items-center gap-[10px]">
                            <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                              <MdOutlineCheckCircle color="red" />
                            </span>
                            <span className="text-[#444545] text-[16px] font-[400]">
                              {attr.name}: <span className="font-bold">{attr.value}</span>
                            </span>
                          </div>
                        )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mô tả */}
        <div className="mt-[100px]">
          <div className="flex flex-nowrap gap-[30px] ">
            <div
              onClick={() => setActive(1)}
              className="relative p-[20px] pt-[10px] duration-300 ease-in-out cursor-pointer rounded-t-[12px] text-[24px] font-[700]"
            >
              {active === 1 ? (
                <div>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f66315]"></div>
                  <span className="text-[#f66315] flex items-center">
                    Đánh giá {rating}{" "}
                    <FaStar color="orange" />
                  </span>
                </div>
              ) : (
                <span className="text-[#031230] flex items-center">
                  Đánh giá {rating}{" "}
                  <FaStar color="orange" />
                </span>
              )}
            </div>
            <div
              onClick={() => setActive(2)}
              className=" relative p-[20px] pt-[10px] duration-300 ease-in-out cursor-pointer rounded-t-[12px] text-[24px] font-[700]"
            >
              {active === 2 ? (
                <div>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f66315]"></div>
                  <span className="text-[#f66315]">Mô tả sản phẩm</span>
                </div>
              ) : (
                <span className="text-[#031230]">Mô tả sản phẩm</span>
              )}
            </div>
          </div>

          {active === 2 ? (

            <div className="p-[30px] rounded-b-[12px] bg-[#feefe8] relative z-1">
              <div className="px-[15px] w-full text-[#000]">
                <h2 className="text-[30px] my-[10px] font-[700]">
                  {displayProduct.name}
                </h2>
                <p className="font-[400] text-[16px]">
                  {displayProduct.description}
                </p>

              </div>
            </div>
          ) : null}
          {active === 1 ? (
            <Reviews id={id} rating={rating} number_rating={displayProduct.number_rating} number_star={displayProduct.number_star} />
          ) : null}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div >
  );
};

export default ProductDetails;
