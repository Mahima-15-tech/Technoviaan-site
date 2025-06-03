// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// 🔹 GET: Get the currently active event
router.get('/active-event', async (req, res) => {
  try {
    const event = await Event.findOne({ active: true });
    res.json(event || null);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching active event' });
  }
});

// 🔹 GET: Get all events
router.get('/all-events', async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// 🔹 POST: Create a new event
router.post('/add-event', async (req, res) => {
  try {
    const { title, imageUrl, active } = req.body;

    // If active is true, deactivate all others
    if (active) {
      await Event.updateMany({}, { active: false });
    }

    const newEvent = new Event({ title, imageUrl, active });
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// 🔹 PUT: Update an event by ID
router.put('/update-event/:id', async (req, res) => {
  try {
    const { title, imageUrl, active } = req.body;

    if (active) {
      await Event.updateMany({}, { active: false }); // Deactivate others
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, active },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// 🔹 DELETE: Delete an event by ID
router.delete('/delete-event/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
