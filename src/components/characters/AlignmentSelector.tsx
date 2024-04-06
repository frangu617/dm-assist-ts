import React, { useState, useEffect } from 'react';
import { Tooltip, TextField } from '@mui/material';

function AlignmentSelector({ selectedAlignment, onAlignmentChange }) {
    const [alignments, setAlignments] = useState([]);

    // Function to fetch the list of races from the D&D 5e API
    const fetchAlignments = () => {
        fetch('https://www.dnd5eapi.co/api/alignments')
            .then((response) => response.json())
            .then((data) => {
                // Extract the race names from the fetched data
                const alignmentNames = data.results.map((alignment) => alignment.name);
                setAlignments(alignmentNames); // Set the races state with the fetched data
            })
            .catch((error) => console.error('Error fetching alignments:', error));
    };

    useEffect(() => {
        // Fetch races when the component mounts
        fetchAlignments();
        // const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];

    }, []);

    return (
        <Tooltip title={`Selected Alignment: ${selectedAlignment}`}>
            <TextField
                fullWidth
                select
                label="Alignment"
                variant="outlined"
                value={selectedAlignment}
                onChange={(e) => onAlignmentChange(e.target.value)}
                SelectProps={{ native: true }}
            >
                <option value=""> </option>
                {alignments.map((alignment, index) => (
                    <option key={index} value={alignment}>
                        {alignment}
                    </option>
                ))}
            </TextField>
        </Tooltip>
    );
}

export default AlignmentSelector;