import React from 'react'
import { Box, Typography } from '@mui/material'
import banner2 from '../assets/top_banner.jpg'

const TopBanner = ({ text }) => {
    return (
        <Box
            sx={{
                height: { xs: '40vh', sm: '50vh', md: '55vh' },
                position: 'relative',
                mt: { xs: -6, md: -8 }, // same as -mt-12
                backgroundImage: `url(${banner2})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 8
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    borderRadius: 8

                }}
            />

            {/* Centered Text (exact Tailwind equivalent) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    textAlign: 'center',
                    px: 2
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'serif',
                        fontSize: {
                            xs: '28px',
                            sm: '36px',
                            md: '44px'
                        }
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}

export default TopBanner