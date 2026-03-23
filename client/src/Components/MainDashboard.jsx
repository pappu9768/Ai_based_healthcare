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
  Container
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HistoryIcon from "@mui/icons-material/History";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const MainDashboard = () => {

  const navigate = useNavigate()
  const handleChat = () => {
    navigate('/askai');
  }
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>

      <Navbar />

      {/* Hero Section */}
      <Box sx={{ py: 6, backgroundColor: "#1976d2", color: "#fff" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Smart Healthcare Diagnosis Using AI
          </Typography>
          <Typography variant="body1" maxWidth="600px">
            Our AI-powered system analyzes symptoms and medical reports
            to assist doctors and patients in early disease detection.
          </Typography>
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <MedicalServicesIcon fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Start Diagnosis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter symptoms and get AI-based disease predictions.
                </Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                  Diagnose
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <UploadFileIcon fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Upload Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload X-rays, blood reports, or scans for AI analysis.
                </Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                  Upload
                </Button>
              </CardContent>
            </Card>
          </Grid> */}

            {/* Ai chat  */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <SmartToyIcon fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  AI Health Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat with AI for health-related guidance.
                </Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleChat}>
                  Chat Now
                </Button>
              </CardContent>
            </Card>
          </Grid>

            {/* diagnose history  */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <HistoryIcon fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Diagnosis History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View previous diagnoses and reports securely.
                </Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                  View History
                </Button>
              </CardContent>
            </Card>
          </Grid>



        </Grid>
      </Container>

      {/* Footer Stats */}
      <Box sx={{ py: 3, backgroundColor: "#e3f2fd" }}>
        <Container>
          <Grid container spacing={2} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography>we are here always for you</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default MainDashboard;
