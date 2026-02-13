import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Navbar = () => {

  const navigate = useNavigate();
  const tokens = localStorage.getItem('Tokens');

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
          <MedicalServicesIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Healthcare Diagnosis System
          </Typography>
          <Typography variant="body1">
            {
              tokens ? (
                <>
                  
                  <button onClick={handleLogout}>Logout</button>
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
