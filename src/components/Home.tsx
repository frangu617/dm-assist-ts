// import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import oldTimeyTheme from "./themes/oldTimey";
import { useCurrentUser } from "./contexts/CurrentUser";

//Trying to finalize this
export default function Home() {
    const {currentUser} = useCurrentUser();
    return (
      <div>
        <h1>Welcome Dungeon Masters!</h1>
        <Card style={{ marginBottom: 20 }}>
          <CardContent>
            <ThemeProvider theme={oldTimeyTheme}>
              <Typography variant="h5">
                🐉 Embark on an unforgettable adventure with The Dungeon
                Master's Assistant, your essential tool for crafting and
                navigating the thrilling world of dungeons and dragons. Whether
                you're a seasoned Dungeon Master or just beginning your journey,
                our app is designed to streamline your experience, unleashing
                your creativity and bringing your stories to life.
              </Typography>
            </ThemeProvider>
          </CardContent>
        </Card>
        {currentUser ? (
          <Card style={{ marginBottom: 20 }}>
            <CardContent>
              <ThemeProvider theme={oldTimeyTheme}>
                <Typography variant="h5">
                  🐉 Welcome back, {currentUser.username}! Your adventure
                  awaits! Start crafting your next adventure today!
                  <br />
                  Here are some quick links to get you started
                </Typography>
              </ThemeProvider>
              <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                color="primary"
                href="/create"
              >
                Create Character
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                color="primary"
                href="/manager"
              >
                Manage Characters
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                color="primary"
                href="/dice"
              >
                Dice Roller
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 2, ml: 2 }}
                color="primary"
                href="/rules-search"
              >
                Game Rules
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    );
}