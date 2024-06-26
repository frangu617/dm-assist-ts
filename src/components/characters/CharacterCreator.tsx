import { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Tooltip,
  Alert,
} from "@mui/material";
import RaceSelector from "./RaceSelector";
import AlignmentSelector from "./AlignmentSelector";
import ClassSelector from "./ClassSelector";
import BackgroundSelector from "./BackgroundSelector";
import Abilities from "./AbilitySelector";
import SkillsSelector from "./SkillsSelector";
import { useCurrentUser } from "../contexts/CurrentUser";
// import dotenv from "dotenv";
// dotenv.config();

interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  alignment: string;
  background: string;
  abilities: { [key: string]: number };
  skills: string[];
  feats: string[];
  hitPoints: number;
  hitDice: string;
  inventory: string[];
  description: string;
}

export default function CharacterCreator() {
  const { currentUser } = useCurrentUser();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [newCharacter, setNewCharacter] = useState<Character>({
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
    inventory: [],
    description: "",
  });

  const apiUrl = import.meta.env.VITE_APP_URL;

  const handleCharacterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const characterData: Character = {
      ...newCharacter,
      inventory: newCharacter.inventory, // No need to split and trim here
    };

    fetch(`${apiUrl}/api/characters/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(characterData),
    })
      .then((response) => response.json())
      .then((data: Character) => {
        setCharacters([...characters, data]);
        setNewCharacter({
          ...newCharacter,
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
          inventory: [],
          description: "",
        });
        setShowAlert(true);
        setAlertMessage("Character created successfully!");
      })
      .catch((error) => console.error("Error creating character:", error));

    setResetKey((prevKey) => prevKey + 1);
  };

  const handleClassChange = (selectedClass: string) => {
    setNewCharacter({ ...newCharacter, class: selectedClass });
  };

  const handleRaceChange = (selectedRace: string) => {
    setNewCharacter({ ...newCharacter, race: selectedRace });
  };

  const handleAlignmentChange = (selectedAlignment: string) => {
    setNewCharacter({ ...newCharacter, alignment: selectedAlignment });
  };

  const handleBackgroundChange = (selectedBackground: string) => {
    setNewCharacter({ ...newCharacter, background: selectedBackground });
  };

  const handleAbilityChange = (ability: string, value: number) => {
    setNewCharacter({
      ...newCharacter,
      abilities: {
        ...newCharacter.abilities,
        [ability]: value,
      },
    });
  };

  const handleSkillsChange = (selectedSkills: { name: string }[]) => {
    setNewCharacter({
      ...newCharacter,
      skills: selectedSkills.map((skill) => skill.name),
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>D&D Character Creator</h2>
      <form onSubmit={handleCharacterSubmit}>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <h3>Character Details:</h3>
            <Grid container spacing={2}>
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
              <Grid item xs={6} sm={4} lg={2}>
                <RaceSelector
                  selectedRace={newCharacter.race}
                  onRaceChange={handleRaceChange}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <ClassSelector
                  selectedClass={newCharacter.class}
                  onClassChange={handleClassChange}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <AlignmentSelector
                  selectedAlignment={newCharacter.alignment}
                  onAlignmentChange={handleAlignmentChange}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <BackgroundSelector
                  selectedBackground={newCharacter.background}
                  onBackgroundChange={handleBackgroundChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Abilities
              abilities={newCharacter.abilities}
              onAbilityChange={handleAbilityChange}
            />
          </CardContent>
        </Card>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <SkillsSelector
              key={resetKey}
              onSkillsChange={handleSkillsChange}
            />
          </CardContent>
        </Card>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Inventory"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={newCharacter.inventory.join(", ")} // Convert array to string for display
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      inventory: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                />
              </Grid>
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
        {currentUser ? (
          <Button variant="contained" type="submit">
            Add Character
          </Button>
        ) : (
          <Tooltip title="You must be logged in to add a character.">
            <span id="disabled-tooltip">
              <Button variant="contained" type="submit" disabled>
                Add Character
              </Button>
            </span>
          </Tooltip>
        )}
      </form>
    </div>
  );
}
