import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Character {
  _id: string;
  name: string;
  race: string;
  class: string;
  inventory: string;
  description: string;
  hitPoints: number;
  abilities: { [key: string]: number };
  skills: string[];
}

const apiUrl = import.meta.env.VITE_APP_URL;

const CharacterManager: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [expandedCharacterId, setExpandedCharacterId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the stored token
    if (token) {
      fetch(`${apiUrl}/api/characters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data: Character[]) => {
          setCharacters(data);
          setLoading(false); // Set loading to false after data is received
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
        setLoading(false);
      });
    }
  }, []);

  const toggleExpandCharacter = (id: string) => {
    setExpandedCharacterId(expandedCharacterId === id ? null : id);
  };

  const deleteCharacter = (id: string) => {
    fetch(`${apiUrl}/api/characters/${id}`, {
      method: "DELETE",
    })
      .then(() =>
        setCharacters(characters.filter((character) => character._id !== id))
      )
      .catch((error) => console.error("Error deleting character:", error));
  };

  const renderAbilities = (abilities: { [key: string]: number }) => (
    <List>
      {Object.entries(abilities).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText
            primary={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
          />
        </ListItem>
      ))}
    </List>
  );

  const renderSkills = (skills: string[]) => (
    <List>
      {skills.map((skill, index) => (
        <ListItem key={index}>
          <ListItemText primary={skill} />
        </ListItem>
      ))}
    </List>
  );

  const renderCharacterDetails = (character: Character) => (
    <div style={{ marginLeft: 20, marginBottom: 0 }}>
      <p>Race: {character.race}</p>
      <p>Class: {character.class}</p>
      <p>Inventory: {character.inventory}</p>
      <p>Description: {character.description}</p>
      <p>Hit Points: {character.hitPoints}</p>
      <Typography variant="subtitle1">Abilities:</Typography>
      {renderAbilities(character.abilities)}
      <Typography variant="subtitle1">Skills:</Typography>
      {renderSkills(character.skills)}
    </div>
  );

  const handleEdit = (characterId: string) => {
    navigate(`/editor/${characterId}`);
  }
  return (
    <div>
      <h3>Characters:</h3>
      {loading ? (
        <LinearProgress /> // Display the spinner while data is loading
      ) : characters.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {characters.map((character) => (
            <Card key={character._id} sx={{ minWidth: 275, marginTop: 2 }}>
              <CardContent>
                <div>
                  <h3>Name: {character.name}</h3>
                  <Button
                    sx={{ marginLeft: 1 }}
                    variant="contained"
                    onClick={() => toggleExpandCharacter(character._id)}
                  >
                    {expandedCharacterId === character._id
                      ? "Collapse"
                      : "Expand"}
                  </Button>
                  <Button
                    sx={{ marginLeft: 1 }}
                    variant="contained"
                    onClick={() => handleEdit(character._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ marginLeft: 1 }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteCharacter(character._id)}
                  >
                    Delete
                  </Button>
                </div>
                {expandedCharacterId === character._id &&
                  renderCharacterDetails(character)}
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : (
        <p>No characters available.</p>
      )}
    </div>
  );
};

export default CharacterManager;
