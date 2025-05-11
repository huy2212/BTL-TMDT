import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import UserProfile from "../components/User/Profile/UserProfile";
import Navbar from "../components/User/Navbar/Navbar";
import Order from "../components/User/Order/Order";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Notification from "../components/User/Notification/Notification";
import ChangePassword from "../components/User/Profile/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { getOwnInformation } from "../redux/reducer/UserSlice";
import { notify } from "../components/Admin/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BuyedProducts } from "../components/User/Rating/BuyedProducts";
import { fetchProduct } from "../redux/reducer/ProductSlice";
import reviewSlice from "../redux/reducer/ReviewSlice";
const UserAccountPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(0)
    const loginUser = useSelector(state => state.users.loginUser)
    const message = useSelector((state) => state.users.alert);
    const messageReview = useSelector((state) => state.review.alert);

    useEffect(() => {
        console.log(message)
        if (message != undefined) {
            dispatch(userSlice.actions.resetAlert(undefined))
            notify(message.message, message.code)
        }
    }, [message])
    useEffect(() => {
        console.log(messageReview)
        if (messageReview != undefined) {
            dispatch(reviewSlice.actions.resetAlert(undefined))
            notify(messageReview.message, messageReview.code)
        }
    }, [messageReview])
    useEffect(() => {
        dispatch(getOwnInformation())
        dispatch(fetchProduct({ brandId: "", categoryId: "", key: "" }))
    }, [dispatch])
    useEffect(() => {
        if (id !== undefined) setActiveTab(id)
        else setActiveTab(0)
    }, [])
    const tabs = {
        0: {
            name: 'Thông tin tài khoản',
            icon: <FaUser />,
            display: true,
            tab: loginUser ? <UserProfile loginUser={loginUser} activeTab={activeTab} setActiveTab={setActiveTab} /> : <p>Loading...</p>
        },
        1: {
            name: 'Quản lý đơn hàng',
            icon: <IoReceipt />,
            display: true,
            tab: <Order />
        },
        2: {
            name: 'Nhận xét sản phẩm',
            icon: <BiSolidCommentDetail />,
            display: true,
            tab: <BuyedProducts />
        },
        3: {
            name: 'Đánh giá sản phẩm',
            icon: <FaStarHalfAlt />
        },
        4: {
            name: 'Sản phẩm đã xem',
            icon: <FaEye />,
            display: true
        },
        5: {
            name: 'Thay đổi mật khẩu',
            tab: <ChangePassword loginUser={loginUser} />,
            display: false
        }
    }


    return (
        <>
            <Header />
            <div className="p-5 bg-[#efefef] mt-[58px]">
                <div className="mb-4">
                    <ul className="flex gap-x-2">
                        <li>
                            <Link className="text-[rgb(100_100_109)] hover:underline" to={"/"}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>&gt;</li>
                        <li>{tabs[activeTab].name}</li>
                    </ul>
                </div>
                <div className="grid grid-cols-5 gap-x-4">

                    <div className="col-span-1">
                        <Navbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <div className="col-span-4">
                        <h1 className="font-bold text-lg pb-[13px]">{tabs[activeTab].name}</h1>
                        {tabs[activeTab].tab}
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer></ToastContainer>
        </>

    )
}

export default UserAccountPage;