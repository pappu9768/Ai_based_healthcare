import { Drawer, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import React from 'react'

const ResponsiveMenu = ({ showMenu, setShowMenu, tokens, role, userName }) => {
    const navigate = useNavigate();
    return (
        <Drawer anchor='right' open={showMenu} onClose={() => setShowMenu(false)}>

            <Box sx={{ width: 250, p: 2 }}>
                <button style={{ position: 'absolute', top: 8, right: 9 }} onClick={() => setShowMenu(false)}><X /></button>
                {
                    tokens && (
                        <>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                {
                                    role === 'DOCTOR' ? `Hello,Dr. ${userName}` : `Welcome,${userName}`
                                }

                                <Button onClick={() => { localStorage.removeItem('Tokens'); navigate('/login'); }}
                                    sx={{
                                        border: 2,
                                        '&:hover':{
                                            backgroundColor:'red'
                                        },
                                        position:'absolute',
                                        bottom:35,
                                        left:'50%',
                                        transform: 'translate(-50%)'

                                    }}

                                >Logout</Button>

                            </Typography>
                        </>
                    )
                }

            </Box>

        </Drawer>
    )
}

export default ResponsiveMenu
