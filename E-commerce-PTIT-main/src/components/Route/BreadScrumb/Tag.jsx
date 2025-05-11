import React from "react";

const Tag = (props) => {
    return (
        <a href="a" className="block bg-[#f3f4f6] pt-[5px] pb-[5px] pl-[10px] pr-[10px] border rounded-[10px] relative overflow-hidden z-1 before:content-[''] before:absolute before:top-full before:left-0 before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:z-2 hover:before:top-0 before:ease-in-out hover:shadow-[0px_0px_9px_1px_#add8e6]">
            <div className="relative flex items-center w-full z-3">
                <img 
                className="max-w-full max-h-full"
                src='/static/images/tags/maytinh-all-in-one.webp' alt="" 
                />
            </div>
        </a>
    )
}
export default Tag;