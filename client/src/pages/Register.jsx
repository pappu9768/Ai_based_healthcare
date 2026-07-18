import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { ImCross } from "react-icons/im";
const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })



    const [showVerificationForm, setShowVerificationForm] = React.useState(false);
    const { register, verifyOtp, loading, OTP } = useContext(AuthContext)
    const [otps,setOtps] = React.useState("");
    const handleForm = async (e) => {
        e.preventDefault();
        console.log(user)
        try {
            if (!showVerificationForm) {
                const res = await register(user.name, user.email, user.password, user.role);
                console.log(res);
                setShowVerificationForm(true)


            } else {

                await verifyOtp(user.email, otps);
                navigate('/login')
            }
        } catch (error) {
            toast.error(error?.message)
        }


    }
    return (
        <>
            {loading && <Loading />}
            <div className="w-full min-h-screen bg-black flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-8">
                        {
                            !showVerificationForm && (
                                <>
                                    <h2 className="text-3xl font-bold text-white text-center">
                                        Create Account
                                    </h2>
                                    <p className="text-gray-400 text-center mt-2 mb-6">
                                        Join us by creating your account
                                    </p>
                                </>
                            )
                        }

                        <form className="space-y-5" onSubmit={handleForm}>

                            {
                                !showVerificationForm ?
                                    (<>{/* Name */}
                                        < div >
                                            <label
                                                htmlFor="name"
                                                className="block text-gray-300 mb-2 font-medium"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Enter your name"
                                                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={user.name}
                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-300 mb-2 font-medium"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email(please used valid email to get verified)"
                                                className="w-full px-4 py-3 text-[12px] rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={user.email}
                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-gray-300 mb-2 font-medium"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={user.password}
                                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            />
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <p className="text-gray-300 mb-3 font-medium">Select Role</p>

                                            <div className="flex gap-6">
                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value="PATIENT"
                                                        className="accent-red-500"
                                                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                                                    />
                                                    Patient
                                                </label>

                                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value="DOCTOR"
                                                        className="accent-red-500"
                                                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                                                    />
                                                    Doctor
                                                </label>
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
                                        >
                                            Sign Up
                                        </button> </>)
                                    :
                                    (
                                        <>
                                            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50'>
                                                <div className='bg-zinc-900 border rounded-lg px-8 py-6 text-center relative'>
                                                    <Link to='/register'>
                                                        <ImCross className='text-white absolute right-5 top-3 cursor-pointer' />

                                                    </Link>


                                                    <div>
                                                        <label htmlFor="otp" className='text-white font-bold '>Enter your OTP :</label>
                                                        <input type="text" placeholder='- - - - - -' className='w-full px-3 py-2 bg-white rounded-2xl text-center font-extrabold text-black letter-spacing mb-5' value={otps} onChange={(e) => setOtps(e.target.value)} />

                                                        <button type='submit' className=' bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold px-2 py-3 rounded-lg'>{ loading ? "Processing..." : "Verify Otp"}</button>
                                                    </div>
                                                    <p className='text-center text-gray-500'>Do not refresh or leave the page</p>
                                                </div>

                                            </div>
                                        </>
                                    )

                            }
                        </form>

                        {
                            !showVerificationForm && (<>
                                <p className="text-center text-gray-400 mt-6 ">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-red-500 hover:text-red-400 font-semibold"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </>)
                        }
                    </div>
                </div >
            </div >
        </>
    )
}

export default Register
