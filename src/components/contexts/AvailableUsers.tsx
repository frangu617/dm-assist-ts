// AvailableUsersContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  // Add other user fields as needed
}

// Define the shape of the context state
interface AvailableUsersContextType {
  availableUsers: User[]; // Define the structure of User as needed
  setAvailableUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

// Create context with a default empty array of users
const AvailableUsersContext = createContext<AvailableUsersContextType>({
  availableUsers: [],
  setAvailableUsers: () => {},
});

// Define the props for the provider component
interface AvailableUsersProviderProps {
  children: React.ReactNode;
}

// Provider component responsible for managing available users
export const AvailableUsersProvider: React.FC<AvailableUsersProviderProps> = ({
  children,
}) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  // Fetch available users on component mount
  useEffect(() => {
    // Example: Fetch available users from the backend
    const fetchAvailableUsers = async () => {
      try {
        const response = await fetch("/users/available"); // Adjust the API endpoint
        console.log ("response", response)
        if (!response.ok) {
          throw new Error("Failed to fetch available users");
        }
        const data = await response.json();
        setAvailableUsers(data);
      } catch (error) {
        console.error("Error fetching available users:", error);
      }
    };

    fetchAvailableUsers();
  }, []);

  return (
    <AvailableUsersContext.Provider
      value={{ availableUsers, setAvailableUsers }}
    >
      {children}
    </AvailableUsersContext.Provider>
  );
};

// Custom hook to consume available users
export const useAvailableUsers = () => {
  const context = useContext(AvailableUsersContext);
  if (!context) {
    throw new Error(
      "useAvailableUsers must be used within an AvailableUsersProvider"
    );
  }
  return context;
};
