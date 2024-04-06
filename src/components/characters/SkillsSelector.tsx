import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Grid, Tooltip, CircularProgress, Typography } from '@mui/material';

export default function SkillsSelector({ onSkillsChange }) {
    const [skillsList, setSkillsList] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/skills")
            .then(response => response.json())
            .then(data => {
                setSkillsList(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    const handleSkillChange = (skill) => {
        // Determine if the skill is already selected
        const currentIndex = selectedSkills.findIndex(selectedSkill => selectedSkill.index === skill.index);
        const newSelectedSkills = [...selectedSkills];

        // If the skill is already selected, remove it; otherwise, add it
        if (currentIndex === -1) {
            newSelectedSkills.push(skill);
        } else {
            newSelectedSkills.splice(currentIndex, 1);
        }

        setSelectedSkills(newSelectedSkills);
        onSkillsChange(newSelectedSkills); // Pass the new array of selected skills back to the parent component
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <h3>Skills</h3>
            <Grid container spacing={2}>
                {skillsList.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Tooltip title={skill.name} placement="top">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedSkills.findIndex(selectedSkill => selectedSkill.index === skill.index) !== -1}
                                        onChange={() => handleSkillChange(skill)}
                                    />
                                }
                                label={skill.name}
                            />
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
