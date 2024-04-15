import { useState, useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
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
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(-1);
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
    if (selectedClassIndex !== -1) {
      fetchClassDetails(classes[selectedClassIndex].index);
    }
  }, [selectedClassIndex, classes]);

  const fetchClassDetails = (classIndex: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}`)
      .then((response) => response.json())
      .then((data: ClassDetails) => {
        setClassDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClassIndex(Number(event.target.value));
  };

  const displayProficiencies = (proficiencies: Proficiency[]) => {
    return proficiencies.map((proficiency, index) => (
      <Typography key={index} style={{ textAlign: "left" }}>
        {proficiency.name}
      </Typography>
    ));
  };

  const displayEquipment = (
    equipment: { quantity: number; equipment: Equipment }[]
  ) => {
    return equipment.map((item, index) => (
      <Typography
        key={index}
        style={{ textAlign: "left" }}
      >{`${item.quantity}x ${item.equipment.name}`}</Typography>
    ));
  };

  const displayEquipmentOptions = (equipmentOptions: EquipmentOption[]) => {
    return equipmentOptions.map((option, index) => (
      <Typography key={index} style={{ textAlign: "left" }}>
        {option.desc}
      </Typography>
    ));
  };

  const displaySpellcasting = (spellcasting?: Spellcasting) => {
    if (!spellcasting) return null;

    return (
      <Box mb={2} sx={{ textAlign: "left" }}>
        <Typography variant="h4">Spellcasting</Typography>
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
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <FormControl fullWidth>
        <InputLabel id="class-select-label">Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClassIndex !== -1 ? selectedClassIndex.toString() : ""}
          label="Class"
          onChange={handleClassChange}
        >
          {classes.map((classData, index) => (
            <MenuItem key={index} value={index.toString()}>
              {classData.name}
            </MenuItem>
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
                <Typography variant="h4" style={{ textAlign: "left" }}>
                  Proficiencies
                </Typography>
                <br />
                {displayProficiencies(classDetails.proficiencies)}
                <br />
              </Box>
              <Box mt={2}>
                <Typography variant="h4" style={{ textAlign: "left" }}>
                  Starting Equipment
                </Typography>
                <br />
                {displayEquipment(classDetails.starting_equipment)}
                {displayEquipmentOptions(
                  classDetails.starting_equipment_options
                )}
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
