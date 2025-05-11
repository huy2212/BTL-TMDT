import React from 'react';

const OrderNav = (props) => {
    return (
        <div className='flex w-full bg-white px-3'>
            {
                Object.entries(props.orderTabs).map(([index, tab]) => (
                    <div key={index} className={`w-1/5 text-center py-2 cursor-pointer transition-all duration-100 ${props.orderActiveTab == index ? `after:mt-0.5 after:block after:h-0.5 after:bg-[rgb(10_104_255)]` : ``} `}
                        onClick={() => {
                            props.setOrderActiveTab(index)
                            props.setStatus(tab.code)
                            }}>
                        <div >{tab.name}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default OrderNav;