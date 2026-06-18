import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const Footer = () => {
  return (
    <>
      <Box sx={{ width: '100%', paddingInline: '4rem', backgroundColor: 'rgb(138, 185, 252)', padding: '15px' }}>
        <Box sx={{
          maxWidth: '1050px',
          // border: '2px solid black',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3,1fr)'
          },
          gap: 5,
          marginInline: 'auto'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            
            
          }}>
            <MedicalServicesIcon sx={{width:'50px'}}/>
            <Box>
              <Typography variant='h5'>AI-Diagnosis</Typography>

              <Typography variant='p' sx={{ fontSize: '1.1rem' }}>
                “Analyze symptoms and receive AI-powered health insights and possible condition predictions instantly.”
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant='h5'>Quick Links:</Typography>
            <ul>
              <li>Home</li>
              <li>Book Appointments</li>
              <li>show Appointments</li>
              <li>Ai History</li>
            </ul>
          </Box>

          <Box>
            <Typography variant='h5'>More Info:</Typography>
            <Typography variant='p'>Developed by: Pawan Shah</Typography>
            <Typography variant='p'>pawan@gmail.com</Typography>
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default Footer
