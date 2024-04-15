const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    race: String,
    class: String,
    level: {
        type: Number,
        default: 1, // Default level is 1
    },
    alignment: String,
    background: String,
    abilities: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number,
    },
    skills: [String],
    feats: [String],
    hitPoints: {
        type: Number,
        default: 10, // Default HP is 10
    },
    hitDice: String,
    inventory: [String],
    description: String,
});

const character = mongoose.model('Character', characterSchema);

module.exports = character;
