import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('tokens');
        navigate('/login');
    }
  return (
    <>
    <nav className='w-full h-20.5 bg-black flex items-center justify-between'>
        <div className='text-3xl font-bold text-white ml-6 cursor-pointer'>
            <a href="/home"><h2>AI <span className='text-red-600'>Healthcare</span></h2></a>
        </div>

        <div className=' text-white font-extrabold mr-7'>
            <ul className='flex items-center justify-center gap-5'>
                <li>Home</li>
                <li>MyAppointments</li>
                <li>About us</li>
            </ul>
        </div>

        <div className='flex items-center justify-center gap-2 mr-7'>
            <IoIosLogOut className='text-white text-3xl'/>
            <button className='text-white px-2 py-2 bg-red-600 border rounded hover:bg-red-700' onClick={handleLogout}>Logout</button>
        </div>

    </nav>
    </>
  )
}

export default Navbar
