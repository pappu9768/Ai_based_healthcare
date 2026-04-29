import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import { useEffect, useState, useContext } from 'react';

import { newContext } from "../ContextApi/context.js";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import ResponsiveMenu from './ResponsiveMenu.jsx';
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

  const [showMenu,setShowMenu] = useState(false)


  return (
    <Box mb={5}>
      <AppBar sx={{ mb: 2 }}>
        <Toolbar >
          <MedicalServicesIcon sx={{ mr: 1}} />
          <Typography variant='h6' sx={{ flexGrow: 1, fontSize: { xs: 20,md:25 } }} onClick={(() => navigate('/'))}>
            
            AI-Diagnosis
          </Typography>

          <Typography variant="body1">
            {
              tokens ? (
                <>



                  <Box sx={{
                    display: {xs: 'none', md:'flex'},
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

                  <IconButton color='inherit' sx={{
                    display:{xs:'block',md:'none'}
                  }}
                  onClick={() => setShowMenu(true)}
                  
                  >
                      <MenuIcon/>
                  </IconButton>
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
        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} tokens={tokens} role={role} userName={usersName}/>
      </AppBar>
    </Box>
  );
};

export default Navbar;
