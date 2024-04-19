import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  // useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import customTheme from "./components/themes/customTheme";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ThemeProvider, CssBaseline } from "@mui/material";
import CharacterManager from "./components/characters/CharacterManager";
import CharacterCreator from "./components/characters/CharacterCreator";
import Home from "./components/Home";
import DiceRoller from "./components/tools/DiceRoller";
import InitiativeTracker from "./components/tools/InitiativeTracker";
import MusicSearch from "./components/tools/MusicSearch";
import MonsterSearch from "./components/reference_guide/MonsterSearch";
import RacesSearch from "./components/reference_guide/RacesSearch";
import RulesSearch from "./components/reference_guide/RulesSearch";
import DnDClasses from "./components/reference_guide/DnDClasses";
import Alignment from "./components/reference_guide/Alignment";
import LoginPage from "./components/users/LogIn";
import LogoutPage from "./components/users/LogOut";
import SignUpForm from "./components/users/SignUpForm";
import { CurrentUserProvider } from "./components/contexts/CurrentUser";


// import {jwtDecode} from "jwt-decode";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [chatVisible, setChatVisible] = useState<boolean>(false);
  // const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // const [chatUsername, setChatUsername] = useState<string | null>(null); // Username to chat with

const handleLoginSuccess = (username: string, token: string) => {
  localStorage.setItem("token", token);
  setUsername(username);
  // const decoded = jwtDecode(token); // Assuming your JWT contains the user ID
  // setCurrentUserId(username);
};

 const handleLogout = () => {
   localStorage.removeItem("token");
   setUsername(null);
  //  setCurrentUserId(null);
  //  setChatVisible(false);
 };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const toggleChat = () => {
  //   setChatVisible(!chatVisible);
  //   // Set this to a default or selected user to start chat with
  //   setChatUsername("otherUserUsername"); // This should be set dynamically based on user selection
  // };

  return (
  <CurrentUserProvider>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="main-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/create"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Character Creator
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/manager"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Character Manager
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/dice"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Dice Roller
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/initiative-tracker"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Initiative Tracker
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/music-search"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Music Search
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/monster-search"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Monster Search
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/races-search"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Races Search
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/rules-search"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Rules Search
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/classes"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Classes
                </NavLink>
              </MenuItem>
            </Menu>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, marginLeft: "20px" }}
            >
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                🐉 DM Assist 🐉
              </NavLink>
            </Typography>
            {username ? (
              <>
                <Typography variant="h6" style={{ margin: "0 12px" }}>
                  Welcome, {username}!
                </Typography>
                {/* <IconButton color="inherit" onClick={toggleChat}>
                  <ChatBubbleIcon />
                </IconButton> */}
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </NavLink>
                </Button>
                <Button color="inherit">
                  <NavLink
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign Up
                  </NavLink>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/logout"
              element={
                <LogoutPage
                  onLogout={() => console.log("User logged out successfully")}
                />
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/create" element={<CharacterCreator />} />
            <Route path="/manager" element={<CharacterManager />} />
            <Route path="/dice" element={<DiceRoller />} />
            <Route path="/initiative-tracker" element={<InitiativeTracker />} />
            <Route path="/music-search" element={<MusicSearch />} />
            <Route path="/monster-search" element={<MonsterSearch />} />
            <Route path="/races-search" element={<RacesSearch />} />
            <Route path="/rules-search" element={<RulesSearch />} />
            <Route path="/alignment" element={<Alignment />} />
            <Route path="/classes" element={<DnDClasses />} />
          </Routes>
          {/* {chatVisible && currentUserId && chatUsername && (
            <Chat username={chatUsername} currentUserId={currentUserId} />
          )} */}
        </Container>
      </Router>
    </ThemeProvider>
  </CurrentUserProvider>
  );
}

export default App;
