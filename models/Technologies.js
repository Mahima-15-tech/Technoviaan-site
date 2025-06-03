const mongoose = require('mongoose');

const technologiesSchema = new mongoose.Schema({
  name: String,
  image: String 
});

module.exports = mongoose.model('Technology', technologiesSchema);
