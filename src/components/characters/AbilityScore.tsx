import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Container } from "@mui/material";

// Define a type for the component props
interface AbilityScoresProps {
  ability: string;
}

const AbilityScores: React.FC<AbilityScoresProps> = ({ ability }) => {
  const [selectedAbilityScore, setSelectedAbilityScore] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shortAbilityName = ability.substring(0, 3).toLowerCase();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/ability-scores")
      .then((response) => response.json())
      .then((data) => {
        setSelectedAbilityScore(
          data.results.find((score: any) => score.index === shortAbilityName)
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, [shortAbilityName]);

  const renderAbilityScoreData = (data: any) => {
    if (!data) return null;

    return (
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        <br />
        <strong>Full Name:</strong> {data.full_name}
        <br />
        <strong>Description:</strong> {data.desc}
      </Typography>
    );
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {selectedAbilityScore && (
        <>
          <Typography variant="h4" component="h2">
            {selectedAbilityScore.name}
          </Typography>
          {renderAbilityScoreData(selectedAbilityScore)}
        </>
      )}
    </Container>
  );
};

export default AbilityScores;
