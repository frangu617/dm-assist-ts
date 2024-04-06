import React, { useState, useEffect } from 'react';
import { Tooltip, TextField } from '@mui/material';

function ClassSelector({ selectedClass, onClassChange }) {
    const [classes, setClasses] = useState([]);

    const fetchClasses = () => {
        fetch('https://www.dnd5eapi.co/api/classes')
            .then((response) => response.json())
            .then((data) => {
                // Extract the race names from the fetched data
                const classNames = data.results.map((clas) => clas.name);
                setClasses(classNames); // Set the races state with the fetched data
            })
            .catch((error) => console.error('Error fetching races:', error));
    };

    useEffect(() => {
        // Fetch races when the component mounts
        fetchClasses();
        // const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

    })

    return (
        <Tooltip title={`Selected Class: ${selectedClass}`}>
            <TextField
                fullWidth
                select
                label="Class"
                variant="outlined"
                value={selectedClass}
                onChange={(e) => onClassChange(e.target.value)}
                SelectProps={{ native: true }}
            >
                <option value=""></option>
                {classes.map((clas, index) => (
                    <option key={index} value={clas}>
                        {clas}
                    </option>
                ))}
            </TextField>
        </Tooltip>
    )
}

export default ClassSelector