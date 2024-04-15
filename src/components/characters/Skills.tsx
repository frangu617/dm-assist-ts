import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Container } from "@mui/material";

interface Skill {
  index: string;
  name: string;
  desc: string;
  ability_score: {
    name: string;
  };
}

interface SkillsProps {
  skill: { index: string };
}

const Skills: React.FC<SkillsProps> = ({ skill }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let shortSkillName = skill.index;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/skills")
      .then((response) => response.json())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (shortSkillName) {
      fetchSkillDetails(shortSkillName);
    }
  }, [shortSkillName]);

  const fetchSkillDetails = (name: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/skills/${name}`)
      .then((response) => response.json())
      .then((data: Skill) => {
        setSelectedSkill(data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const renderSkillData = (data: Skill | null) => {
    if (!data) return null;

    return (
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        <br />
        <strong>Description:</strong> {data.desc}
        <br />
        <br />
        <strong>Ability Modifier:</strong> {data.ability_score?.name}
      </Typography>
    );
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {selectedSkill && (
        <>
          <Typography variant="h4" component="h2">
            {selectedSkill.name}
          </Typography>
          {renderSkillData(selectedSkill)}
        </>
      )}
    </Container>
  );
};

export default Skills;
