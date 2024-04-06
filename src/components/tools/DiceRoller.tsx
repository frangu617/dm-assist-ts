// DiceRoller.js
import React, { useState } from 'react';
import { Button, Grid, Card, CardContent } from '@mui/material';

// Function to roll a specified number of dice with a given number of sides
function rollDice(numberOfDice: number, numberOfSides: number) {
    const results = [];

    for (let i = 0; i < numberOfDice; i++) {
        const roll = Math.floor(Math.random() * numberOfSides) + 1; // Roll a die (random number between 1 and numberOfSides)
        results.push(roll);
    }

    return results;
}

// Function to roll a d4
export function rollD4(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 4);
}

// Function to roll a d6
export function rollD6(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 6);
}

// Function to roll a d8
export function rollD8(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 8);
}

// Function to roll a d10
export function rollD10(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 10);
}

// Function to roll a d12
export function rollD12(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 12);
}

// Function to roll a d20
export function rollD20(numberOfDice: number): number[] {
    return rollDice(numberOfDice, 20);
}



const DiceRoller: React.FC = () => {
  // State variables with TypeScript types
  const [numberOfD4DiceToRoll, setNumberOfD4DiceToRoll] = useState<number>(1);
  const [d4DiceRollResults, setD4DiceRollResults] = useState<number[]>([]);
  const [numberOfD6DiceToRoll, setNumberOfD6DiceToRoll] = useState<number>(1);
  const [d6DiceRollResults, setD6DiceRollResults] = useState<number[]>([]);
  const [numberOfD8DiceToRoll, setNumberOfD8DiceToRoll] = useState<number>(1);
  const [d8DiceRollResults, setD8DiceRollResults] = useState<number[]>([]);
  const [numberOfD10DiceToRoll, setNumberOfD10DiceToRoll] = useState<number>(1);
  const [d10DiceRollResults, setD10DiceRollResults] = useState<number[]>([]);
  const [numberOfD12DiceToRoll, setNumberOfD12DiceToRoll] = useState<number>(1);
  const [d12DiceRollResults, setD12DiceRollResults] = useState<number[]>([]);
  const [numberOfD20DiceToRoll, setNumberOfD20DiceToRoll] = useState<number>(1);
  const [d20DiceRollResults, setD20DiceRollResults] = useState<number[]>([]);

  const handleD4RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD4(numberOfD4DiceToRoll); // For example, rollD6 or rollD20
    setD4DiceRollResults(results); // Store the results in state
  };
  const handleD6RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD6(numberOfD6DiceToRoll); // For example, rollD6 or rollD20
    setD6DiceRollResults(results); // Store the results in state
  };
  const handleD8RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD8(numberOfD8DiceToRoll); // For example, rollD6 or rollD20
    setD8DiceRollResults(results); // Store the results in state
  };
  const handleD10RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD10(numberOfD10DiceToRoll); // For example, rollD6 or rollD20
    setD10DiceRollResults(results); // Store the results in state
  };
  const handleD12RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD12(numberOfD12DiceToRoll); // For example, rollD6 or rollD20
    setD12DiceRollResults(results); // Store the results in state
  };
  const handleD20RollDice = () => {
    // Determine which dice to roll based on user input
    const results = rollD20(numberOfD20DiceToRoll); // For example, rollD6 or rollD20
    setD20DiceRollResults(results); // Store the results in state
  };

  return (
    <div>
      <h3>Dice Roller:</h3>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} lg={4}>
          <div className="d4-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D4:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D4 to roll"
                    type="number"
                    value={numberOfD4DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD4DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD4RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d4DiceRollResults.length > 0 && (
                  <p>Roll Results: {d4DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>

        <Grid item xs={6} sm={4} lg={4}>
          <div className="d6-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D6:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D6 to roll"
                    type="number"
                    value={numberOfD6DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD6DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD6RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d6DiceRollResults.length > 0 && (
                  <p>Roll Results: {d6DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <div className="d8-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D8:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D8 to roll"
                    type="number"
                    value={numberOfD8DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD8DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD8RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d8DiceRollResults.length > 0 && (
                  <p>Roll Results: {d8DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>

        <Grid item xs={6} sm={4} lg={4}>
          <div className="d10-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D10:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D6 to roll"
                    type="number"
                    value={numberOfD10DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD10DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD10RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d10DiceRollResults.length > 0 && (
                  <p>Roll Results: {d10DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>

        <Grid item xs={6} sm={4} lg={4}>
          <div className="d12-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D12:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D12 to roll"
                    type="number"
                    value={numberOfD12DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD12DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD12RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d12DiceRollResults.length > 0 && (
                  <p>Roll Results: {d12DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>

        <Grid item xs={6} sm={4} lg={4}>
          <div className="d20-roller">
            {/* Input field to specify the number of dice to roll */}

            <Card>
              <CardContent>
                <div>
                  <label htmlFor="numberOfDiceToRoll">D20:</label>
                  <input
                    style={{ marginLeft: "10px" }}
                    placeholder="Number of D6 to roll"
                    type="number"
                    value={numberOfD20DiceToRoll}
                    min={1}
                    onChange={(e) =>
                      setNumberOfD20DiceToRoll(Number(e.target.value))
                    }
                  />
                  <Button variant="contained" onClick={handleD20RollDice}>
                    Roll Dice
                  </Button>
                </div>

                {/* Display the results of the dice roll */}
                {d20DiceRollResults.length > 0 && (
                  <p>Roll Results: {d20DiceRollResults.join(", ")}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DiceRoller;