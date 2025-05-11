import React, { useState, useEffect } from 'react';
import { IP } from '../../../config/const'
import { Link } from 'react-router-dom';
function HeaderNotification() {
    const [notifications, setNotifications] = useState([])
    const user = JSON.parse(localStorage.getItem('authorization'))
    useEffect(() => {
        const fetchNoti = () => {
            fetch(`${IP}/api/notification`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then(res => res.json())
                .then(data => setNotifications(data))
                .catch(err => console.log(err))
        }
        fetchNoti()
    }, [])

    return (
        <div className='max-h-80 overflow-scroll absolute flex flex-col gap-y-1 w-[400px] bg-white right-[-50px] mt-3 rounded-lg shadow-[0px_2px_10px_#000014] p-4'>
            <div
                className=' absolute top-[-8px] right-[58px] w-0 h-0 border-l-[10px] borderl-l-solid border-l-transparent border-r-[10px] border-r-solid border-r-transparent border-b-[10px] border-solid border-white drop-shadow-[0_-5px_3px_rgba(156,143,143,0.88)] z-10'></div>
            {
                notifications.map((noti) => (
                    <Link className='relative flex gap-x-2 bg-blue-100 rounded z-0 p-2'
                        to={'/order-status/1'} title='Đi đến chi tiết'>
                        <div className='max-w-14'>
                            <img src="/static/images/notification/mascot-1.svg" alt="" />
                        </div>
                        <div className=''>
                            <div className='text-md'>Thông báo về đơn hàng!</div>
                            <div className='mt-1 text-sm'>{noti.description}</div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default HeaderNotification;