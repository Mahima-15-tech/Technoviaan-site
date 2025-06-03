// models/Testimonial.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  company: String,
  message: String,
  rating: Number, // optional, for stars
  image: String, // image URL or file path
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
