import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Stack
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import TopBanner from './TopBanner';


const base_url = import.meta.env.VITE_API_BASE_URL

const History = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const token = localStorage.getItem('Tokens')

  const getAllChats = async () => {
    try {
      const res = await fetch(`${base_url}/api/v1/history`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      const result = await res.json()
      setChats(result.getAllConversation || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllChats()
  }, [])

  //  DELETE ALL CHATS
  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all chats?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`${base_url}/api/v1/history`, {
        method: "DELETE",
        headers: {
          "Authorization": `${token}`
        }
      })

      const result = await res.json()

      if (result.success) {
        setChats([]) // clear UI instantly
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  return (

    <>
    <TopBanner text="History"/>
    <Container maxWidth="md" sx={{ mt: 4 }}>

      {/* HEADER WITH DELETE ICON */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        border={2}
        p={2}
        borderRadius={2}
        position="relative"
      >
        <IconButton onClick={() => navigate('/main')}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5">
          Chat History
        </Typography>

        <IconButton color="error" onClick={handleDeleteAll} sx={{ position: "absolute", right: 8 }}>
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* ❌ EMPTY STATE */}
      {chats.length === 0 ? (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No chats found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start a conversation and your history will appear here.
          </Typography>
        </Box>
      ) : (

        chats.map((conv) => (
          <Card key={conv._id} sx={{ mb: 3, p: 2, borderRadius: 3 }}>

            {/* Date */}
            <Typography variant="caption" color="text.secondary">
              {new Date(conv.createdAt).toLocaleString()}
            </Typography>

            {/* Messages */}
            {conv.messages.map((msg) => (
              <Box
                key={msg._id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mt: 1
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "70%",
                    backgroundColor:
                      msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                    color:
                      msg.sender === "user" ? "#fff" : "#000"
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Card>
        ))

      )}
    </Container>
    </>
  )
}

export default History