import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Container, Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function Alignment() {
    const [alignment, setAlignment] = useState([]);
    const [alignmentList, setAlignmentList] = useState([]);
    const [selectedAlignment, setSelectedAlignment] = useState(null);
    const [alignmentDetails, setAlignmentDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/alignments")
            .then(response => response.json())
            .then(data => {
                setAlignment(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    })

    useEffect(() => {
        if (selectedAlignment !== null) {
            fetchAlignmentDetails(alignment[selectedAlignment].index);
        }
    })

    const fetchAlignmentDetails = (alignmentIndex) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/alignments/${alignmentIndex}`)
            .then(response => response.json())
            .then(data => {
                setAlignmentDetails(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }

    const handleAlignmentChange = (event) => {
        setSelectedAlignment(event.target.value);
        // fetchAlignmentDetails(alignment[event.target.value].index);
    }

    const renderAlignment = () => {
        if (alignmentList.length > 0) {
            return (
                <FormControl fullWidth>
                    <InputLabel id="alignment-select-label">Alignment</InputLabel>
                    <Select
                        labelId="alignment-select-label"
                        id="alignment-select"
                        value={selectedAlignment}
                        label="Alignment"
                        onChange={handleAlignmentChange}
                    >
                        {alignmentList.map((alignment, index) => (
                            <MenuItem key={alignment.index} value={index}>
                                {alignment.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        }

    }
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Alignment

                {renderAlignment()}
            </Typography>
        </div>
    )
}