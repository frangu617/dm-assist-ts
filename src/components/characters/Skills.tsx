import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Container, Paper, MenuItem, FormControl, InputLabel, Select, Tooltip } from '@mui/material';

function Skills({ skill }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let shortSkillName = skill.index;
  // if(shortSkillName === "animal handling")
  // {
  //   shortSkillName = "animal-handling"
  // }
  // else if(shortSkillName === "sleight of hand")
  // {
  //   shortSkillName = "sleight-of-hand"
  // }

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/skills")
      .then(response => response.json())
      .then(data => {
        setSkills(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (shortSkillName) {
      fetchSkillDetails(shortSkillName);
    }
  }, [shortSkillName]);

  const fetchSkillDetails = (name) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/skills/${name}`)
      .then(response => response.json())
      .then(data => {
        setSelectedSkill(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleSkillChange = (event) => {
    setSelectedSkillIndex(event.target.value);
  };

  const renderSkillData = (data) => {
    if (!data) return null;

    return (
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        <br />
        <strong>Description:</strong> {data.desc}
        <br />
        <br />
        <strong>Ability Modifier:</strong> {data.ability_score?.name}
      </Typography>
    );
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', my: 4 }}>
      
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {selectedSkill && (
        <>
          <Typography variant="h4" component="h2">{selectedSkill.name}</Typography>
          {renderSkillData(selectedSkill)}
        </>
      )}
    </Container>
  );
}

export default Skills;
