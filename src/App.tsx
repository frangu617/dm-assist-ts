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
  // Menu,
  // MenuItem,
  Typography,
  Container,
  Button,
} from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import customTheme from "./components/themes/customTheme";
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

function App() {
  const [username, setUsername] = useState(null);

 const handleLoginSuccess = (username: string, token: string) => {
   localStorage.setItem("token", token); // Store token for session persistence
   setUsername(username); // Assuming you have a state setter for username
 };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
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
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </NavLink>
              </Button>
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
              element={<LogoutPage onLogout={handleLogout} />}
            />
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
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
