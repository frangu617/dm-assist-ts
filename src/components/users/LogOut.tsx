import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUser"; // Adjust the path as necessary

function Logout() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser(); // Use the custom hook

  // Function to handle logout
  function handleLogout() {
    // Clear the JWT token from localStorage
    localStorage.removeItem("token");

    // Clear the current user from context
    setCurrentUser(null);

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
