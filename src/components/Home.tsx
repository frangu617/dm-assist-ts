// import React from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import oldTimeyTheme from "./themes/oldTimey";
import ChatWindow from "./users/Message";
import { CurrentUserProvider } from "./contexts/CurrentUser";
//Trying to finalize this
export default function Home() {
    return (
        <CurrentUserProvider>
        <div>
            <h1>Welcome Dungeon Masters!</h1>
            <Card style={{ marginBottom: 20 }}>
                <CardContent>
                    <ThemeProvider theme={oldTimeyTheme}>
                        <Typography variant="h5">
                            🐉 Embark on an unforgettable adventure with The Dungeon Master's Assistant, your essential tool for crafting and navigating the thrilling world of dungeons and dragons. Whether you're a seasoned Dungeon Master or just beginning your journey, our app is designed to streamline your experience, unleashing your creativity and bringing your stories to life.
                        </Typography>
                    </ThemeProvider>
                </CardContent>
            </Card>
           
            <ChatWindow />
            
        </div>
        </CurrentUserProvider>
    );
}