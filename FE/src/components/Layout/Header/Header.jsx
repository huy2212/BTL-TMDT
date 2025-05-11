import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mqtt from "mqtt";

import { FaAngleDown, FaRegBell, FaUser, FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import HeaderCart from "./HeaderCart";
import HeaderNotification from "./HeaderNotification";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../redux/reducer/CategorySlice";
import { fetchCartItem } from "../../../redux/reducer/CartSlice";
import { fetchProduct } from "../../../redux/reducer/ProductSlice";
import { Recommender } from "./Recommender/Recommender";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("authorization"));
  const [openMenu, setOpenMenu] = useState(false);
  const [openProductList, setOpenProductList] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);
  const [categorieList, setCategorieList] = useState([
    "Laptop",
    "Dien thoai",
    "Phu kien",
  ]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notiQuantity, setNotiQuantity] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const categories = useSelector((state) => state.category.categories).map(
    (item) => ({ name: item.name, code: item.code.replace("-", "") })
  );
  const cartItem = useSelector((state) => state.cart.cartItems);

  //------------------------------Begin: Notification test-----------------------------------
  const [client, setClient] = useState(null);
  const role = JSON.parse(localStorage.getItem("authorization"));

  const mqttConnect = (url, options) => {
    console.log(options.username);
    setClient(mqtt.connect(url, options));
  };

  useEffect(() => {
    const url = `ws://192.168.211.122:8083/mqtt`;
    const options = {
      username: "test_mqtt1_" + role.role,
      password: "1234",
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    mqttConnect(url, options)
  }, [])

  useEffect(() => {
    // connect
    if (client) {
      client.on("connect", () => {
        // setConnectStatus("Connected");
        console.log("connection successful");
        // setConnectSuccess(true);
        mqttSub(client);
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        // setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setNotiQuantity(payload.message);
        // console.log(message);
      });
    }
  }, [client]);
  // đăng ký nhận tin nhắn từ topic
  const onFinish = () => {
    const url = `ws://localhost:8083/mqtt`;
    const options = {
      username: "test_mqtt1_" + role.role,
      password: "Tronghuong2002@",
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    mqttConnect(url, options);
    // mqttSub()
  };
  const mqttSub = (client) => {
    if (client) {
      client.subscribe("buy", 2, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log("Đã đăng ký tới topic buy");
        // setIsSub(true);
      });
    }
  };

  // mqttConnect(url, options)
  // mqttSub()
  //------------------------------End: Notification test-----------------------------------

  useEffect(() => {
    dispatch(fetchCartItem());
    console.log(1);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenMenu(false);
      }
    };

    // Thêm sự kiện lắng nghe resize khi component mount
    window.addEventListener("resize", handleResize);

    // Xóa sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => { }, [openNotification]);

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
    setNotiQuantity(0);
  };
  const handleLogout = () => {
    localStorage.removeItem("authorization");
    sessionStorage.clear();

    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.length !== 0) {
      navigate("/search?query=" + searchValue);
      dispatch(fetchProduct({ brandId: "", categoryId: "", key: searchValue }));
    }
  };

  return (
    <>
      <header className=" w-full fixed top-0 z-10">
        <nav className="bg-[#fff] shadow-headerShadow border-b-[0.1rem] border-b-solid border-[#fff] py-2">
          <div className="flex items-center justify-between px-4 mx-auto relative">
            <Link to="/" className="flex items-center">
              <img
                src="/static/images/logo2.jpg"
                className="w-11 mx-3 h-auto"
                alt="Techshop"
              />
            </Link>
            <div className="flex items-center lg:order-2">
              <div className="flex gap-[0.8rem] items-center">
                <div className="flex gap-[0.8rem] items-center">
                  <form className="flex items-center w-96 justify-end relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-[70%] p-[5px] rounded-l-md border-[3px] border-r-0 border-[#00B4CC] outline-none focus:transition-[width] focus:w-full focus:ease-in-out focus:duration-500"
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                    />
                    <button
                      type="submit"
                      className="bg-[#00B4CC] text-white w-10 h-10 flex items-center justify-center rounded-r-md"
                      onClick={handleSearch}
                    >
                      <FaSearch />
                    </button>
                    {searchValue && <div className="bg-[#ffffff] w-full absolute top-full left-0 z-10 rounded-md shadow-[0px_2px_10px_#000014]">
                      <Recommender searchValue={searchValue} setSearchValue={setSearchValue} />
                    </div>}
                  </form>
                </div>
                <div
                  className="flex gap-[0.8rem] items-center"
                  title="Thông báo"
                >
                  <div className="relative">
                    <button
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[1px] border-solid border-[#7f8080] cursor-pointer text-[#444545] transition-all"
                      onClick={handleOpenNotification}
                    >
                      <FaRegBell className="text-[16px] hover:text-[#f66315]" />
                    </button>
                    {notiQuantity !== 0 && <div className="absolute w-[20px] h-[20px] rounded-[50%] border border-solid border-[#feefe8] bg-[#e10600] text-[#fff] text-[10px] font-[500] flex items-center justify-center top-0 left-full translate-x-[-55%] translate-y-[-50%] z-1">
                      <span>{notiQuantity}</span>
                    </div>}
                    {openNotification && <HeaderNotification />}
                  </div>
                  <div title="Tài khoản của bạn">
                    <Link
                      to="/account"
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[1px] border-solid border-[#7f8080] cursor-pointer text-[#444545] transition-all"
                    >
                      <FaUser className="text-[16px] hover:text-[#f66315]" />
                    </Link>
                  </div>
                  <div title="Yêu thích">
                    <Link
                      to="/willist"
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[1px] border-solid border-[#7f8080] cursor-pointer text-[#444545] transition-all"
                    >
                      <FaRegHeart className="text-[16px] hover:text-[#f66315]" />
                    </Link>
                  </div>
                  <div title="Đăng xuất">
                    <button
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[1px] border-solid border-[#7f8080] cursor-pointer text-[#444545] transition-all"
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline className="text-[16px] hover:text-[#f66315]" />
                    </button>
                  </div>
                </div>
                <div className="border border-solid border-[#f66315] rounded-[4rem] relative">
                  <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] mx-auto rounded-[4rem] items-center justify-center flex duration-300 ease-in-out">
                    <div
                      onClick={() => setOpenCartList(!openCartList)}
                      className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]"
                    >
                      <FaCartShopping className="text-[16px]" />
                      <span className="text-[16px] font-[500] leading-[1.2]">
                        Giỏ hàng
                      </span>
                    </div>
                  </div>
                  <div className="absolute w-[20px] h-[20px] rounded-[50%] border border-solid border-[#feefe8] bg-[#e10600] text-[#fff] text-[10px] font-[500] flex items-center justify-center top-0 left-full translate-x-[-55%] translate-y-[-50%] z-1">
                    <span>{cartItem.length}</span>
                  </div>
                  {/* gio hang detail */}
                  {openCartList && (
                    <HeaderCart
                      openCartList={openCartList}
                      setOpenCartList={setOpenCartList}
                    />
                  )}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-[#e95221] rounded-lg lg:hidden bg-gray-100"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {openMenu === true ? (
              <div
                className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1 fixed z-50 right-0 top-[58px] bg-[#fff]"
                id="mobile-menu"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <Link
                      to="/"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] rounded lg:bg-transparent hover:text-[#fff] lg:p-0"
                      aria-current="page"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/san-pham"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] hover:text-[#fff] lg:p-0"
                    >
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/stores"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] hover:text-[#fff] lg:p-0"
                    >
                      Cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-status/1"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] hover:text-[#fff] lg:p-0"
                    >
                      Tra đơn hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-status/2"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Sản phẩm đã mua
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/tin-tuc"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] hover:text-[#fff] lg:p-0"
                    >
                      Tin tức
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lien-he"
                      className="block uppercase py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f66315] hover:text-[#fff] lg:p-0"
                    >
                      Liên hệ
                    </Link>
                  </li> */}
                </ul>
              </div>
            ) : (
              <div
                className="items-center justify-between hidden w-full lg:flex lg:w-auto md:order-1"
                id="web-navbar"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <Link
                      to="/"
                      className="block uppercase py-2 pl-3 pr-4 text-black bg-[#f66315] rounded lg:bg-transparent lg:hover:text-[#f66315] lg:p-0 "
                      aria-current="page"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li className="relative cursor-pointer">
                    <span
                      onClick={() => setOpenProductList(!openProductList)}
                      className="flex flex-nowrap justify-center text-center uppercase py-2 pl-3 pr-4 text-black  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Sản phẩm
                      <FaAngleDown className="mt-[5px]" />
                    </span>
                    {openProductList ? (
                      <div className="w-[200px] lg:bg-white lg:mt-1 lg:py-[4px] lg:pl-[10px] lg:pr-[15px] lg:absolute lg:top-[150%] lg:left-[-32px] lg:z-[999] lg:shadow-1">
                        <div className="mx-[-10px] flex flex-wrap ">
                          <div className="lg:overflow-hidden">
                            <ul className="lg:flex lg:flex-wrap my-0 pl-0 list-none ">
                              <li className="lg:w-full lg:py-[4px] lg:pr-[4px] lg:pl-[8px] lg:float-left">
                                <span className="text-[16px] mb-0 text-[#444545] font-[700] uppercase block leading-normal  w-full pb-[5px] no-underline">
                                  Danh mục sản phẩm
                                </span>
                              </li>
                              {categories.map((category, index) => (
                                <li
                                  key={index}
                                  className="lg:w-full lg:py-[4px] lg:pr-[4px] lg:pl-[8px] lg:float-left"
                                >
                                  <Link
                                    to={`/category/${category.code}`}
                                    className="text-[16px] mb-0 text-[#444545] hover:text-[#f66315] font-[600] block leading-normal  w-full pb-[5px] no-underline"
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </li>
                  <li>
                    <Link
                      to="/stores"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Cửa hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-status/1"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Tra đơn hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-status/2"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Sản phẩm đã mua
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/tin-tuc"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Tin tức
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="lien-he"
                      className="block uppercase py-2 pl-3 pr-4 text-gray-700  lg:hover:text-[#f66315] lg:p-0 "
                    >
                      Liên hệ
                    </Link>
                  </li> */}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
