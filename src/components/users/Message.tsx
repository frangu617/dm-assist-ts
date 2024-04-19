import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  Container,
} from "@mui/material";
import { useCurrentUser } from "../contexts/CurrentUser"; // Import the hook

const SERVER_URL = "http://localhost:5000";

const ChatWindow: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState< Array<{ id: string; text: string; sender: string }> > ([]);
  let { currentUser } = useCurrentUser();

  if (!currentUser) {
    currentUser = { username: "Guest", email: "", id: 0 };
  }

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    const handleNewMessage = (msg: any) => {
        setMessages((prevMessages) => [...prevMessages, msg]); 
      };

    newSocket.on("chat message", handleNewMessage);

    // The cleanup function to return must explicitly return `void`.
    return () => {
      newSocket.off("chat message", handleNewMessage);
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message && currentUser) {
      // Check if there's a message and if currentUser is not null      
      const newMessage = {
        id: Date.now().toString(), // Use a proper unique ID generation method
        text: message,
        sender: currentUser.username, // Use the current user's name
      };
      socket?.emit("chat message", newMessage);
      setMessage("");
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ width: "80%", p: 2, boxShadow: 8, backgroundColor: "lightgrey", borderRadius: "20px" }}>
    <Box sx={{  margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lets Talk!
      </Typography>
      <Card sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column",  overflow: "auto", boxShadow: 8, borderRadius: "30px" }}>
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText primary={`${msg.sender}: `} secondary={`${msg.text}`}/> {/*<ListItemText sx={{ textAlign: "left" }} primary={` ${msg.text}`} />*/}
          </ListItem>
        ))}
      </List>
    </Card>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
          borderRadius: "20px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        
        <p style ={{ margin: "0 auto", textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>{currentUser.username}</p>
        <TextField
        sx={{ width: "90%", margin: "0 5%", backgroundColor: "white" }}
          fullWidth
          variant="outlined"
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Send
        </Button>
        
      </Box>
    </Box>
    </Card>
    </Container>
  );
};

export default ChatWindow;
