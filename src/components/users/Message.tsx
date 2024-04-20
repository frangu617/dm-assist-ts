import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // for the toggle icon
import { useCurrentUser } from "../contexts/CurrentUser";
import { ChatBubble } from "@mui/icons-material";

const SERVER_URL = import.meta.env.VITE_APP_URL;

const ChatWindow: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: string }>
  >([]);
  const [isOpen, setIsOpen] = useState(false); // state to handle visibility
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // ref for auto-scrolling

  let { currentUser } = useCurrentUser();

  if (!currentUser) {
    currentUser = { username: "Guest", email: "", id: 0 };
  }

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    newSocket.on("chat message", (msg: any) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      newSocket.off("chat message");
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message && currentUser) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: currentUser.username,
      };
      socket?.emit("chat message", newMessage);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: 300,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        bgcolor: `primary.main`,
        borderRadius: "20px",
        zIndex: 1000,
      }}
    >
      <ChatBubble
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "absolute",
          top: 0,
          left: -40,
          color: 'primary.main',
        }}
      >
        <ExpandMoreIcon />
      </ChatBubble>

      <Typography
        variant="h6"
        sx={{
          p: 2,
          textAlign: "center",
          color: 'primary.contrastText',
        }}
      >
        Chat
      </Typography>
      <Typography>
        <List sx={{ maxHeight: 200, overflow: "auto" }}>
          {/* <ListSubheader>Chat History</ListSubheader> */}
          <Card
            sx={{
              width: "90%",
              p: 2,
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "left",
              borderRadius: "20px",
            }}
          >
            {messages.map((msg) => (
              <ListItem key={msg.id}>
                <ListItemText
                  primary={`${msg.sender}: `}
                  secondary={` ${msg.text}`}
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </Card>
        </List>

        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{ display: "flex", p: 1 }}
        >
          <TextField
            sx={{ flexGrow: 1, backgroundColor: "background.default" }}
            fullWidth
            variant="outlined"
            label="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
          />
          <Button type="submit" color="secondary" variant="contained">
            Send
          </Button>
        </Box>
      </Typography>
    </Box>
  );
};

export default ChatWindow;
