import { useState, useEffect } from "react";
import { Tooltip, TextField, } from "@mui/material";

interface RaceSelectorProps {
  selectedRace: string;
  onRaceChange: (race: string) => void;
}

const RaceSelector: React.FC<RaceSelectorProps> = ({
  selectedRace,
  onRaceChange,
}) => {
  const [races, setRaces] = useState<string[]>([]);

  // Function to fetch the list of races from the D&D 5e API
  const fetchRaces = () => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((response) => response.json())
      .then((data) => {
        // Extract the race names from the fetched data
        const raceNames = data.results.map(
          (race: { name: string }) => race.name
        );
        setRaces(raceNames); // Set the races state with the fetched data
      })
      .catch((error) => console.error("Error fetching races:", error));
  };

  useEffect(() => {
    // Fetch races when the component mounts
    fetchRaces();
    // const races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
  }, []);

  return (
    <Tooltip title={`Selected Race: ${selectedRace}`}>
      <TextField
        fullWidth
        select
        label="Race"
        variant="outlined"
        value={selectedRace}
        onChange={(e) => onRaceChange(e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value=""> </option>
        {races.map((race, index) => (
          <option key={index} value={race}>
            {race}
          </option>
        ))}
      </TextField>
    </Tooltip>
  );
};

export default RaceSelector;
