import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUser"; // Ensure correct path

interface LogoutProps {
  onLogout?: () => void; // Optional prop if you need extra actions to be handled outside.
}

function Logout({ onLogout }: LogoutProps) {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser(); // Use the custom hook

  // Function to handle logout
  function handleLogout() {
    // Clear the JWT token from localStorage
    localStorage.removeItem("token");

    // Clear the current user from context
    setCurrentUser(null);

    // Additional external logout actions
    if (onLogout) {
      onLogout();
    }

    // Redirect the user to the homepage
    navigate("/");
  }

  // Execute logout when component mounts
  useEffect(() => {
    handleLogout();
  }, []);

  // Component does not render anything
  return null;
}

export default Logout;
