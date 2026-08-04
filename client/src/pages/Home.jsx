import React from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import About from './About'

const Home = () => {
  const navigate = useNavigate()
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    // console.log(user)
    if(!user){
      navigate('/login')
    }

  }, [user,navigate])
  return (
    <div>
      <Navbar />
      <Dashboard/>
      <About/>
    </div>
  )
}

export default Home
