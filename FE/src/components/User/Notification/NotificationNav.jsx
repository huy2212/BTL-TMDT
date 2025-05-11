import React, { useState } from 'react';
import { TbDotsVertical } from "react-icons/tb";

const NotificationNav = (props) => {
    const [setting, setSetting] = useState(false);
    return (
        <div className="flex justify-between w-full pb-3 border-b-[1px] border-solid border-[rgb(196_196_207)]">
            <div className="flex gap-x-4 justify-around text-[22px] w-1/3">
                {
                    Object.entries(props.notiTabs).map(([index, tab]) => (
                        <div key={index} className="w-1/3 cursor-pointer flex flex-col items-center" title={tab.name}
                            onClick={() => props.setNotiActiveTab(index)}>
                            {tab.icon}
                            {
                                index == props.notiActiveTab ? (
                                    <div className='w-full block mt-0.5 h-0.5 bg-[rgb(10_104_255)]'>
                                    </div>
                                ) : ''
                            }
                        </div>
                    ))
                }
            </div>
            <div className='relative'>
                <div className="text-[22px] cursor-pointer"
                    onClick={() => setSetting(!setting)}>

                    <TbDotsVertical />

                </div>
                {
                    setting ? (
                        <div className='absolute flex flex-col w-60 bg-white right-0 mt-1 shadow-[0px_2px_10px_2px_#00000014] rounded px-4 py-1'>
                            <div className='text-base cursor-pointer py-1'>Đánh dấu tất cả là đã đọc</div>
                            <div className='text-base cursor-pointer py-1'>Xóa tất cả thông báo</div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
};

export default NotificationNav;