import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const base_url = import.meta.env.VITE_API_BASE_URL


const Register = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(base_url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const url = `${base_url}/register`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            })

            const result = await res.json();
            console.log(result);

            const { message, error, success } = result

            if (success) {
                toast.success(message);
                navigate('/login')
            } else if (error) {
                toast.error(error?.details[0].message);
            } else if (!success) {
                toast.error(message);
            }
        } catch (error) {
            console.log(error)
        }
    };

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
                    Create Account
                </Typography>

                <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.secondary"
                    mb={3}
                >
                    Sign up to get started 🚀
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
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
                        Register
                    </Button>
                </Box>

                <Typography
                    variant="body2"
                    textAlign="center"
                    mt={3}
                >
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        Already have an account?{" "}
                        <span
                            style={{
                                color: "#667eea",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Login
                        </span>
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;
