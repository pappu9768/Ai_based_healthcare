import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import MainDashboard from './Components/MainDashboard'
import DiagnosisForm from './Components/DiagnosisForm'
import AskAi from './Components/AskAi'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainDashboard />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/start' element={<DiagnosisForm/>}/>
        <Route path='/askai' element={<AskAi/>}/>
      </Routes>

      <ToastContainer position='top-right' />
    </>
  )
}

export default App
