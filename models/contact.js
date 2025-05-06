const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  query: { type: String, required: true },
  allowCommunication: { type: Boolean, required: true },
  preferredContact: { type: String, enum: ['yes', 'no'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
