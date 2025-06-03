const express = require('express');
const router = express.Router();
const Technology = require('../models/Technologies');

// GET all technologies
router.get('/', async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new technology
router.post('/', async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ error: "Name and image are required." });
    }
    const newTech = new Technology({ name, image });
    await newTech.save();
    res.status(201).json(newTech);
  } catch (err) {
    res.status(500).json({ error: "Failed to save technology" });
  }
});

// ✅ PUT (update technology)
router.put('/:id', async (req, res) => {
  try {
    const { name, image } = req.body;
    const updatedTech = await Technology.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );
    res.json(updatedTech);
  } catch (err) {
    res.status(500).json({ error: "Failed to update technology" });
  }
});

// ✅ DELETE technology
router.delete('/:id', async (req, res) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.json({ message: "Technology deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete technology" });
  }
});

module.exports = router;
