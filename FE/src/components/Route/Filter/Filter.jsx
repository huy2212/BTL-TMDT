import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const Filter = () => {
    return (
        <aside className="p-[25px] pt-[10px] flex-1 rounded-[10px] shadow-[-12px_1px_20px_5px_#00000014]">
            <div className="border-r border-[#dee2e6] [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-[#dee2e6] [&>*:not(:first-child)]:mt-[15px]">
                <div className="pt-[15px] pr-[15px] by-vendor">
                    <div className="text-base uppercase mb-3.5">
                        Hãng sản xuất
                    </div>
                    <div className="filter-item-list">
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="" id="ASRock" value="ASRock" />
                            <label className="pl-1" htmlFor="ASRock">ASRock</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="" id="Asus" value="Asus" />
                            <label className="pl-1" htmlFor="Asus">Asus</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="" id="Dell" value="Dell" />
                            <label className="pl-1" htmlFor="Dell">Dell</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="" id="HP" value="HP" />
                            <label className="pl-1" htmlFor="HP">HP</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="" id="Intel" value="Intel" />
                            <label className="pl-1" htmlFor="Intel">Intel</label>
                        </div>
                        <div className="pt-[7px] pb-[7px] pl-5 pr-5 text-sm border-none">
                            Xem thêm
                            <IoIosArrowDown className="inline-block" />
                        </div>
                    </div>
                </div>
                <div className="pt-[15px] pr-[15px] by-price">
                    <div className="text-base uppercase mb-3.5">
                        Giá
                    </div>
                    <div className="price-filter">
                        <div className="relative pb-[25px]">
                            <div className="w-full h-0.5 bg-black absolute"></div>
                            <span className="absolute size-3.5 rounded-full bg-black translate-y-[-50%] left-0"></span>
                            <span className="absolute size-3.5 rounded-full bg-black translate-y-[-50%] right-0"></span>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-20">
                                <input className="border border-black rounded-md text-[12px] w-full text-center" type="text" value="0" disabled />
                            </div>
                            <div>-</div>
                            <div className="w-20">
                                <input className="border border-black rounded-md text-[12px] w-full text-center" type="text" value="100000" disabled />
                            </div>
                        </div>

                        <button className="text-sm border-none w-20 h-[30px] rounded-[5px] text-white font-medium bg-green-600 mt-5">Lọc giá</button>
                    </div>
                </div>
                <div className="pt-[15px] pr-[15px] by-graphic">
                    <div className="text-base uppercase mb-3.5">
                        Nhu cầu đồ họa
                    </div>
                    <div className="filter-item-list">
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="graphic" id="2d" value="2d" />
                            <label className="pl-1" htmlFor="2d">Thiết kế 2D</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="graphic" id="3d" value="3d" />
                            <label className="pl-1" htmlFor="3d">Thiết kế 3D</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="graphic" id="render" value="render" />
                            <label className="pl-1" htmlFor="render">Render</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="graphic" id="animation" value="animation" />
                            <label className="pl-1" htmlFor="animation">Animation</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="graphic" id="simulation" value="simulation" />
                            <label className="pl-1" htmlFor="simulation">Kiến trúc mô phỏng</label>
                        </div>
                    </div>
                </div>
                <div className="pt-[15px] pr-[15px] by-gaming">
                    <div className="text-base uppercase mb-3.5">
                        Nhu cầu gaming
                    </div>
                    <div className="filter-item-list">
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="gaming" id="esport" value="esport" />
                            <label className="pl-1" htmlFor="esport">Esport</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="gaming" id="fullhd" value="fullhd" />
                            <label className="pl-1" htmlFor="fullhd">FullHD</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="gaming" id="2k" value="2k" />
                            <label className="pl-1" htmlFor="2k">2K</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="gaming" id="4k" value="4k" />
                            <label className="pl-1" htmlFor="4k">4K</label>
                        </div>
                    </div>
                </div>
                <div className="pt-[15px] pr-[15px] by-cpu">
                    <div className="text-base uppercase mb-3.5">
                        CPU
                    </div>
                    <div className="filter-item-list">
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="intel-celeron" value="intel-celeron" />
                            <label className="pl-1" htmlFor="intel-celeron">Intel Celeron</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="intel-pentinum" value="intel-pentinum" />
                            <label className="pl-1" htmlFor="intel-pentinum">Intel Pentinum</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="core-i3" value="core-i3" />
                            <label className="pl-1" htmlFor="core-i3">Intel Core I3</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="core-i5" value="core-i5" />
                            <label className="pl-1" htmlFor="core-i5">Intel Core I5</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="core-i7" value="core-i7" />
                            <label className="pl-1" htmlFor="core-i7">Intel Core I7</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="core-i9" value="core-i9" />
                            <label className="pl-1" htmlFor="core-i9">Intel Core I9</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="ryzen-3" value="ryzen-3" />
                            <label className="pl-1" htmlFor="ryzen-3">Ryzen 3</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="ryzen-5" value="ryzen-5" />
                            <label className="pl-1" htmlFor="ryzen-5">Ryzen 5</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="ryzen-7" value="ryzen-7" />
                            <label className="pl-1" htmlFor="ryzen-7">Ryzen 7</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="ryzen-9" value="ryzen-9" />
                            <label className="pl-1" htmlFor="ryzen-9">Ryzen 9</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="cpu" id="threadripper" value="threadripper" />
                            <label className="pl-1" htmlFor="threadripper">Threadzipper</label>
                        </div>
                    </div>
                </div>
                <div className="pt-[15px] pr-[15px] by-vga">
                    <div className="text-base uppercase mb-3.5">
                        VGA
                    </div>
                    <div className="filter-item-list">
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="arc-a380-a750" value="arc-a380-a750" />
                            <label className="pl-1" htmlFor="arc-a380-a750">INTEL ARC A380 - A750</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="gtx-1660-1660-super"
                                value="gtx-1660-1660-super" />
                            <label className="pl-1" htmlFor="gtx-1660-1660-super">GTX 1660 - 1660 SUPER</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="rx-6550-xt" value="rx-6550-xt" />
                            <label className="pl-1" htmlFor="rx-6550-xt">RX 6500 XT</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="rx-3060-3060-ti" value="rx-3060-3060-ti" />
                            <label className="pl-1" htmlFor="rx-3060-3060-ti">RTX 3060 - 3060 Ti</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="rx-4070-4070-ti" value="rx-4070-4070-ti" />
                            <label className="pl-1" htmlFor="rx-4070-4070-ti">RTX 4070 - 4070 Ti</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="rtx-4080" value="rtx-4080" />
                            <label className="pl-1" htmlFor="rtx-4080">RTX 4080</label>
                        </div>
                        <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                            <input type="checkbox" name="vga" id="rtx-4090" value="rtx-4090" />
                            <label className="pl-1" htmlFor="rtx-4090">RTX 4090</label>
                        </div>
                    </div>

                </div>
                <div className="pt-[15px] pr-[15px] by-ram-type">
                        <div className="text-base uppercase mb-3.5">
                            RAM
                        </div>
                        <div className="filter-item-list">
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-type" id="DDR4" value="DDR4" />
                                <label className="pl-1" htmlFor="DDR4">DDR4</label>
                            </div>
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-type" id="DDR5" value="DDR5" />
                                <label className="pl-1" htmlFor="DDR5">DDR5</label>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[15px] pr-[15px] by-ram-size">
                        <div className="text-base uppercase mb-3.5">
                            Dung lượng RAM
                        </div>
                        <div className="filter-item-list">
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-size" id="8gb" value="8gb" />
                                <label className="pl-1" htmlFor="8gb">8GB</label>
                            </div>
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-size" id="16gb" value="16gb" />
                                <label className="pl-1" htmlFor="16gb">16GB</label>
                            </div>
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-size" id="32gb" value="32gb" />
                                <label className="pl-1" htmlFor="32gb">32GB</label>
                            </div>
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-size" id="64gb" value="64gb" />
                                <label className="pl-1" htmlFor="64gb">64GB</label>
                            </div>
                            <div className="flex items-center mb-2 min-h-6 text-sm whitespace-nowrap">
                                <input type="checkbox" name="ram-size" id="128gb" value="128gb" />
                                <label className="pl-1" htmlFor="128gb">128GB</label>
                            </div>
                            {/* <!-- <div className="expand">
                                        Xem thêm
                                        <i className="ti-angle-down"></i>
                                    </div> --> */}
                        </div>
                    </div>
            </div>
        </aside>
    )
}
export default Filter;