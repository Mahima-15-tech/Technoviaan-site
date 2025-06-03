const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  title: String,
  number: String,
  suffix: String, 
  
});

module.exports = mongoose.model('Counter', counterSchema);
