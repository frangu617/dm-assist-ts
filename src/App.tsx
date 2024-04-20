import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

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
import Navigation from "./components/Navigation";
import ChatWindow from "./components/users/Message";

// import {jwtDecode} from "jwt-decode";

function App() {
  // const navigate = useNavigate();
  const setUsername = (username: string) => {
    localStorage.setItem("username", username);
  };
  const handleLoginSuccess = (username: string, token: string) => {
    localStorage.setItem("token", token);
    setUsername(username);
    
  };

  return (
    <CurrentUserProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Router>
          <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Toolbar>
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
              <Navigation />
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
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
              <Route
                path="/initiative-tracker"
                element={<InitiativeTracker />}
              />
              <Route path="/music-search" element={<MusicSearch />} />
              <Route path="/monster-search" element={<MonsterSearch />} />
              <Route path="/races-search" element={<RacesSearch />} />
              <Route path="/rules-search" element={<RulesSearch />} />
              <Route path="/alignment" element={<Alignment />} />
              <Route path="/classes" element={<DnDClasses />} />
            </Routes>
          </Container>
          <ChatWindow />
        </Router>
      </ThemeProvider>
    </CurrentUserProvider>
  );
}

export default App;
