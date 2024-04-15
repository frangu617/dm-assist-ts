import { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Tooltip,
  CircularProgress,
  Typography,
} from "@mui/material";

interface Skill {
  index: number;
  name: string;
}

interface SkillsSelectorProps {
  onSkillsChange: (selectedSkills: Skill[]) => void;
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({ onSkillsChange }) => {
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/skills")
      .then((response) => response.json())
      .then((data: { results: Skill[] }) => {
        setSkillsList(data.results);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  const handleSkillChange = (skill: Skill) => {
    // Determine if the skill is already selected
    const currentIndex = selectedSkills.findIndex(
      (selectedSkill) => selectedSkill.index === skill.index
    );
    const newSelectedSkills = [...selectedSkills];

    // If the skill is already selected, remove it; otherwise, add it
    if (currentIndex === -1) {
      newSelectedSkills.push(skill);
    } else {
      newSelectedSkills.splice(currentIndex, 1);
    }

    setSelectedSkills(newSelectedSkills);
    onSkillsChange(newSelectedSkills); // Pass the new array of selected skills back to the parent component
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <h3>Skills</h3>
      <Grid container spacing={2}>
        {skillsList.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Tooltip title={skill.name} placement="top">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      selectedSkills.findIndex(
                        (selectedSkill) => selectedSkill.index === skill.index
                      ) !== -1
                    }
                    onChange={() => handleSkillChange(skill)}
                  />
                }
                label={skill.name}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SkillsSelector;
