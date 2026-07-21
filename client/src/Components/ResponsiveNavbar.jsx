import React from 'react'
import { GiCancel } from "react-icons/gi";

const ResponsiveNavbar = ({ showMenu, setShowMenu }) => {
    return (
        <>
            <div
                className={`fixed top-0 left-0 z-50 h-screen w-[75%] bg-white rounded-r-xl shadow-lg transform transition-transform duration-300 ease-in-out
                            ${showMenu ? "translate-x-0" : "-translate-x-full"} md:hidden`}
            >
                <GiCancel
                    className="text-3xl cursor-pointer m-4"
                    onClick={() => setShowMenu(false)}
                />
            </div>
        </>
    )
}

export default ResponsiveNavbar
