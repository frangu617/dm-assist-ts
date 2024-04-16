import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Define the type for the user. Adjust fields according to your user object structure.
interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields as needed
}

// Define the shape of the context state
interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create context with a default undefined value. We will not directly use this but use a provider to inject the actual values.
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

// Define the props for the provider component
interface CurrentUserProviderProps {
  children: ReactNode;
}

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          "http://localhost:5000/authentication/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user: User = await response.json();
        setCurrentUser(user);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

export { CurrentUserContext, CurrentUserProvider };
