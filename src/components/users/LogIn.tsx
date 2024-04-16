import React, { useState } from "react";

interface LoginPageProps {
  onLoginSuccess: (username: string, token: string) => void; // Adjust according to your actual usage
}

// Function to handle login by making an API request
async function loginUser(credentials: {
  username: string;
  password: string;
}): Promise<{ username: string; token: string }> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return { username: data.username, token: data.token };
}

function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Use different variable names to avoid "shadowing" the username state
      const result = await loginUser({ username, password });
      onLoginSuccess(result.username, result.token); // Now passing both username and token
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally handle login error visually for the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
