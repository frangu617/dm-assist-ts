import React, { useState } from "react";

interface LoginPageProps {
  onLoginSuccess: (username: string, token: string) => void; // Adjust according to your actual usage
}


// Function to handle login by making an API request
async function loginUser(
  username: string,
  password: string
): Promise<{ token: string }> {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    return { token: data.token };
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Rethrowing the error to be handled in the calling function
  }
}

function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password); // Calls your backend to authenticate
      onLoginSuccess(response.token); // Assuming the response includes a token on successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, handle login error by showing an error message or notification to the user
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
