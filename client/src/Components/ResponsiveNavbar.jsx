import React from 'react'
import { GiCancel } from "react-icons/gi";
import { IoIosLogOut } from 'react-icons/io'
import { Navigate } from 'react-router-dom';
const ResponsiveNavbar = ({ showMenu, setShowMenu, role,handleLogout }) => {

    return (
        <>
            <div
                className={`fixed top-0 left-0 z-50 h-screen w-[75%] bg-black rounded-r-xl shadow-lg transform transition-transform duration-300 ease-in-out
                            ${showMenu ? "translate-x-0" : "-translate-x-full"} md:hidden`}
            >
                <div>
                    <GiCancel
                        className="text-white text-3xl cursor-pointer m-4"
                        onClick={() => setShowMenu(false)}
                    />
                </div>

                <div className='text-center mx-6'>
                    <ul className='list-style-none'>
                        <li className='text-white font-bold p-3 text-xl cursor-pointer'>Home</li>
                        <li className=' text-white font-bold p-3 text-xl cursor-pointer'>MyAppointments</li>
                        <li className='text-white font-bold p-3 text-xl cursor-pointer'>About</li>
                    </ul>
                </div>

                <div className='absolute bottom-15 left-1/2 -translate-x-1/2 '>
                    {
                        role === 'PATINET' || role === 'DOCTOR' ? (
                            <>
                                <IoIosLogOut className='text-white text-3xl'/>
                                <button className='text-white px-2 py-2 bg-red-600 border rounded hover:bg-red-700 cursor-pointer' onClick={handleLogout}>
                                    logout
                                </button>
                            </>
                         ) : 
                            (
                            <>
                                <button onClick={() => <Navigate to='/login' />} className='text-white px-2 py-2 bg-red-600 border rounded hover:bg-red-700 cursor-pointer'>Login</button>
                            </>
                        )
                        
                    }
                </div>
            </div>
        </>
    )
}

export default ResponsiveNavbar
