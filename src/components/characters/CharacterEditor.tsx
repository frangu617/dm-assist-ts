import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, TextField, CircularProgress } from "@mui/material";

import AlignmentSelector from "./AlignmentSelector";
import BackgroundSelector from "./BackgroundSelector";
import ClassSelector from "./ClassSelector";
import RaceSelector from "./RaceSelector";
import SkillsSelector from "./SkillsSelector";
import Abilities from "./AbilitySelector";

const apiUrl = import.meta.env.VITE_APP_URL;
// Assuming you have a character interface similar to this
interface Character {
  _id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  alignment: string;
  background: string;
  abilities: { [key: string]: number };
  skills: string[];
  hitPoints: number;
  inventory: string[];
  description: string;
}

const CharacterEditor: React.FC = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/characters/${characterId}`)
      .then((response) => response.json())
      .then((data: Character) => {
        setCharacter(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
        setIsLoading(false);
      });
  }, [characterId]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!character) return;

    try {
      const response = await fetch(
        `${apiUrl}/api/characters/${character._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if necessary
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(character),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the character");
      }

      navigate("/manager"); // Redirect to the character manager page
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };

  // Define handlers for each component's change here
  // ...
  const handleNameChange = (name: string) => {
    if (character) setCharacter({ ...character, name });
  };

  const handleClassChange = (selectedClass: string) => {
    if (character) setCharacter({ ...character, class: selectedClass });
  };

  const handleRaceChange = (selectedRace: string) => {
    if (character) setCharacter({ ...character, race: selectedRace });
  };

  const handleAlignmentChange = (selectedAlignment: string) => {
    if (character) setCharacter({ ...character, alignment: selectedAlignment });
  };

  const handleBackgroundChange = (selectedBackground: string) => {
    if (character)
      setCharacter({ ...character, background: selectedBackground });
  };

  const handleAbilityChange = (ability: string, value: number) => {
    if (character) {
      setCharacter({
        ...character,
        abilities: {
          ...character.abilities,
          [ability]: value,
        },
      });
    }
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    if (character) setCharacter({ ...character, skills: selectedSkills });
  };

  const handleHitPointsChange = (hitPoints: number) => {
    if (character) setCharacter({ ...character, hitPoints });
  };

  const handleInventoryChange = (inventory: string) => {
    if (character)
      setCharacter({
        ...character,
        inventory: inventory.split(",").map((item) => item.trim()),
      });
  };

  const handleDescriptionChange = (description: string) => {
    if (character) setCharacter({ ...character, description });
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div>
      <h2>Edit Character</h2>
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={character.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <RaceSelector
              selectedRace={character.race}
              onRaceChange={handleRaceChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ClassSelector
              selectedClass={character.class}
              onClassChange={handleClassChange}
            />
          </Grid>
          <Grid item xs={12}>
            <BackgroundSelector
              selectedBackground={character.background}
              onBackgroundChange={handleBackgroundChange}
            />
          </Grid>
          <Grid item xs={12}>
            <AlignmentSelector
              selectedAlignment={character.alignment}
              onAlignmentChange={handleAlignmentChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Abilities
              abilities={character.abilities}
              onAbilityChange={handleAbilityChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SkillsSelector
              onSkillsChange={(skills) =>
                handleSkillsChange(skills.map((skill) => skill.name))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hit Points"
              type="number"
              value={character.hitPoints}
              onChange={(e) =>
                handleHitPointsChange(parseInt(e.target.value, 10))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Inventory"
              value={character.inventory.join(", ")}
              onChange={(e) => handleInventoryChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={character.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default CharacterEditor;
