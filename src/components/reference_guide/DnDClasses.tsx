import React, { useState, useEffect } from "react";
import { Paper, CircularProgress, Typography, Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material';

function DnDClasses(prop) {
    const [classes, setClasses] = useState([]);
    const [selectedClassIndex, setSelectedClassIndex] = useState('');
    const [classDetails, setClassDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/classes")
            .then(response => response.json())
            .then(data => {
                setClasses(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedClassIndex !== '') {
            fetchClassDetails(classes[selectedClassIndex].index);
        }
    }, [selectedClassIndex, classes]);

    const fetchClassDetails = (classIndex) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}`)
            .then(response => response.json())
            .then(data => {
                setClassDetails(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    };

    const handleClassChange = (event) => {
        setSelectedClassIndex(event.target.value);
    };

    const displayProficiencies = (proficiencies) => {
        return proficiencies.map((proficiency, index) => (
            <Typography key={index} style={{ textAlign: 'left' }}>{proficiency.name}</Typography>
        ));
    };

    const displayEquipment = (equipment) => {
        return equipment.map((item, index) => (
            <Typography key={index} style={{ textAlign: 'left' }}>{`${item.quantity}x ${item.equipment.name}`}</Typography>
        ));
    };

    const displayEquipmentOptions = (equipmentOptions) => {
        return equipmentOptions.map((option, index) => (
            <Typography key={index} style={{ textAlign: 'left' }}>{option.desc}</Typography>
        ));
    };

    const displaySpellcasting = (spellcasting) => {
        if (!spellcasting) return null;

        return (
            <Box mb={2} sx={{ textAlign: 'left' }}>
                <Typography variant="h4" >Spellcasting</Typography>
                <br />
                {spellcasting.info.map((info, index) => (
                    <Box key={index} mb={2}>
                        <Typography variant="subtitle1">{info.name}</Typography>
                        {info.desc.map((desc, descIndex) => (
                            <Typography key={descIndex}>{desc}</Typography>
                        ))}
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ margin: 'auto', textAlign: 'center' }}>

            <FormControl fullWidth>
                <InputLabel id="class-select-label">Class</InputLabel>
                <Select
                    labelId="class-select-label"
                    id="class-select"
                    value={selectedClassIndex}
                    label="Class"
                    onChange={handleClassChange}
                >
                    {classes.map((classData, index) => (
                        <MenuItem key={index} value={index}>{classData.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Card variant="outlined" sx={{ mb: 2 }}>
                {isLoading && <CircularProgress />}
                {error && <Typography color="error">{error}</Typography>}
                {classDetails && (
                    <Paper sx={{ padding: 2 }}>
                        <Box mt={4}>
                            <Typography variant="h3">{classDetails.name}</Typography>
                            <Typography>Hit Die: d{classDetails.hit_die}</Typography>
                            <Box mt={2}>
                                <Typography variant="h4" style={{ textAlign: 'left' }}>Proficiencies</Typography>
                                <br />
                                {displayProficiencies(classDetails.proficiencies)}
                                <br />
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h4" style={{ textAlign: 'left' }}>Starting Equipment</Typography>
                                <br />
                                {displayEquipment(classDetails.starting_equipment)}
                                {displayEquipmentOptions(classDetails.starting_equipment_options)}
                            </Box>
                            <br />
                            {displaySpellcasting(classDetails.spellcasting)}
                        </Box>
                    </Paper>
                )}
            </Card>
        </Box>
    );
}

export default DnDClasses;
