import React, { useState, useEffect, ChangeEvent } from "react";
import { Tooltip, TextField } from "@mui/material";

// Define a type for the component props
interface AlignmentSelectorProps {
  selectedAlignment: string;
  onAlignmentChange: (value: string) => void; // Assuming onAlignmentChange is a function that takes a string and returns void
}

const AlignmentSelector: React.FC<AlignmentSelectorProps> = ({
  selectedAlignment,
  onAlignmentChange,
}) => {
  const [alignments, setAlignments] = useState<string[]>([]);

  // Function to fetch the list of alignments from the D&D 5e API
  const fetchAlignments = () => {
    fetch("https://www.dnd5eapi.co/api/alignments")
      .then((response) => response.json())
      .then((data) => {
        // Extract the alignment names from the fetched data
        const alignmentNames = data.results.map(
          (alignment: any) => alignment.name
        );
        setAlignments(alignmentNames); // Set the alignments state with the fetched data
      })
      .catch((error) => console.error("Error fetching alignments:", error));
  };

  useEffect(() => {
    // Fetch alignments when the component mounts
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
        onChange={(e: ChangeEvent<{ value: unknown }>) =>
          onAlignmentChange(e.target.value as string)
        } // Explicitly type the event parameter
        SelectProps={{ native: true }}
      >
        <option value=""></option>
        {alignments.map((alignment, index) => (
          <option key={index} value={alignment}>
            {alignment}
          </option>
        ))}
      </TextField>
    </Tooltip>
  );
};

export default AlignmentSelector;
