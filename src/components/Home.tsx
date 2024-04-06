import React from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import oldTimeyTheme from "./themes/oldTimey";
//Trying to finalize this
export default function Home() {
    return (
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
            <Grid container justifyContent="center">
                <Grid item xs={6} sm={4} lg={3} >
                    <NavLink to="/create"><Button variant="contained">Create character</Button></NavLink>
                </Grid>
                <Grid item xs={6} sm={4} lg={3} >
                    <NavLink to="/manager"><Button variant="contained">Manage characters</Button></NavLink>
                </Grid>
                <Grid item xs={6} sm={4} lg={3} >
                    <NavLink to="/dice"><Button variant="contained">Roll Some dice</Button></NavLink>
                </Grid>
            </Grid>
        </div>
    );
}