import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Box,
} from "@mui/material";

interface Character {
  name: string;
  initiativeOrder: number;
}

const InitiativeTracker: React.FC = () => {
  const [initiativeQueue, setInitiativeQueue] = useState<Character[]>([]);
  const [newCharacterName, setNewCharacterName] = useState<string>("");
  const [newCharacterInitiative, setNewCharacterInitiative] =
    useState<string>("");

  const handleAddCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCharacterInitiative) {
      const newCharacter: Character = {
        name: newCharacterName,
        initiativeOrder: parseInt(newCharacterInitiative, 10),
      };
      setInitiativeQueue((prevQueue) =>
        [...prevQueue, newCharacter].sort(
          (a, b) => b.initiativeOrder - a.initiativeOrder
        )
      );
      setNewCharacterName("");
      setNewCharacterInitiative("");
    }
  };

  const handleNextTurn = () => {
    setInitiativeQueue((prevQueue) => {
      if (prevQueue.length > 0) {
        const newQueue = [...prevQueue];
        const character = newQueue.shift();
        if (character) {
          newQueue.push(character);
        }
        return newQueue;
      }
      return prevQueue;
    });
  };

  const handleClearQueue = () => {
    setInitiativeQueue([]);
  };

  const renderQueue = () => (
    <List>
      {initiativeQueue.map((character, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${character.name} (Initiative: ${character.initiativeOrder})`}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Initiative Tracker
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>{renderQueue()}</CardContent>
      </Card>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleNextTurn}>
            Next Turn
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearQueue}
          >
            Clear Queue
          </Button>
        </Grid>
      </Grid>
      <form onSubmit={handleAddCharacter} style={{ marginTop: "20px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Character Name"
              variant="outlined"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Initiative Order"
              type="number"
              variant="outlined"
              value={newCharacterInitiative}
              onChange={(e) => setNewCharacterInitiative(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Character
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default InitiativeTracker;
