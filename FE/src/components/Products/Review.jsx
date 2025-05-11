import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
const Review = (props) => {
    const {data} = props
    const user = data.user
 
    const getAcronym = () => { // lấy viết tắt nếu người dùng chưa cập nhật ảnh đại diện
        let arr = user.name.split(" ");
        let acronym = ""
        for(let i = arr.length - 2; i < arr.length; i++) {
            acronym += arr[i][0];
        }
        return acronym;
    }
    // const getDurationCreateAccount = () => {
    //     console.log(data)
    //     let created = new Date(user.createDate);
    //     let now = new Date();
    //     let days = parseInt((now - created) / (1000 * 3600 * 24));
    //     let months = parseInt(days / 30);
    //     let years = parseInt(days / 365);
    //     if(years >= 1) {
    //         return years + " năm trước";
    //     }
    //     if(months >= 1 ) {
    //         return months + " tháng trước";
    //     }
    //     if (days < 1) {
    //         return "hôm nay";
    //     }
    //     return days + " ngày trước"
    // }
    return (
        <div className='bg-[#f5f5fa] p-3 rounded-lg flex'>
            <div className='w-1/4 flex justify-center items-center flex-col '>
                <div className='mb-1 rounded-full w-14 h-14 bg-[rgb(194,225,255)] flex justify-center items-center overflow-hidden'>
                    {data.avatarPath ? 
                    <div className='overflow-hidden'>
                        <img src={data.avatarPath} alt="" />
                    </div> :
                    <div className='font-bold'>{getAcronym()}</div> 
                    }
                </div>
                <div className='mt-2'>
                    <div>
                        {data.user.name}
                    </div>
                </div>
            </div>
            <div className=" p-3 rounded-lg">
                <div className="flex items-center pb-2 gap-x-4">
                    <div className="flex gap-x-1">
                        {
                            Array.from({length: data.ranking}, (_, index) => (
                                <FaStar key={index} color='orange' />
                            ))
                        }
                        {
                            Array.from({length: 5 - data.ranking}, (_, index) => (
                                <FaStar key={index} color='rgb(209, 209, 211)' />
                            ))
                        }
                    </div>
                    <div className="italic text-[#95959e]">Reviewed on {data.createDate}</div>
                </div>
                <div className="pb-4">
                    <p>{data.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;