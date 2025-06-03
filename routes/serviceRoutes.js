const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// ✅ GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ POST add full service
router.post('/', async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const newService = new Service(req.body);
    const saved = await newService.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Save Error:", error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ GET service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update service by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json({ message: 'Service updated successfully', service: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE service by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
