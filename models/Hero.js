// models/Hero.js
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: String,
  highlight: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Hero', heroSchema);
