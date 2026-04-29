import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const RefreshHandler = ({ setAuthenticated }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('Tokens')

    if (token) {
      setAuthenticated(true)

      //  If user is on login/register → redirect to main
      if (location.pathname === '/login' || location.pathname === '/register') {
        navigate('/main', { replace: true })
      }

    } else {
      setAuthenticated(false)

      //  If not logged in & trying to access protected routes
      const protectedRoutes = ['/diagnose', '/askai', '/history', '/book', '/info', '/appointments']

      if (protectedRoutes.includes(location.pathname)) {
        navigate('/login', { replace: true })
      }
    }

  }, [location.pathname, navigate, setAuthenticated])

  return null
}

export default RefreshHandler