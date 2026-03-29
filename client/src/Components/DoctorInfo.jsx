import React from 'react'
import { Box, Paper, Typography, Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const base_url = import.meta.env.VITE_API_BASE_URL

const DoctorInfo = () => {

    const navigate = useNavigate();
    const [moreInfo, setMoreInfo] = React.useState({
        specialization: '',
        experience: '',
        licenseNumber: ''
    })

    const handleChange = (e) => {
        setMoreInfo({
            ...moreInfo, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        // console.log("hii")
        e.preventDefault();
        // console.log(moreInfo)

        try {
            const token = localStorage.getItem('Tokens');
            const url = `${base_url}/doctorInfo`

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    specialization: moreInfo.specialization,
                    experience: moreInfo.experience,
                    licenseNumber: moreInfo.licenseNumber

                })
            })

            const result = await res.json();
            // console.log(result);
            const { message, error, success } = result

            if(success){
                toast.success(message);
                navigate('/main')
            }else if(error){
                toast.error(message.details[0])
            }else if(!success){
                toast.error(message);
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: 380,
                    p: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(10px)"
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight="bold"
                    mb={1}
                >
                    Doctor More Info
                </Typography>



                <Box component="form" onSubmit={handleSubmit}>


                    <TextField
                        fullWidth
                        margin="normal"
                        label="Specialization"
                        name="specialization"
                        value={moreInfo.specialization}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Experience"
                        type="experience"
                        name="experience"
                        value={moreInfo.experience}
                        onChange={handleChange}

                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="License Number"
                        type="licenseNumber"
                        name="licenseNumber"
                        value={moreInfo.licenseNumber}
                        onChange={handleChange}

                    />

                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.2,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                            background:
                                "linear-gradient(90deg, #667eea, #764ba2)",
                            ":hover": {
                                background:
                                    "linear-gradient(90deg, #764ba2, #667eea)"
                            }
                        }}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Box>


            </Paper>
        </Box>
    )
}

export default DoctorInfo
