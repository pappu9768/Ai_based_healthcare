import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Api';
// checking role while login
//if role is doctor then redirect to doctor more info page
//doctor can skip it but it would alert by msging that it would not able to get any appointments then 
const DoctorInfo = () => {

    const navigate = useNavigate();

    const [doctorInfo, setDoctorInfo] = React.useState({
        specialization: '',
        experience: '',
        licenseNumber: ''
    })
    const { user, loading, setLoading } = useContext(AuthContext)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]);

    const handleSkip = () => {
        navigate('/home')
    }

    const handleDoctorForm = (e) => {
        e.preventDefault();
        console.log(doctorInfo)
        try {
            api.post('/api/v1/:id/doctorInfo')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full min-h-screen bg-black flex items-center justify-center'>
                <div className='w-full max-w-md'>
                    <div className='bg-zinc-700 rounded-2xl p-6'>
                        <div className='text-center '>
                            <h3 className='text-4xl font-extrabold text-white mb-5'>Doctor Form</h3>
                        </div>

                        <div>
                            <form onSubmit={handleDoctorForm} className='space-y-5'>
                                <label htmlFor="specialization"
                                    className='block text-white mt-3 font-medium'

                                >Specialization:</label>
                                <input type="text" name="specialization" id="" placeholder='Enter your Specialization'
                                    className='w-full  px-2 py-3 border-3 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500'
                                    onChange={(e) => setDoctorInfo({ ...doctorInfo, specialization: e.target.value })}
                                />


                                <label htmlFor="experience" className='block text-white mt-3 font-medium'>Experience:</label>
                                <input type="text" name="experience" id="" placeholder='enter your experience' className='w-full  px-2 py-3 border-3 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500'
                                    onChange={(e) => setDoctorInfo({ ...doctorInfo, experience: e.target.value })}
                                />

                                <label htmlFor="licenseNumber" className='block text-white mt-3 font-medium'>License Number:</label>
                                <input type="text" name="licenseNumber" id="" placeholder='Enter your licenseNumber' className='w-full  px-2 py-3 border-3 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500'
                                    onChange={(e) => setDoctorInfo({ ...doctorInfo, licenseNumber: e.target.value })}
                                />

                                <button className='w-full px-2 py-1 rounded-lg border bg-zinc-900 text-white mt-5' type='submit'>Submit</button>

                            </form>

                            <div>
                                <button onClick={handleSkip} className='absolute bottom-1 right-2'>Skip</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DoctorInfo
