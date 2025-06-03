const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, company, message, rating, image } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required." });
    }
    const newTestimonial = new Testimonial({ name, company, message, rating, image });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: "Failed to save testimonial" });
  }
});

// PUT (update testimonial)
router.put('/:id', async (req, res) => {
  try {
    const { name, company, message, rating, image } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, company, message, rating, image },
      { new: true }
    );
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

module.exports = router;
