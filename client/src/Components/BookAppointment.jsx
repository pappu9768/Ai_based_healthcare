import { CircularProgress, Container, Stack, Typography, Box, Button } from '@mui/material';
import React from 'react'
const base_url = import.meta.env.VITE_API_BASE_URL
import {toast} from 'react-toastify';
const BookAppointment = () => {

    const [doctors, setDoctors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const token = localStorage.getItem('Tokens');
    React.useEffect(() => {

        const getDoctors = async () => {
            try {

                const url = `${base_url}/getdoctorinfo`

                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'Application/json',
                        'Authorization': `${token}`
                    }
                })
                const result = await res.json()
                console.log(result);
                setDoctors(result.getDoctor);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        getDoctors();
    }, [])

    const handleBooking = async (doctorId, doctorName) => {
        if (!window.confirm(`Are you sure do you want to book an appointment with DR.${doctorName}`)) return;

        const url = `${base_url}/${doctorId}/appointment`

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                
                'Content-type': 'application/json',
                'Authorization': `${token}`
                
            },
            body: JSON.stringify({
                doctor: doctorId
            })
        })

        const result = await res.json()
        console.log(result)

        const {success,message,error} = result;
        if(success){
            toast.success(message)
        } else if(error){
            toast.error(message?.details[0])
        } else if(!success){
            toast.error(message)
        }

    }

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container maxWidth='md' sx={{ mt: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1}>


                <Typography variant="h5">
                    All Doctors
                </Typography>
            </Stack>

            {
                doctors.length === 0 ? (
                    <Box sx={{ mt: 5, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            No doctors found
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={3} mt={3}>
                        {doctors.map((val) => (
                            <Box
                                key={val._id}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    backgroundColor: "#fff",
                                    transition: "0.3s",
                                    "&:hover": { transform: "translateY(-5px)" }
                                }}
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Dr. {val.doctor?.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        🩺 Specialization: {val.specialization.join(", ")}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        ⏳ Experience: {val.experience} years
                                    </Typography>

                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => handleBooking(val.doctor._id, val.doctor.name)}
                                        >
                                            {/* () => console.log("Book", val.doctor._id) */}
                                            Book Appointment
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )
            }
        </Container>
    )
}

export default BookAppointment
