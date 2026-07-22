import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
  import { ToastContainer } from 'react-toastify';
import Aichatbot from './pages/Aichatbot'
import Dashboard from './pages/Dashboard'
import ChatHistory from './pages/ChatHistory'
const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Register/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/chatbot' element={<Aichatbot/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/history' element={<ChatHistory/>}/>
      </Routes>

      <ToastContainer position='top-right'/>
    </>
  )
}

export default App
