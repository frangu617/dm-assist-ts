import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_APP_URL // Define your API URL correctly

interface Message {
  _id: string;
  from: string;
  message: string;
}

interface ChatProps {
  username: string;
  currentUserId: string;
}

const Chat: React.FC<ChatProps> = ({ username, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    const response = await fetch(`${apiUrl}/messages/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      const data = (await response.json()) as Message[];
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [username]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${apiUrl}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        from: currentUserId,
        toUsername: username,
        message,
      }),
    });
    setMessage("");
    fetchMessages();
  };

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            {msg.from === currentUserId ? "Me" : username}: {msg.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
