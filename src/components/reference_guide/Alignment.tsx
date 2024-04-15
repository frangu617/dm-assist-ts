import { useState, useEffect, ReactNode } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Alignment {
  [x: string]: ReactNode;
  index: string;
  name: string;
  desc: string;
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

const handleAlignmentChange = (event: SelectChangeEvent<string>) => {
  setSelectedAlignment(Number(event.target.value));
};

  const renderAlignment = ( ) => {
    if (alignment.length > 0) {
      return (
        <FormControl fullWidth>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <InputLabel id="alignment-select-label">Alignment</InputLabel>
          <Select
            labelId="alignment-select-label"
            id="alignment-select"
            value={selectedAlignment != null ? selectedAlignment.toString() : ""}
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

  // const renderAlignmentData = (data: Alignment | null) => {
  //   if (!data) return null;

  //   return (
  //     <Typography variant="body2" component="div" sx={{ mt: 1 }}>
  //       <br />
  //       <strong>Description:</strong> {data.desc}
  //       <br />
       
  //     </Typography>
  //   );
  // }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        
          {renderAlignment()}
      </Typography>
    </div>
  );
}
