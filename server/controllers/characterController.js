const express = require('express');
const router = express.Router();
const Character = require('../models/Character'); // Adjust the path as needed

// Create a new character
router.post('/', async (req, res) => {
    try {
        const character = new Character(req.body);
        await character.save();
        res.status(201).json(character);
    } catch (error) {
        res.status(400).json({ error: 'Could not create character' });
    }
});

// Get a list of all characters
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific character by ID
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a character by ID
router.put('/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a character by ID
router.delete('/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
