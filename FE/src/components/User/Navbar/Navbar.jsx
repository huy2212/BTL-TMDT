import React from "react";

const Navbar = (props) => {
    const user = JSON.parse(localStorage.getItem("authorization")).name
    
    return (
        <>
            <div className="flex gap-x-3 mb-5">
                <img className="rounded-full w-[45px]" src="/static/images/user/avatar1.png" alt="" />
                <div className="flex flex-col">
                    <span className="text-sm text-[rgb(100_100_109)]">Tài khoản của</span>
                    <span>{user}</span>
                </div>
            </div>
            <div>
                <ul className="[&>*:not(:last-child)]:mb-2">
                    {
                        Object.entries(props.tabs).map(([key, tab]) => (
                            tab.display && 
                            <li key={key} value={key} className={`flex gap-x-3 items-center px-4 py-[7px] rounded hover:bg-[rgb(230_230_230)] cursor-pointer ${key == props.activeTab ? `bg-[rgb(230_230_230)]` : ''}`} onClick={() => { props.setActiveTab(key); console.log(key, props.activeTab) }}>
                                {tab.icon}
                                <span>{tab.name}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Navbar;