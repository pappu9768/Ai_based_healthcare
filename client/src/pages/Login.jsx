import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom';
import { ImCross } from "react-icons/im";
const Login = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = React.useState({
        email: '',
        password: ''
    })
    const [otpForm, setOtpForm] = React.useState(false)
    const { login, loading, verifyOtp, setUser, getUsernameAndRole } = React.useContext(AuthContext)
    const [otps, setOtps] = React.useState("");


    const handleLoginForm = async (e) => {
        e.preventDefault();
        // console.log(loginUser)
        try {

            if (!otpForm) {
                const res = await login(loginUser.email, loginUser.password);
                // console.log(res);

                if (res.data?.success) {
                    toast.success(res.data?.message)
                    const storeToken = res.data?.createToken
                    localStorage.setItem('tokens', storeToken)
                    setUser(storeToken);


                    const resultant = await getUsernameAndRole();
                    console.log(resultant)
                    if (resultant.data?.role === 'DOCTOR') {
                        navigate('/doctorinfo')
                        toast.warning('Fill this form first')
                    }else {
                        navigate('/home')
                    }
                } else if (res.data?.requireOtp) {
                    toast.info(res.data?.message)
                    setOtpForm(true)

                } else {
                    toast.error(res.data?.message)
                }
            } else {
                const resData = await verifyOtp(loginUser.email, otps)
                // console.log(resData)
                if (resData.data?.success) {
                    setOtpForm(false)
                    toast.success(resData.data?.message + "Please login again to get access to your account")

                } else if (!resData.data?.success) {
                    toast.error(resData.data?.message)
                } else {
                    toast.error(resData.data?.message)
                }
            }

        } catch (err) {
            toast.error(err?.message)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <div className='w-full min-h-screen bg-black flex items-center justify-center px-4'>
                <div className='w-full max-w-md'>
                    <div className='bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-8'>
                        <h2 className='text-3xl text-white font-bold text-center mb-7'>Login to your account</h2>

                        <form className='space-y-5' onSubmit={handleLoginForm}>
                            {
                                !otpForm ? (<>
                                    <label htmlFor="email" className='block text-gray-300 mb-3 font-medium'>Email</label>
                                    <input type="email" name="email" id="" placeholder='Enter your email'
                                        className='w-full px-4 py-3 bg-zinc-800 rounded-lg text-white border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                                        value={loginUser.email}
                                        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                                    />

                                    <label htmlFor="password" className='block text-gray-300 mb-3 font-medium'>Password</label>
                                    <input type="password" name='password' placeholder='Enter your password'
                                        className='w-full py-4 px-3 bg-zinc-800 rounded-lg text-white border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                                        value={loginUser.password}
                                        onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                                    />

                                </>) : (<>
                                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50'>
                                        <div className='bg-zinc-900 border rounded-lg px-8 py-6 text-center relative'>
                                            <Link to='/register'>
                                                <ImCross className='text-white absolute right-5 top-3 cursor-pointer' />

                                            </Link>


                                            <div>
                                                <label htmlFor="otp" className='text-white font-bold '>Enter your OTP :</label>
                                                <input type="text" placeholder='- - - - - -' className='w-full px-3 py-2 bg-white rounded-2xl text-center font-extrabold text-black letter-spacing mb-5' value={otps} onChange={(e) => setOtps(e.target.value)} />

                                                <button type='submit' className=' bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold px-2 py-3 rounded-lg'>submit</button>
                                            </div>
                                            <p className='text-center text-gray-500'>Do not refresh or leave the page</p>
                                        </div>

                                    </div>
                                </>)
                            }
                            <button className='block w-full bg-red-600 rounded-xl py-2 px-3 hover:bg-red-700 mb-5' type='submit'>Login</button>
                        </form>


                        <p className="text-center text-gray-400 mt-6 ">
                            Dont have an account?{" "}
                            <Link
                                to="/register"
                                className="text-red-500 hover:text-red-400 font-semibold"
                            >
                                Register here
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
