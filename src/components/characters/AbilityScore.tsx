import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Container, Paper, MenuItem, FormControl, InputLabel, Select, Tooltip } from '@mui/material';

function AbilityScores({ ability }) {
  const [abilityScores, setAbilityScores] = useState([]);
  const [selectedAbilityScoreIndex, setSelectedAbilityScoreIndex] = useState('');
  const [selectedAbilityScore, setSelectedAbilityScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortAbilityName = ability.substring(0, 3).toLowerCase();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/ability-scores")
      .then(response => response.json())
      .then(data => {
        setAbilityScores(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (shortAbilityName) {
      fetchAbilityScoreDetails(shortAbilityName);
    }
  }, [shortAbilityName]);

  const fetchAbilityScoreDetails = (name) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/ability-scores/${name}`)
      .then(response => response.json())
      .then(data => {
        setSelectedAbilityScore(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const renderAbilityScoreData = (data) => {
    if (!data) return null;

    return (
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        <br />
        <strong>Full Name:</strong> {data.full_name}
        <br />
        <strong>Description:</strong> {data.desc}
      </Typography>
    );
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', my: 4 }}>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {selectedAbilityScore && (
        <>
          <Typography variant="h4" component="h2">{selectedAbilityScore.name}</Typography>
          {renderAbilityScoreData(selectedAbilityScore)}
          
        </>
      )}
    </Container>
  );
}

export default AbilityScores;
