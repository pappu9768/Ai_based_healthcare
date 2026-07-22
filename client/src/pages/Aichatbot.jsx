import React from 'react'
import api from '../api/Api.js'
import { AuthContext } from '../context/AuthContext'
import { IoSend } from "react-icons/io5";
import { toast } from 'react-toastify'
import Loading from '../components/Loading.jsx';
import { useNavigate } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";

const Aichatbot = ({username}) => {

    const navigate = useNavigate();

    const { loading, user } = React.useContext(AuthContext);
    const chatRef = React.useRef(null)
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [UserName, setUserName] = React.useState('')
    const [messages, setMessages] = React.useState([
        {
            sender: 'ai',
            text: 'Hello, how can i help you?'
        }
    ])
    const [sending, setSending] = React.useState(false)
    React.useEffect(() => {
        const getname = async () => {
            try {
                const result = await getUsernameAndRole();

                setUserName(result.data?.userName)
            } catch (err) {

            }
        }
    })

    React.useEffect(() => {
        // console.log(user)
        if (!user) {
            navigate('/login')
            return
        }
    }, [user, navigate])

    React.useEffect(() => {
        chatRef.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])



    const handleBot = async () => {
        if (!currentMessage.trim()) return;

        const userMessage = {
            sender: 'user',
            text: currentMessage
        }

        setMessages(prev => [...prev, userMessage]);

        const message = currentMessage
        // console.log(message)
        setCurrentMessage('')

        try {
            setSending(true)

            const res = await api.post('/api/v1/diagnose', { symptoms: message });

            const aiMessage = {
                sender: 'ai',
                text: res.data.aiResponse
            }

            setMessages(prev => [...prev, aiMessage])
            console.log(res)

        } catch (err) {
            console.error(err.response?.data)
            if (!err.response?.data?.success) {
                toast.error(err.response?.data?.message)
            } else {
                toast.error(err.response?.data?.message)
            }
        } finally {
            setSending(false)
        }

    }
    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-300 text-white px-6 py-5 flex">
                        <GiCancel className='text-3xl mx-5 my-auto' onClick={() => navigate('/home')} />
                        <div>
                            <h2 className="text-2xl font-bold">Welcome, {username} 👋</h2>
                            <p className="text-sm text-blue-100">
                                Ask anything about your health.
                            </p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto bg-gray-100 p-6 space-y-4">

                        {/* AI Message */}
                        {
                            messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} >

                                    <div
                                        className={`w-13 h-13 rounded-full flex items-center justify-center text-sm font-semibold mr-2 ${msg.sender === "user"
                                            ? "bg-red-800 text-white"
                                            : "bg-red-600 text-white"
                                            }`}
                                    >
                                        {msg.sender === "user" ? "U" : "AI"}
                                    </div>
                                    <div className={`max-w-[75%] px-2 py-3 rounded-2xl shadow whitespace-pre-wrap wrap-break-word ${msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-white text-gray-800 border-gray-200 rounded-bl-md'}`}>
                                        {msg.text}
                                    </div>
                                    <div ref={chatRef}></div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Input */}
                    <div className="border-t bg-white p-4">
                        <div className="flex items-end gap-3">

                            <textarea
                                rows={2}
                                placeholder="Type your message..."
                                className="flex-1 resize-none border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleBot();
                                    }
                                }}
                            />

                            <button className="bg-red-600 hover:bg-red-700 transition text-white p-3 rounded-xl shadow-lg" onClick={handleBot}>

                                {sending ? '...' : <IoSend className="text-2xl" />}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Aichatbot
