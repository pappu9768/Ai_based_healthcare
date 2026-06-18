import {
  Box,
  Container,
  Stack,
  Typography,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import TopBanner from './TopBanner';

const base_url = import.meta.env.VITE_API_BASE_URL;

const AllAppointments = () => {
  const token = localStorage.getItem('Tokens');
  const [appointment, setAppointment] = useState([]);
  const navigate = useNavigate();

  // 🔥 Fetch Appointments
  useEffect(() => {
    const getAllAppoints = async () => {
      try {
        const res = await fetch(`${base_url}/api/v1/all`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: token
          }
        });

        const result = await res.json();
        // console.log(result)
        setAppointment(result.getAll || []);
      } catch (error) {
        console.log(error);
      }
    };

    getAllAppoints();
  }, []);

  // 🔥 Update Status
  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`${base_url}/api/v1/status`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          appointmentId: id,
          status
        })
      });

      const result = await res.json();
      // console.log(result);
      if (result.success) {
        
        setAppointment(prev =>
          prev.map(item =>
            item._id === id ? { ...item, status } : item
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <Container maxWidth="md" sx={{ mt: 4,background:"linear-gradient(90deg,rgba(26, 58, 92, 1) 0%, rgba(27, 107, 60, 1) 58%, rgba(15, 245, 99, 1) 100%, rgba(193, 227, 196, 1) 67%, rgba(237, 221, 83, 1) 100%)" }}>
      <TopBanner text="All Appointments"/>

      {/* 🔹 Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        border={2}
        p={2}
        borderRadius={2}
      >
        <IconButton onClick={() => navigate('/main')}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold">
          All Appointments
        </Typography>
      </Stack>

      {/* 🔹 Content */}
      {appointment.length === 0 ? (
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No Appointments found
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3} mt={3}>
          {appointment.map(val => (
            <Box
              key={val._id}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: '#f9fafb',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              {/* 🧑 Patient */}
              <Typography variant="h6" fontWeight="bold">
                Patient: {val.patient?.name}
              </Typography>

              {/* 👨‍⚕️ Doctor */}
              <Typography color="text.secondary" mt={0.5}>
                Doctor: Dr. {val.doctor?.name}
              </Typography>

              {/* 🏷️ Status */}
              <Box mt={1}>
                <Chip
                  label={val.status}
                  color={
                    val.status === 'pending'
                      ? 'warning'
                      : val.status === 'accepted'
                        ? 'success'
                        : 'error'
                  }
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* 📅 Date */}
              <Typography variant="body2" color="text.secondary">
                Booked on: {new Date(val.createdAt).toLocaleString()}
              </Typography>

              {/* 🔥 Actions */}
              <Stack direction="row" spacing={1} mt={2}>
                <Chip
                  label="Approve"
                  color="success"
                  variant="outlined"
                  onClick={() => handleStatus(val._id, 'accepted')}
                />
                <Chip
                  label="Reject"
                  color="error"
                  variant="outlined"
                  onClick={() => handleStatus(val._id, 'rejected')}
                />
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default AllAppointments;