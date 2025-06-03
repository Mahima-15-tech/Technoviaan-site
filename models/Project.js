// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  imageUrl: String,
 
});

module.exports = mongoose.model('Project', projectSchema);
