import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center flex-col h-[100vh] gap-y-10'>
            <div className='text-9xl'>
                404
            </div>
            <div className='text-xl'>Trang bạn yêu cầu không tồn tại!</div>
            <div>
                <Link to={'/'} className='rounded p-2 bg-[rgb(14,211,207)] font-medium text-black hover:bg-[rgba(14,211,207,0.7)]'>Quay lại trang chủ</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;