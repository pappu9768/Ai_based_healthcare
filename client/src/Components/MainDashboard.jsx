import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  Stack
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HistoryIcon from "@mui/icons-material/History";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditIcon from '@mui/icons-material/Edit';
import banner  from '../assets/hero.jpg'
import { useContext } from "react";
import { newContext } from "../ContextApi/context.js";
import Footer from "./Footer.jsx";
const MainDashboard = () => {

  //getting role using context api from navbar component
  const { roles } = useContext(newContext);
  // console.log(roles)


  const tokenCheck = localStorage.getItem('Tokens')
  const navigate = useNavigate();

  const handleChat = () => {
    navigate("/askai");
  };

  

  const handleHistory = () => {
    navigate('/history')
  }

  const handleAppointment = () => {
    navigate('/appointments')
  }

  const handleBook = () => {
    navigate('/book')
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{
        width:'100%',
        height:{xs:400,sm:350,md:450},
        backgroundImage: `url(${banner})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        display:'flex',
        alignItems: "center",
        justifyContent:"center",
        textAlign:"center",
        position:"relative",
        color:"blue",
        borderRadius:6
      }}>
        <Container sx={{
          position:"relative",
          zIndex:1
        }} >
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{
            fontSize:{ xs: '24px',md:'40px'}
          }}>
            Smart Healthcare Diagnosis
          </Typography>
          <Typography variant="h6" sx={{
            opacity:0.9,
            fontSize:{
              xs: '14px',md: '18px'
            }
          }}>
            AI-Powered system to analyze symptoms and assist in early detection
          </Typography>
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          

          {/* AI Chat */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: 3,
                transition: "0.3s",
                '&:hover': { transform: "translateY(-8px)" }
              }}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <SmartToyIcon fontSize="large" color="primary" />
                  <Typography variant="h6">AI Health Assistant</Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Chat with AI for instant health guidance.
                  </Typography>
                  {
                    tokenCheck ? (<>
                      <Button fullWidth variant="contained" onClick={handleChat}>
                        Chat Now
                      </Button>

                    </>) : (<>
                      <Button fullWidth variant="contained">
                        Login first
                      </Button>
                    </>)

                  }
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* History */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: 3,
                transition: "0.3s",
                '&:hover': { transform: "translateY(-8px)" }
              }}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <HistoryIcon fontSize="large" color="primary" />
                  <Typography variant="h6">Diagnosis History</Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Securely access your previous diagnoses.
                  </Typography>

                  {
                    tokenCheck ? (<>
                      <Button fullWidth variant="contained" onClick={handleHistory}>
                        View History
                      </Button>


                    </>) : (
                      <>
                        <Button fullWidth variant="contained">
                          Login first
                        </Button>
                      </>
                    )

                  }
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointment Booking */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: 3,
                transition: "0.3s",
                '&:hover': { transform: "translateY(-8px)" }
              }}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <EventAvailableIcon fontSize="large" color="primary" />
                  <Typography variant="h6">
                    {
                      roles === 'DOCTOR' ? 'All Appointments' : 'Book Appointment'
                    }
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {
                      roles === 'DOCTOR' ? "View and manage patient appointments" : "Schedule an appointment with certified doctors."
                    }
                  </Typography>

                  {tokenCheck ? (
                    roles === 'DOCTOR' ? (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAppointment}
                      >
                        View all appointments
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleBook}
                      >
                        Book Now
                      </Button>
                    )
                  ) : (
                    <Button fullWidth variant="contained">
                      Login first
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>


          {/* all info about doctor this section is only for doctors */}
          {
            roles === 'DOCTOR' ? <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: "0.3s",
                  '&:hover': { transform: "translateY(-8px)" }
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <EditIcon fontSize="large" color="primary" />
                    <Typography variant="h6">
                      {
                        roles === 'DOCTOR' ? 'Add full Info' : null
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {
                        roles === 'DOCTOR' ? "Add your full info to get new appointments" : null
                      }
                    </Typography>

                    {
                      tokenCheck ? (
                        roles === 'DOCTOR' ? (
                          <Button fullWidth variant="contained" onClick={() => navigate('/info')}>
                            Add

                          </Button>
                        ) : null
                      ) : null
                    }
                  </Stack>
                </CardContent>
              </Card>
            </Grid> : null
          }
        </Grid>
      </Container>

      {/* Footer  */}
      <Footer/>
    </Box>
  );
};

export default MainDashboard;
