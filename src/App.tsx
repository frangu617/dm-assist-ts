import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Link,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import customTheme from "./components/themes/customTheme";
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
import Chat from "./components/users/Message"; // Your chat component

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false); // State to control chat visibility

  const handleLoginSuccess = (username: string, token: string) => {
    localStorage.setItem("token", token);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setChatVisible(false); // Optionally close chat on logout
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleChat} // Toggle chat when menu icon is clicked
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, marginLeft: "20px" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                🐉 DM Assist 🐉
              </Link>
            </Typography>
            {username ? (
              <>
                <Typography variant="h6" style={{ margin: "0 12px" }}>
                  Welcome, {username}!
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
                <Button color="inherit" onClick={toggleChat}>
                  Chat
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign Up
                  </Link>
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
          {chatVisible && <Chat />}
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
