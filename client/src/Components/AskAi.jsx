import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    IconButton,
    Paper,
    TextField,
    Typography,
    Avatar,
    CircularProgress
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const AskAi = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setChat((prev) => [...prev, userMessage]);
        const currentMessage = message;
        setMessage("");
        setLoading(true);

        try {
            const token = localStorage.getItem("Tokens");

            const res = await fetch(
                "http://localhost:8080/api/v1/auth/diagnose",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    },
                    body: JSON.stringify({ symptoms: currentMessage })
                }
            );

            const data = await res.json();
            console.log(data)
            const aiMessage = {
                sender: "ai",
                text: data?.aiResponse || "AI could not generate response"
            };

            setChat((prev) => [...prev, aiMessage]);

            // if (data.success) {
            //     toast.success(data.message);
            // }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f4f6f8"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "85vh",
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "#fff",
                        borderRadius: 4,
                        boxShadow: 4,
                        overflow: "hidden"
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "#1976d2",
                            color: "#fff",
                            textAlign: "center"
                        }}
                    >
                        <Typography variant="h6">AI Health Assistant</Typography>
                    </Box>

                    {/* Chat Area */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: 2,
                            bgcolor: "#f9fbff"
                        }}
                    >
                        {chat.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        msg.sender === "user" ? "flex-end" : "flex-start",
                                    mb: 2
                                }}
                            >
                                {msg.sender === "ai" && (
                                    <Avatar sx={{ bgcolor: "#1976d2", mr: 1 }}>AI</Avatar>
                                )}

                                <Paper
                                    sx={{
                                        p: 2,
                                        maxWidth: "70%",
                                        bgcolor:
                                            msg.sender === "user" ? "#1976d2" : "#e3f2fd",
                                        color: msg.sender === "user" ? "#fff" : "#000",
                                        borderRadius: 3,
                                        whiteSpace: "pre-line"
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Paper>

                                {msg.sender === "user" && (
                                    <Avatar sx={{ bgcolor: "#0d47a1", ml: 1 }}>U</Avatar>
                                )}
                            </Box>
                        ))}

                        {loading && (
                            <Box textAlign="center" mt={2}>
                                <CircularProgress size={24} />
                                <Typography variant="body2">AI is thinking...</Typography>
                            </Box>
                        )}

                        <div ref={chatEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: "1px solid #eee",
                            display: "flex",
                            gap: 1,
                            bgcolor: "#fff"
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Describe your symptoms..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 2
                            }}
                        />

                        <IconButton
                            sx={{
                                bgcolor: "#1976d2",
                                color: "#fff",
                                "&:hover": {
                                    bgcolor: "#1565c0"
                                }
                            }}
                            onClick={sendMessage}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AskAi;