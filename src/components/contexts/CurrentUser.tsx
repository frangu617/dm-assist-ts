import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
const apiUrl = import.meta.env.VITE_APP_URL;
// Define the type for the user. Adjust fields according to your user object structure.
interface User {
  id: number;
  username: string;
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
   const token = localStorage.getItem("token");
   if (token) {
     fetch(`${apiUrl}/users/current`, {
       // Adjust this URL to match your server routes
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((response) => {
         if (!response.ok) throw new Error("Failed to fetch user");
         return response.json();
       })
       .then((user) => setCurrentUser(user))
       .catch((error) => console.error("Error fetching current user:", error));
   }
 }, []);

 console.log(currentUser);
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
