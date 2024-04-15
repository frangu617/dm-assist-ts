import { useState, useEffect } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Alignment {
  index: string;
  name: string;
}

export default function Alignment() {
  const [alignment, setAlignment] = useState<Alignment[]>([]);
  const [selectedAlignment, setSelectedAlignment] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/alignments")
      .then((response) => response.json())
      .then((data) => {
        setAlignment(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedAlignment !== null && alignment.length > 0) {
      fetchAlignmentDetails(alignment[selectedAlignment].index);
    }
  }, [selectedAlignment, alignment]);

  const fetchAlignmentDetails = (alignmentIndex: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/alignments/${alignmentIndex}`)
      .then((response) => response.json())
      .then((data) => {
        // Do something with the alignment details
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

const handleAlignmentChange = (event: SelectChangeEvent<number>) => {
  setSelectedAlignment(Number(event.target.value));
};
  const renderAlignment = () => {
    if (alignment.length > 0) {
      return (
        <FormControl fullWidth>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <InputLabel id="alignment-select-label">Alignment</InputLabel>
          <Select
            labelId="alignment-select-label"
            id="alignment-select"
            value={selectedAlignment ?? ""}
            label="Alignment"
            onChange={handleAlignmentChange}
          >
            {alignment.map((align, index) => (
              <MenuItem key={align.index} value={index}>
                {align.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return null;
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Alignment
        {renderAlignment()}
      </Typography>
    </div>
  );
}
