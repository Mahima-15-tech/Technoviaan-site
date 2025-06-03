const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Submit contact form
router.post('/api/contact', async (req, res) => {
  const {
    name, companyName, email, phone, country,
    query, allowCommunication, preferredContact
  } = req.body;

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

// Get all contact form submissions (Admin)
router.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a contact by ID
router.delete('/api/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
