import React, { useEffect } from 'react';

const ItemDetail = (props) => {
    const { data: itemDetail, setSelectItemDetail, setSelectImage, selectItemDetail } = props;
    const isAvailable = itemDetail.at(-1).quantity_stock > itemDetail.at(-1).quantity_sold

    const handleChange = () => {
        setSelectItemDetail(itemDetail.at(-1));
        setSelectImage(Math.floor(Math.random() * 3))
    };

    const isSelected = selectItemDetail !== null ? (selectItemDetail?.productItemId === itemDetail.at(-1).productItemId) : null;

    return (
        // <div>
        //     <div
        //         className={`block bg-[#f3f4f6] pt-[5px] pb-[5px] pl-[10px] pr-[10px] border rounded-[10px] relative overflow-hidden z-1 before:content-[''] before:absolute before:top-full before:left-0 before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:z-2 hover:before:top-0 before:ease-in-out hover:shadow-[0px_0px_9px_1px_#add8e6] ${isSelected ? 'bg-white shadow-[0px_0px_9px_1px_#add8e6]' : ''}`}
        //         onClick={handleChange}
        //     >
        //         <div className="relative items-center w-full z-3 text-sm">
        //             {
        //                 itemDetail.map((item) => {
        //                     if (item.important === 1) return (
        //                         <div>
        //                             {item.name}: <span className='font-bold'> {item.value} </span>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        //     {/* {itemDetail.quantity_stock === 0 && (
        //         <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 pointer-events-none'>
        //             Hết hàng
        //         </div>
        //     )} */}
        // </div>
        <div className='relative'>
            <div
                className={`block bg-[#f3f4f6] pt-[5px] pb-[5px] pl-[10px] pr-[10px] border rounded-[10px] relative overflow-hidden z-1 before:content-[''] before:absolute before:top-full before:left-0 before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:z-2 hover:before:top-0 before:ease-in-out hover:shadow-[0px_0px_9px_1px_#add8e6] ${isSelected ? 'bg-white shadow-[0px_0px_9px_1px_#add8e6]' : ''} ${!isAvailable ? 'pointer-events-none' : ''}`}
                onClick={handleChange}
            >
                <div className="relative items-center w-full z-0 text-sm">
                    {
                        console.log(itemDetail)
                        
                    }
                    {
                        itemDetail.map((attr) => {
                            if (attr.important === 1) return (
                                <div key={attr.id_variation_option}>
                                    {attr.name}: <span className='font-bold'> {attr.value} </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {!isAvailable && (
                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-1 text-xl font-bold'>
                    Hết hàng
                </div>
            )}
        </div>
    );
};

export default ItemDetail;
