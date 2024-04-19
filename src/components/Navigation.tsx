import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUser"; // Adjust the import path as necessary
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const Navigation: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const [username, setUsername] = useState<string | null>(null);
  const [anchorElCharacter, setAnchorElCharacter] =
    useState<null | HTMLElement>(null);
  const [anchorElTools, setAnchorElTools] = useState<null | HTMLElement>(null);
  const [anchorElReference, setAnchorElReference] =
    useState<null | HTMLElement>(null);

  const handleLoginSuccess = (username: string, token: string) => {
    localStorage.setItem("token", token);
    setUsername(username);
    // const decoded = jwtDecode(token); // Assuming your JWT contains the user ID
    // setCurrentUserId(username);
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menuType: string
  ) => {
    switch (menuType) {
      case "Character":
        setAnchorElCharacter(event.currentTarget);
        break;
      case "Tools":
        setAnchorElTools(event.currentTarget);
        break;
      case "Reference":
        setAnchorElReference(event.currentTarget);
        break;
      default:
        break;
    }
  };

  const handleCloseMenu = (menuType: string) => {
    switch (menuType) {
      case "Character":
        setAnchorElCharacter(null);
        break;
      case "Tools":
        setAnchorElTools(null);
        break;
      case "Reference":
        setAnchorElReference(null);
        break;
      default:
        break;
    }
  };

  return (
    <nav>
      {currentUser ? (
        // If logged in, show these links
        <>
          <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        

        <Button
          color="inherit"
          aria-haspopup="true"
          onClick={(event) => handleOpenMenu(event, 'Character')}
          endIcon={<ArrowDropDownIcon />}
        >
          Character
        </Button>
        <Menu
          id="character-menu"
          anchorEl={anchorElCharacter}
          open={Boolean(anchorElCharacter)}
          onClose={() => handleCloseMenu('Character')}
        >
          <MenuItem onClick={() => handleCloseMenu('Character')}>
            <NavLink to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>
              Character Creator
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Character')}>
            <NavLink to="/manager" style={{ textDecoration: 'none', color: 'inherit' }}>
              Character Manager
            </NavLink>
          </MenuItem>
        </Menu>

        <Button
          color="inherit"
          aria-haspopup="true"
          onClick={(event) => handleOpenMenu(event, 'Tools')}
          endIcon={<ArrowDropDownIcon />}
        >
          Tools
        </Button>
        <Menu
          id="tools-menu"
          anchorEl={anchorElTools}
          open={Boolean(anchorElTools)}
          onClose={() => handleCloseMenu('Tools')}
        >
          <MenuItem onClick={() => handleCloseMenu('Tools')}>
            <NavLink to="/dice" style={{ textDecoration: 'none', color: 'inherit' }}>
              Dice Roller
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Tools')}>
            <NavLink to="/initiative-tracker" style={{ textDecoration: 'none', color: 'inherit' }}>
              Initiative Tracker
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Tools')}>
            <NavLink to="/music-search" style={{ textDecoration: 'none', color: 'inherit' }}>
              Music Search
            </NavLink>
          </MenuItem>
        </Menu>

        <Button
          color="inherit"
          aria-haspopup="true"
          onClick={(event) => handleOpenMenu(event, 'Reference')}
          endIcon={<ArrowDropDownIcon />}
        >
          Reference
        </Button>
        <Menu
          id="reference-menu"
          anchorEl={anchorElReference}
          open={Boolean(anchorElReference)}
          onClose={() => handleCloseMenu('Reference')}
        >
          <MenuItem onClick={() => handleCloseMenu('Reference')}>
            <NavLink to="/monster-search" style={{ textDecoration: 'none', color: 'inherit' }}>
              Monster Search
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Reference')}>
            <NavLink to="/races-search" style={{ textDecoration: 'none', color: 'inherit' }}>
              Races Search
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Reference')}>
            <NavLink to="/rules-search" style={{ textDecoration: 'none', color: 'inherit' }}>
              Rules Search
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu('Reference')}>
            <NavLink to="/classes" style={{ textDecoration: 'none', color: 'inherit' }}>
              Classes
            </NavLink>
          </MenuItem>
        </Menu>

        <Typography variant="h6" style={{ marginLeft: "12px" }}>
          Welcome, {currentUser.username}!
        </Typography>

        <Button color="inherit">
          <NavLink to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
            Logout
          </NavLink>
        </Button>
      </Toolbar>
    </AppBar>
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
    </nav>
  );
};

export default Navigation;
