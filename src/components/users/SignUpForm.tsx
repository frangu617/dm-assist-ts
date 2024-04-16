import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

interface User {
  username: string;
  email: string;
  password: string;
}

function SignUpForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          password: user.password, // Or 'passwordDigest' depending on your User model schema
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error registering user:", errorData.error);
        return;
      }

      // If we reach here, registration was successful
      navigate(`/`);
    } catch (error) {
      console.error("Network error:", error);
      // Handle the network error
    }
  }

 
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUpForm;
