import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
// import DOMPurify from 'dompurify';
// import { marked } from 'marked';

interface Monster {
  index: string;
  name: string;
  img?: string;
  size?: string;
  type?: string;
  subtype?: string;
  alignment?: string;
  armor_class?: number;
  hit_points?: number;
  hit_dice?: string;
  speed?: Record<string, number>;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  damage_vulnerabilities?: string[];
  damage_resistances?: string[];
  damage_immunities?: string[];
  condition_immunities?: string[];
}

interface MonsterDetails extends Monster {
  description?: string;
  challenge_rating?: number;
  xp?: number;
  source?: string;
  [key: string]: any;
  
}
const MonsterSearch: React.FC = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<MonsterDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/monsters")
      .then((response) => response.json())
      .then((data) => {
        setMonsters(
          data.results.map((monster: Monster) => ({
            ...monster,
            img: monster.img || undefined,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  const fetchMonsterDetails = (index: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedMonster(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleMonsterChange = (event: SelectChangeEvent<string>) => {
    const index = event.target.value; // Cast to string
    fetchMonsterDetails(index);
  };

  const formatValue = (value:any, level = 0): React.ReactNode => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Box key={index} sx={{ pl: level * 2 }}>
          {formatValue(item, level + 1)}
        </Box>
      ));
    } else if (typeof value === "object" && value !== null) {
      return (
        <Card variant="outlined" sx={{ mb: 2, ml: level * 2 }}>
          <CardContent>
            {Object.entries(value).map(([key, val], i) => (
              <Typography key={i} variant="body2" component="div">
                <strong>{key}:</strong> {formatValue(val, level + 1)}
              </Typography>
            ))}
          </CardContent>
        </Card>
      );
    } else {
      return value.toString();
    }
  };

  const renderMonsterData = (data: MonsterDetails | null) : React.ReactNode => {
    if (!data) return null;

    return Object.entries(data).map(([key, value], i) => (
      <Typography key={i} variant="body2" component="div" sx={{ mt: 1 }}>
        <strong>{key}:</strong> {formatValue(value)}
      </Typography>
    ));
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="monster-select-label">Select Monster</InputLabel>
        <Select
          labelId="monster-select-label"
          id="monster-select"
          value={selectedMonster ? selectedMonster.index : ""}
          label="Select Monster"
          onChange={handleMonsterChange}
        >
          {monsters.map((monster, index) => (
            <MenuItem key={index} value={monster.index}>
              {monster.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: "auto" }}>
          {selectedMonster && (
            <>
              <Typography variant="h5" component="h2">
                {selectedMonster.name}
              </Typography>
              {renderMonsterData(selectedMonster)}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default MonsterSearch;
