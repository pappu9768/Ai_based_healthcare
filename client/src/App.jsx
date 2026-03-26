import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import MainDashboard from './Components/MainDashboard'
import DiagnosisForm from './Components/DiagnosisForm'
import AskAi from './Components/AskAi'
import ResfreshHandler from './ResfreshHandler'
import { Navigate } from 'react-router-dom'
import History from './Components/History'


const App = () => {

  const [authenticated, setAuthenticated] = React.useState(false)
  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />
  }
  return (
    <>

      <ResfreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/main' element={<MainDashboard />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/history' element={<History/>}/>

        <Route path='/diagnose' element={<PrivateRoute>
          <DiagnosisForm />
        </PrivateRoute>} />
        <Route path='/askai' element={<PrivateRoute>
          <AskAi />
        </PrivateRoute>} />
      </Routes>

      <ToastContainer position='top-right' />
    </>
  )
}

export default App
