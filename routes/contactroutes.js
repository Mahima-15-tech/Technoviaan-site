const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/api/contact', async (req, res) => {
  const {
    name, companyName, email, phone, country,
    query, allowCommunication, preferredContact
  } = req.body;

  // Validation
  if (!name || !companyName || !email || !phone || !country || !query) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (typeof allowCommunication !== 'boolean') {
    return res.status(400).json({ error: 'Communication consent must be true/false' });
  }

  if (!['yes', 'no'].includes(preferredContact)) {
    return res.status(400).json({ error: 'Preferred contact must be yes or no' });
  }

  try {
    const newContact = new Contact({
      name,
      companyName,
      email,
      phone,
      country,
      query,
      allowCommunication,
      preferredContact
    });

    await newContact.save();
    return res.status(201).json({ success: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
