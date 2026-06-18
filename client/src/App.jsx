import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import MainDashboard from './Components/MainDashboard'
import AskAi from './Components/AskAi'
import ResfreshHandler from './ResfreshHandler'
import { Navigate } from 'react-router-dom'
import History from './Components/History'
import BookAppointment from './Components/BookAppointment'
import DoctorInfo from './Components/DoctorInfo'
import AllAppointments from './Components/AllAppointments'


const App = () => {

  const [authenticated, setAuthenticated] = React.useState(null)
  const PrivateRoute = ({ children }) => {
    if (authenticated === null){
      return <div>Loading...</div>
    }

    return authenticated ? children : <Navigate to="/login" replace/>
  }
  return (
    <>

      <ResfreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/main" replace/>} />

        <Route path='/main' element={<PrivateRoute>
          <MainDashboard />
        </PrivateRoute>} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={
          authenticated ? <Navigate to="/main" replace/> : <Login setAuthenticated={setAuthenticated}/>
        } />

        <Route path='/history' element={<PrivateRoute>
          <History />
        </PrivateRoute>} />

        
        
        <Route path='/askai' element={<PrivateRoute>
          <AskAi />
        </PrivateRoute>} />

        <Route path='/book' element={<PrivateRoute>
          <BookAppointment />
        </PrivateRoute>} />

        <Route path='/info' element={<PrivateRoute>
          <DoctorInfo />
        </PrivateRoute>} />

        <Route path='/appointments' element={<PrivateRoute>
          <AllAppointments />
        </PrivateRoute>} />
      </Routes>

      <ToastContainer position='top-right' />
    </>
  )
}

export default App;