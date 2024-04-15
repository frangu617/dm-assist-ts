import { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
}

async function loginUser(
  username: string,
  password: string
): Promise<{ token: string }> {
  // Placeholder implementation for demonstration purposes
  // You should replace this with the actual implementation
  // This could be a fetch call to your backend API
console.log (username, password)
  // Simulating a successful login with a dummy token
  return { token: "dummyToken123" };
}
function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password); // loginUser is a function that calls your backend to authenticate
      onLoginSuccess(response.token); // Assuming the response includes a token on successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message)
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