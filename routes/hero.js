const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
// const verifyToken = require('../middleware/auth');

// GET: Get all heroes
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.find();
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching heroes', error: err });
  }
});

// GET: Get hero by ID
router.get('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: 'Hero not found' });
    }
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hero', error: err });
  }
});

// POST: Create a new hero
router.post('/', async (req, res) => {
  const { title, highlight, description, image } = req.body;
const newHero = new Hero({ title, highlight, description, image });

  try {
    await newHero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(500).json({ message: 'Error creating hero', error: err });
  }
});

// PUT: Update a hero by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHero) {
      return res.status(404).json({ message: 'Hero not found' });
    }
    res.status(200).json(updatedHero);
  } catch (err) {
    res.status(500).json({ message: 'Error updating hero', error: err });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Hero.countDocuments(); // ⚠️ No filters
    res.json({ count });
  } catch (error) {
    console.error("Error counting heroes:", error);
    res.status(500).json({ error: "Failed to count heroes" });
  }
});

// DELETE: Delete a hero by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    if (!deletedHero) {
      return res.status(404).json({ message: 'Hero not found' });
    }
    res.status(200).json({ message: 'Hero deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting hero', error: err });
  }
});





module.exports = router;

