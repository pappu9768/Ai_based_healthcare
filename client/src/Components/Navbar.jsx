import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ResponsiveNavbar from './ResponsiveNavbar';
import { HiMenuAlt1 } from "react-icons/hi";

const Navbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = React.useState('')
    const [showMenu, setShowMenu] = React.useState(false)
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const { getUsernameAndRole } = React.useContext(AuthContext)
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUsernameAndRole();
                setRole(result.data?.role)
            } catch (err) {
                console.error(err.response?.data)
            }
        }
        fetchUser();
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('tokens');
        navigate('/login');
    }
    return (
        <>
            <nav className='w-full h-20.5 bg-black flex items-center justify-between'>
                <div className='text-3xl font-bold text-white ml-6 cursor-pointer flex'>
                    <HiMenuAlt1
                        onClick={toggleMenu}
                        className='cursor-pointer md:hidden text-white mr-4 mt-1'
                        size={30}
                    />
                    <a href="/home"><h2>AI <span className='text-red-600'>Healthcare</span></h2></a>
                </div>

                <div className='hidden md:block text-white font-extrabold mr-7'>
                    <ul className='flex items-center justify-center gap-5'>
                        <li>Home</li>
                        <li>MyAppointments</li>
                        <li>About us</li>
                    </ul>
                </div>

                <div className='hidden md:flex items-center justify-center gap-2 mr-7'>
                    {
                        role === 'DOCTOR' || role === 'PATIENT' ? (<>
                            <IoIosLogOut className='text-white text-3xl' />
                            <button className='text-white px-2 py-2 bg-red-600 border rounded hover:bg-red-700' onClick={handleLogout}>
                                logout
                            </button>
                        </>) : (
                            <>
                                <button onClick={() => <Navigate to='/login' />}>Login</button>
                            </>
                        )
                    }
                </div>

            </nav>

            <ResponsiveNavbar showMenu={showMenu} setShowMenu={setShowMenu} />
        </>
    )
}

export default Navbar
