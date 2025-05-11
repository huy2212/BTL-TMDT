import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { notify } from '../Admin/notify';

const DeliveryAddress = (props) => {
    const userInfo = useSelector(state => state.users.loginUser)
    const addressInfoRef = useRef(null)
    const [isChangeAddress, setIsChangeAddress] = useState(false)
    const [user, setUser] = useState(null)
    const [address, setAddress] = useState('')
    const [userOrderInfo, setUserOrderInfo] = useState(null)
    useEffect(() => {
        setUser(userInfo)
        const receiveAddress = sessionStorage.getItem("receiveAddress")
        if (receiveAddress) setAddress(receiveAddress)
        else {
            if(userInfo){
                setAddress(userInfo.address)
                sessionStorage.setItem("receiveAddress",userInfo.address)
            }
        }
    }, [userInfo])
    const handleChangeAddress = () => {
        if(isChangeAddress===false ) setIsChangeAddress(!isChangeAddress);
        if (isChangeAddress === true) {
            if(address===""){
                notify("Không được để trống địa chỉ",3)
                return;
            }
            setIsChangeAddress(!isChangeAddress); 
            sessionStorage.setItem("receiveAddress",address)
        }
        setTimeout(() => {
            addressInfoRef.current.focus();
        })
    }
    return (
        <div className="p-4 mb-3 bg-white rounded">
            <div className="flex justify-between mb-3">
                <div className="text-lg">Giao tới</div>
                <span className="text-[rgb(11_116_229)] cursor-pointer"
                    onClick={handleChangeAddress}
                >{!isChangeAddress ? "Thay đổi địa chỉ nhận hàng" : "Lưu"}</span>
            </div>
            <div className="flex font-bold text-[15px]">
                <div className="user-name">{user ? user.name : ""}</div>
                <div className="w-[1px] bg-[rgb(235_235_240)] mx-2"></div>
                <div className="phone-number">{user ? user.phoneNumber : ""}</div>
            </div>
            <div className="text-[15px]">
                <span className="bg-[rgb(255_245_235)] text-[rgb(255_130_10)] text-sm mr-0.5">Địa chỉ nhận </span>
                <br></br>
                <textarea ref={addressInfoRef} disabled={!isChangeAddress} style={{ width: "100%" }} value={address ? address : ""} rows="4" onChange={(e) => setAddress(e.target.value)} ></textarea>
            </div>
        </div>
    );
};

export default DeliveryAddress;