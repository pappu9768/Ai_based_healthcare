import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    IconButton,
    Paper,
    TextField,
    Typography,
    Avatar
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

const AskAi = () => {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const chatEndRef = useRef(null);

    // auto scroll
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

        try {

            const token = localStorage.getItem("Tokens");

            const res = await fetch(
                'http://localhost:8080/api/v1/auth/diagnose',
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
                text: data.saveDiagnosis.result || "AI could not generate response"
            };

            setChat((prev) => [...prev, aiMessage]);

            const { message, error, success } = data

            if (success) {
                toast.success(message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f5f9ff",
                p: 2
            }}
        >

            {/* Chat Area */}

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    mb: 2
                }}
            >

                {chat.map((msg, index) => (

                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent:
                                msg.sender === "user"
                                    ? "flex-end"
                                    : "flex-start",
                            mb: 2
                        }}
                    >

                        {msg.sender === "ai" && (
                            <Avatar
                                sx={{
                                    bgcolor: "#1976d2",
                                    mr: 1
                                }}
                            >
                                AI
                            </Avatar>
                        )}

                        <Paper
                            sx={{
                                p: 1.5,
                                maxWidth: "60%",
                                bgcolor:
                                    msg.sender === "user"
                                        ? "#1976d2"
                                        : "#e3f2fd",
                                color:
                                    msg.sender === "user"
                                        ? "#fff"
                                        : "#000",
                                borderRadius: 3
                            }}
                        >

                            <Typography variant="body2">
                                {msg.text}
                            </Typography>

                        </Paper>

                        {msg.sender === "user" && (
                            <Avatar
                                sx={{
                                    bgcolor: "#0d47a1",
                                    ml: 1
                                }}
                            >
                                U
                            </Avatar>
                        )}

                    </Box>
                ))}

                <div ref={chatEndRef} />

            </Box>

            {/* Input Area */}

            <Box
                sx={{
                    display: "flex",
                    gap: 1
                }}
            >

                <TextField
                    fullWidth
                    placeholder="Describe your symptoms..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
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
    );
};

export default AskAi;