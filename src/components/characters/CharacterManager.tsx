import React, { useState, useEffect } from 'react';
import { Grid, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';

const CharacterManager = () => {
    const [characters, setCharacters] = useState([]);
    const [expandedCharacterId, setExpandedCharacterId] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_URL}/api/characters`)
          .then((response) => response.json())
          .then((data) => setCharacters(data))
          .catch((error) => console.error("Error fetching characters:", error));
    }, []);

    const toggleExpandCharacter = (id) => {
        setExpandedCharacterId(expandedCharacterId === id ? null : id);
    };

    const deleteCharacter = (id) => {
        fetch(`${import.meta.env.VITE_APP_URL}/api/characters/${id}`, {
          method: "DELETE",
        })
          .then(() =>
            setCharacters(
              characters.filter((character) => character._id !== id)
            )
          )
          .catch((error) => console.error("Error deleting character:", error));
    };

    const renderAbilities = (abilities) => (
        <List>
            {Object.entries(abilities).map(([key, value]) => (
                <ListItem key={key}>
                    <ListItemText primary={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`} />

                </ListItem>
            ))}
        </List>
    );

    const renderSkills = (skills) => (
        <List>
            {skills.map((skill, index) => (
                <ListItem key={index}>
                    <ListItemText primary={skill} />
                </ListItem>
            ))}
        </List>
    );

    const renderCharacterDetails = (character) => (
        <div style = {{marginLeft: 20, marginBottom: 0}}>
            
                
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

    return (
        <div>
            <h3>Characters:</h3>

            {characters.length > 0 ? (
                <ul style={{ listStyleType: 'none' }}>
                    {characters.map((character) => (
                        <Card sx={{ minWidth: 275, marginTop: 2 }}>
                            <CardContent>
                                <li key={character._id}>
                                    <div>
                                        <h3>Name: {character.name}</h3>
                                        <Button sx={{ marginLeft: 1 }} variant="contained" onClick={() => toggleExpandCharacter(character._id)}>
                                            {expandedCharacterId === character._id ? 'Collapse' : 'Expand'}
                                        </Button>
                                        <Button sx={{ marginLeft: 1 }} variant="contained" color="error" size="small"  onClick={() => deleteCharacter(character._id)}>Delete</Button>
                                    </div>
                                    {expandedCharacterId === character._id && renderCharacterDetails(character)}
                                </li>
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
