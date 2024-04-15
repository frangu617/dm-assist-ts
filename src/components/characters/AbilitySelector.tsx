import React from "react";
import { Grid, TextField, Tooltip } from "@mui/material";
import AbilityScores from "./AbilityScore";

// Define a type for the component props
interface AbilitiesProps {
  abilities: { [key: string]: number }; // Object with string keys and number values
  onAbilityChange: (ability: string, value: number) => void; // Function that takes an ability name and a number value and returns void
}

const Abilities: React.FC<AbilitiesProps> = ({
  abilities,
  onAbilityChange,
}) => {
  return (
    <Grid item xs={12}>
      <h3>Abilities</h3>
      <Grid container spacing={2}>
        {Object.keys(abilities).map((ability, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Tooltip
              title={
                <span>
                  <AbilityScores ability={ability} />
                </span>
              }
              placement="top"
            >
              <TextField
                fullWidth
                label={ability.charAt(0).toUpperCase() + ability.slice(1)} // Capitalize first letter
                type="number"
                variant="outlined"
                value={abilities[ability]}
                onChange={(e) =>
                  onAbilityChange(ability, parseInt(e.target.value))
                }
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Abilities;
