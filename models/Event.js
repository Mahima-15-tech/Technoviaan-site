// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', eventSchema);
