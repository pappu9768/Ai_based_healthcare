import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useEffect, useState, useContext } from 'react';

import { newContext } from "../ContextApi/context.js";
const Navbar = () => {

  const navigate = useNavigate();
  const { setRoles } = useContext(newContext);
  const tokens = localStorage.getItem('Tokens');
  const [usersName, setUsersName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await fetch('http://localhost:8080/name', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `${tokens}`
          }
        })
        const result = await res.json()
        setUsersName(result.userName)
        setRole(result.role)
        setRoles(result.role)
        


      } catch (error) {
        console.log(error)
      }
    }

    if (tokens) {
      getUsername()
    }

  }, [tokens])

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogout = () => {
    localStorage.removeItem('Tokens');
    navigate('/login');
  }

  return (
    <Box mb={5}>
      <AppBar sx={{ mb: 2 }}>
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={(() => navigate('/'))}>
            <MedicalServicesIcon sx={{ mr: 1 }} />
            AI Healthcare Diagnosis System
          </Typography>

          <Typography variant="body1">
            {
              tokens ? (
                <>



                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                  }}>

                    <Typography variant='h5' sx={{ mr: 3 }}>
                      {
                        role === "DOCTOR" ? `Hello,Dr.${usersName}` : `Welcome,${usersName}`
                      }
                    </Typography>
                    <button onClick={handleLogout}>Logout</button>
                  </Box>
                </>
              ) : (
                <>
                  <div className='not-user'>
                    <h2>Welcome! User</h2>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                  </div>
                </>
              )
            }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
