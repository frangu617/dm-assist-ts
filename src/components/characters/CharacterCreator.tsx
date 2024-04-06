import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import AbilityScores from "./AbilityScore";
// import Skills from './Skills';
import RaceSelector from "./RaceSelector";
import AlignmentSelector from "./AlignmentSelector";
import ClassSelector from "./ClassSelector";
import BackgroundSelector from "./BackgroundSelector";
import Abilities from "./AbilitySelector";
import SkillsSelector from "./SkillsSelector";

export default function CharacterCreator() {
  const [characters, setCharacters] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    race: "",
    class: "",
    level: 1,
    alignment: "",
    background: "",
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [],
    feats: [],
    hitPoints: 10,
    hitDice: "1d10",
    inventory: "",
    description: "",
  });
  // Define arrays for races, classes, alignments, backgrounds, and skills
  const skillsList = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival",
  ];

  const getInitialCharacterState = () => ({
    name: "",
    race: "",
    class: "",
    level: 1,
    alignment: "",
    background: "",
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [],
    feats: [],
    hitPoints: 10,
    hitDice: "1d10",
    inventory: "",
    description: "",
  });

  let VITE_APP_URL = import.meta.env.VITE_APP_URL;
  console.log("VITE_API_URL: ", VITE_APP_URL);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_APP_URL}/api/characters` ||
        "http://localhost:5000/api/characters"
    )
      .then((response) => {
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setCharacters(data);
      })
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const handleCharacterSubmit = (e) => {
    e.preventDefault();

    const characterData = {
      ...newCharacter,
      inventory: newCharacter.inventory.split(",").map((item) => item.trim()), // Convert inventory string to array
    };

    // Send a POST request to the server to create a character
    fetch(`${import.meta.env.VITE_APP_URL}/api/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCharacters([...characters, data]);
        setNewCharacter(getInitialCharacterState());
      })
      .catch((error) => console.error("Error creating character:", error));

    // Reset form state
    setNewCharacter(getInitialCharacterState());

    // Increment key to force-reset child components like SkillsSelector
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleClassChange = (selectedClass) => {
    setNewCharacter({ ...newCharacter, class: selectedClass }); // Update the selected class in the state
  };

  const handleRaceChange = (selectedRace) => {
    setNewCharacter({ ...newCharacter, race: selectedRace });
  };

  const handleAlignmentChange = (selectedAlignment) => {
    setNewCharacter({ ...newCharacter, alignment: selectedAlignment });
  };

  const handleBackgroundChange = (selectedBackground) => {
    setNewCharacter({ ...newCharacter, background: selectedBackground });
  };

  const handleAbilityChange = (ability, value) => {
    setNewCharacter({
      ...newCharacter,
      abilities: {
        ...newCharacter.abilities,
        [ability]: value,
      },
    });
  };

  const handleSkillsChange = (selectedSkills) => {
    // Update the character's skills based on selection from SkillsSelector
    setNewCharacter({
      ...newCharacter,
      skills: selectedSkills.map((skill) => skill.name), // Assuming selectedSkills is an array of skill objects
    });
  };

  return (
    <div>
      <h2>D&D Character Creator</h2>

      {/* Character Creation Form */}
      <form onSubmit={handleCharacterSubmit}>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <h3>Character Details:</h3>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={6} sm={4} lg={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={newCharacter.name}
                  onChange={(e) =>
                    setNewCharacter({ ...newCharacter, name: e.target.value })
                  }
                />
              </Grid>

              {/* Race */}
              <Grid item xs={6} sm={4} lg={2}>
                <RaceSelector
                  selectedRace={newCharacter.race}
                  onRaceChange={handleRaceChange}
                />
              </Grid>

              {/* Class */}
              <Grid item xs={6} sm={4} lg={2}>
                <ClassSelector
                  selectedClass={newCharacter.class}
                  onClassChange={handleClassChange}
                />
              </Grid>

              {/* Alignment */}

              <Grid item xs={6} sm={4} lg={2}>
                <AlignmentSelector
                  selectedAlignment={newCharacter.alignment}
                  onAlignmentChange={handleAlignmentChange}
                />
              </Grid>

              {/* Background */}
              <Grid item xs={6} sm={4} lg={2}>
                <BackgroundSelector
                  selectedBackground={newCharacter.background}
                  onBackgroundChange={handleBackgroundChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Abilities (Strength, Dexterity, etc.) */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Abilities
              abilities={newCharacter.abilities}
              onAbilityChange={handleAbilityChange}
            />
          </CardContent>
        </Card>
        {/* Skills */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <SkillsSelector
              key={resetKey}
              onSkillsChange={handleSkillsChange}
            />
          </CardContent>
        </Card>

        {/* Hit Points */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hit Points"
                  type="number"
                  variant="outlined"
                  value={newCharacter.hitPoints}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      hitPoints: parseInt(e.target.value),
                    })
                  }
                />
              </Grid>

              {/* Hit Dice */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hit Dice"
                  variant="outlined"
                  value={newCharacter.hitDice}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      hitDice: e.target.value,
                    })
                  }
                />
              </Grid>

              {/* Inventory */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Inventory"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={newCharacter.inventory}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      inventory: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Character Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Character Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={newCharacter.description}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button variant="contained" type="submit">
          Add Character
        </Button>
      </form>
    </div>
  );
}
