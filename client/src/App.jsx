import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

      <ToastContainer position='top-right'/>
    </>
  )
}

export default App
