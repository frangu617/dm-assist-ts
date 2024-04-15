import { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  SelectChangeEvent,
} from "@mui/material";

interface Proficiency {
  name: string;
}

interface Equipment {
  name: string;
}

interface EquipmentOption {
  desc: string;
}

interface SpellcastingInfo {
  name: string;
  desc: string[];
}

interface Spellcasting {
  info: SpellcastingInfo[];
}

interface ClassDetails {
  name: string;
  hit_die: number;
  proficiencies: Proficiency[];
  starting_equipment: { quantity: number; equipment: Equipment }[];
  starting_equipment_options: EquipmentOption[];
  spellcasting?: Spellcasting;
}

function DnDClasses() {
  const [classes, setClasses] = useState<{ name: string; index: string }[]>([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState<string>("");
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedClassIndex) {
      fetchClassDetails(selectedClassIndex);
    }
  }, [selectedClassIndex]);

  const fetchClassDetails = (classIndex: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}`)
      .then((response) => response.json())
      .then((data) => {
        setClassDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClassIndex(event.target.value);
  };

  const displayComplexData = (value: any, level = 0) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Box key={index} sx={{ pl: level * 2 }}>
          {displayComplexData(item, level + 1)}
        </Box>
      ));
    } else if (typeof value === "object" && value !== null) {
      return (
        <Card variant="outlined" sx={{ mb: 2, ml: level * 2 }}>
          <CardContent>
            {Object.entries(value).map(([key, val], i) => (
              <Typography key={i} variant="body2" component="div">
                <strong>{key}:</strong> {displayComplexData(val, level + 1)}
              </Typography>
            ))}
          </CardContent>
        </Card>
      );
    } else {
      return value.toString();
    }
  };

  const renderClassDetails = (details: ClassDetails) => {
    if (!details) return null;

    return Object.entries(details).map(([key, value], i) => (
      <Typography key={i} variant="body2" component="div" sx={{ mt: 1 }}>
        <strong>{key}:</strong> {displayComplexData(value)}
      </Typography>
    ));
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClassIndex}
          label="Select Class"
          onChange={handleClassChange}
        >
          {classes.map((classData) => (
            <MenuItem key={classData.index} value={classData.index}>
              {classData.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: "auto" }}>
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {classDetails && (
            <>
              <Typography variant="h4" component="h2">
                {classDetails.name}
              </Typography>
              {renderClassDetails(classDetails)}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default DnDClasses;
