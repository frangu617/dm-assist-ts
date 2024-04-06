import React, { useState, useEffect } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface Rule {
  index: string;
  name: string;
}

interface RuleDetails {
  index: string;
  name: string;
  desc: string; // Assuming 'desc' is a string. Adjust as needed based on the actual data structure
}

const RulesSearch: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState<string>("");
  const [selectedRule, setSelectedRule] = useState<RuleDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/rule-sections")
      .then((response) => response.json())
      .then((data) => {
        setRules(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedRuleIndex) {
      fetchRuleDetails(selectedRuleIndex);
    }
  }, [selectedRuleIndex]);

  const fetchRuleDetails = (index: string) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/rule-sections/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedRule(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleRuleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRuleIndex(event.target.value as string);
  };

  const renderRuleData = (data: RuleDetails) => {
    if (!data || !data.desc) return null;

    const htmlContent = marked(data.desc) as string;
    const sanitizedContent = DOMPurify.sanitize(htmlContent);

    return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="rule-select-label">Select Rule</InputLabel>
        <Select
          labelId="rule-select-label"
          id="rule-select"
          value={selectedRuleIndex}
          label="Select Rule"
          onChange={handleRuleChange}
        >
          {rules.map((rule, index) => (
            <MenuItem key={index} value={rule.index}>
              {rule.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: "auto" }}>
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {selectedRule && renderRuleData(selectedRule)}
        </Paper>
      </Box>
    </Container>
  );
};

export default RulesSearch;
