import React from "react";
import Tag from "./Tag";
import { Link } from "react-router-dom";

const BreadScrumb = () => {
    return (
        <div className="mt-[53px]">
            <div className="flex justify-between gap-x-5">
                <div className="pt-2 pb-2">
                    <ul className="flex list-none flex-wrap">
                        <li><Link to="/">Trang chủ /</Link></li>
                        <li> PC / Máy bộ</li>
                    </ul>
                </div>
            </div>
            <div  className="flex pt-[30px] pb-[30px] gap-x-[10px]">
                {/* <Tag/>
                <Tag/>
                <Tag/>
                <Tag/> */}
            </div>
        </div>

    )

}
export default BreadScrumb;