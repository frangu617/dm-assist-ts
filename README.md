# DM Assist
## Milestone Project 3  
### By Francisco Gutierrez

## Overview
Dm Assist is originally an app to create and manage characters.  
This app later evolved to include little tools like a dice roller, in which you input a number of dice  
and based on the type of dice selected, it rolls that many dice with that many sides. Also included was  
a tool to track initiative in battle. You take a character, or player, and their dice roll, and will  
order the player queue based on that.  
Besides those tools, there is also a small reference guide, which includes:
  -Rules
  -Monsters
  -Races
  -Classes

## API and Routes
This app uses the "D&D 5e API", an external API at "https://www.dnd5eapi.co/api/" with different sets  
of data, from which things like abilities, skills, monsters, classes, races, and more are pulled. 
Following that, there are a small number of routes:
  - /api/characters
    - This route manages characters, having the endpoints:
      - "/add" which allows the creation  of a new character,
      - "/" which shows all the characters a player has created,
      - "/:id" with method "GET" which shows a character by ID
      - "/:id" with method "PUT" which allows to edit a character
      - "/:id" with method "DELETE" which deletes a character
  - /api/messages
    - This route is meant to manage direct messages between users, but it hasn't been enabled yet.
  -/users
    - This Route manages new user creation, and current user
      - creates a new user usig "/" "POST" method
      - defines the current user with "/current" endpoint using the "GET" method
  - /auth
  -   This route is used for authentication, which is at endpoint "/login"


## Tech Stack
Please run npm install for the backend folder, separately from the client folder which is the root folder, to run this app. Once npm install completes, start the server separately from the main app. As this is a Vite app, please use npm run dev for the front end, and once you go into the backend folder, npm start, or nodemon or node server.js should work

  #### Frontend:
    Framework: React.js
    Styling: Emotion (React)
    UI Library: Material-UI
    Routing: React Router DOM
    HTTP Client: Axios
    Real-time Communication: Socket.io-client
    D&D API: https://www.dnd5eapi.co/api/
    
  #### Backend:
    Framework: Express.js
    Database: MongoDB (via Mongoose)
    Authentication: JSON Web Tokens (jsonwebtoken)
    Password Hashing: bcrypt
    Middleware: body-parser, cors, method-override
    Real-time Communication: Socket.io
  #### DevOps and Tooling:
    Build Tool: Vite (for frontend), npm scripts (for backend)
    Type Checking: TypeScript (for frontend)
    Linting: ESLint with TypeScript support (for frontend)
    Environment Variables: dotenv (for both frontend and backend)
    Dependency Management: npm


## Future Plans
This app will be grown to include things like conversations between 2 users, group making, assigning group DM  
which will be able to manage different things within groups, and, in the very long run, it will include a  
map maker, which would help DMs create and manage maps for them to use for their games, and so that others can use  
with the creator's permission. Also, the addition of more reference guides, and the addition of an AI chat engine
which will use something like openAI's chat GPT, or Google's Gemini, to help solve rule conflicts.
