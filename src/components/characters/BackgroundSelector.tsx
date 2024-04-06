import React, { useState, useEffect, ChangeEvent } from "react";
import { Tooltip, TextField } from "@mui/material";

// Define a type for the component props
interface BackgroundSelectorProps {
    selectedBackground: string;
    onBackgroundChange: (value: string) => void; // Assuming onBackgroundChange is a function that takes a string and returns void
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedBackground, onBackgroundChange }) => {
    const [background, setBackground] = useState<string[]>([]);

    useEffect(() => {
        // Fetch backgrounds when the component mounts
        // The provided API endpoint only returns "Acolyte", so static values are used as a fallback
        setBackground(['Acolyte', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Criminal', 'Entertainer', 'Hermit', 'Outlander']);
    }, []);

    return (
        <Tooltip title={`Selected Background: ${selectedBackground}`}>
            <TextField
                fullWidth
                select
                label="Background"
                variant="outlined"
                value={selectedBackground}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onBackgroundChange(e.target.value as string)} // Explicitly type the event parameter
                SelectProps={{ native: true }}
            >
                <option value=""></option>
                {background.map((bg, index) => (
                    <option key={index} value={bg}>
                        {bg}
                    </option>
                ))}
            </TextField>
        </Tooltip>
    );
};

export default BackgroundSelector;
