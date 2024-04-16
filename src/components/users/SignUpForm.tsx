import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function SignUpForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`http://localhost:5000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    navigate(`/`);
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="First Name"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          label="Last Name"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          label="Email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </main>
  );
}

export default SignUpForm;
