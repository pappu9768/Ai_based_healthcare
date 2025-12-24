import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const base_url = import.meta.env.VITE_API_BASE_URL


const Login = () => {
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(loginData);

        try {
            const url = `${base_url}/login`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    email: loginData.email,
                    password: loginData.password
                })
            })

            const result = await res.json();
            // console.log(result);

            const { message, error, success,createToken } = result

            if (success) {
                toast.success(message);
                localStorage.setItem('Tokens',createToken)
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
                    Login 🚀
                </Typography>



                <Box component="form" onSubmit={handleSubmit}>


                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        name="password"
                        value={loginData.password}
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
                        Login
                    </Button>
                </Box>

                <Typography
                    variant="body2"
                    textAlign="center"
                    mt={3}
                >
                    <Link to='/register' style={{ textDecoration: 'none' }}>
                        Dont have an account?{" "}
                        <span
                            style={{

                                color: "#667eea",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Register
                        </span>
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
