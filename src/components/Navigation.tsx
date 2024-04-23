import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUser";
import {
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <nav>
      <AppBar
        position="fixed"
        style={{ marginBottom: "20px", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              🐉DM Assist🐉{" "}
            </NavLink>
          </Typography>
          {currentUser ? (
            <Typography variant="h6" style={{ marginRight: "12px" }}>
              DM, {currentUser.username}!
            </Typography>
          ) : (
            <>
              <Button
                color="inherit"
                style={{ marginRight: "12px", boxShadow: "1px 1px 0 #000" }}
              >
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </NavLink>
              </Button>
              <Button color="inherit"
              style={{ marginRight: "12px", boxShadow: "1px 1px 0 #000" }}>
                <NavLink
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </NavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            button
            component={NavLink}
            to="/create"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Character Creator" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/manager"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Character Manager" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/dice"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Dice Roller" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/initiative-tracker"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Initiative Tracker" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/music-search"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Music Search" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/monster-search"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Monster Search" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/races-search"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Races Search" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/rules-search"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Rules Search" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/classes"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Classes" />
          </ListItem>
          {currentUser && (
            <ListItem
              button
              component={NavLink}
              to="/logout"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </nav>
  );
};

export default Navigation;
