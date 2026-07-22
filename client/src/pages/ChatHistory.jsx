import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/Api';
import Loading from '../components/Loading';
import { GiCancel } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
const ChatHistory = () => {
    const navigate = useNavigate();
    const { user, loading } = React.useContext(AuthContext)
    const [historys, setHistorys] = React.useState([])
    React.useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]);

    React.useEffect(() => {
        const fetchHistory = async () => {

            try {
                const res = await api.get('/api/v1/history');
                console.log(res)
                setHistorys(res.data?.getAllConversation);
                console.log(res.data?.getAllConversation)

            } catch (err) {
                console.error(err.response)
            }
        }
        fetchHistory()
    }, [])
    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-4 flex items-center justify-between">

                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/home')}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <GiCancel className="text-3xl text-red-500" />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Chat History
                        </h2>

                        {/* Delete Button */}
                        <button
                            className="p-2 rounded-full hover:bg-red-100 transition"
                        >
                            <MdDelete className="text-3xl text-red-500 hover:text-red-700" />
                        </button>

                    </div>

                    {/* Chat History Container */}
                    <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-200 p-6">

                        {historys.length === 0 ? (
                            <div className="flex items-center justify-center h-96">
                                <p className="text-xl text-gray-500">
                                    No chat history found.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {historys.map((chat, index) => (
                                    <div
                                        key={chat._id || index}
                                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition duration-300 cursor-pointer"
                                    >
                                        {/* User Prompt */}
                                        {
                                            chat.messages.map((msgs) => (
                                                <div key={msgs._id}>
                                                    <div className={`mb-3 flex ${msgs.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[75%] rounded-xl px-2 py-4 ${msgs.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-black'}`}>
                                                            <p className='text-sm font-semibold mb-1'>
                                                                {msgs.sender === 'user' ? 'YOU' : 'AI'}
                                                            </p>

                                                            <p>{msgs.text}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }


                                        {/* Footer */}
                                        <div className="flex justify-between items-center mt-4 pt-3 border-t">
                                            <span className="text-sm text-gray-500">
                                                {new Date(chat.createdAt).toLocaleString()}
                                            </span>

                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default ChatHistory
