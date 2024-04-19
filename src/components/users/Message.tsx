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
} from "@mui/material";
import { useCurrentUser } from "../contexts/CurrentUser"; // Import the hook

const SERVER_URL = "http://localhost:5000";

// interface Message {
//   id: string;
//   text: string;
//   sender: string; // This will be the username
// }

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
      if(msg.sender !== currentUser.username) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
      
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
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Optimistically update UI
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat Room
      </Typography>
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText primary={`${msg.sender}: ${msg.text}`} />
          </ListItem>
        ))}
      </List>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
