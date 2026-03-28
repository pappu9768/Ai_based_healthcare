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

const MainDashboard = () => {
  const tokenCheck = localStorage.getItem('Tokens')
  const navigate = useNavigate();

  const handleChat = () => {
    navigate("/askai");
  };

  const handleDiagnose = () => {
    navigate("/diagnose");
  };

  const handleHistory = () => {
    navigate('/history')
  }

  const handleAppointment = () =>{
    navigate('/book')
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
          textAlign: "center"
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Smart Healthcare Diagnosis
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            AI-powered system to analyze symptoms and assist in early detection
          </Typography>
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Diagnose */}
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
                  <MedicalServicesIcon fontSize="large" color="primary" />
                  <Typography variant="h6">Start Diagnosis</Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Enter symptoms and get AI-based disease predictions.
                  </Typography>

                  {
                    tokenCheck ? (<>
                      <Button fullWidth variant="contained" onClick={handleDiagnose}>
                        Diagnose
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
                  <Typography variant="h6">Book Appointment</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Schedule an appointment with certified doctors.
                  </Typography>

                  {tokenCheck ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAppointment}
                    >
                      Book Now
                    </Button>
                  ) : (
                    <Button fullWidth variant="contained">
                      Login first
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#0d47a1", color: "#fff", py: 5, mt: 4 }}>
        <Container>
          <Grid container spacing={4}>
            {/* About */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About This App
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                This platform uses AI to help users understand symptoms and
                get early insights into possible health conditions.
              </Typography>
            </Grid>

            {/* Features */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Typography variant="body2">• AI Diagnosis</Typography>
              <Typography variant="body2">• Chat Assistant</Typography>
              <Typography variant="body2">• History Tracking</Typography>
            </Grid>

            {/* Developer */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Developer
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Developed by: Supriya
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: Supriya@email.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Version: 1.0.0
              </Typography>
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2026 Smart Healthcare AI. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainDashboard;
