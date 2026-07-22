import React from 'react'
import { AuthContext } from '../context/AuthContext'
import heroImage from '../assets/heroImage.jpg'
import { useNavigate } from 'react-router-dom'
import CommonTemplate from '../components/CommonTemplate'
const Dashboard = ({ props }) => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('')
    const { getUsernameAndRole, user } = React.useContext(AuthContext)
    React.useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUsernameAndRole();

                setUsername(result.data?.userName)
            } catch (err) {
                console.error(err.response?.data)
            }
        }
        fetchUser();
    }, [])
    return (
        <>
            <div className="w-full py-4 bg-gray-[#95A5AD]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative mb-5">
                        <img
                            src={heroImage}
                            alt="Hero Image"
                            className="w-full h-75 sm:h-125 lg:h-150 object-cover rounded-2xl shadow-2xl"
                            loading='lazy'
                        />

                        {/* Username Card */}
                        <div className="absolute top-6 right-6 w-72 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Welcome, <span className="text-blue-600">{username}</span>
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Glad to see you again. Let's take care of your health today.
                            </p>

                            <button className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>

                    <CommonTemplate props={{
                        Texts: "AI ChatBot",
                        btnText: "Get Started",
                        onClicked: () => navigate('/chatbot'),
                        moreInfo: "Get instant health guidance from our AI chatbot. Ask questions about symptoms, medications, healthy habits, and common illnesses anytime, anywhere."
                    }} username={username}/>
                    <CommonTemplate props={{
                        Texts: "AI ChatBot History",
                        btnText: "History",
                        onClicked: () => navigate('/history'),
                        moreInfo: "Here is your chat history"
                       
                    }} />
                </div>
            </div>
        </>
    )
}

export default Dashboard
