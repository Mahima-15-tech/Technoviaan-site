const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  icon: String,
  link: String,
  shortDescription: String,
  heroImage: String,
  detailedDescription: String,
  services: [String],
  advantages: [String],
  solutions: [
    {
      title: String,
      desc: String,
      img: String,
    }
  ],
  highlights: [
    {
      icon: String,
      title: String,
      desc: String,
    }
  ],
  process: [
    {
      title: String,
      description: String,
    }
  ],
  faqs: [
    {
      question: String,
      answer: String,
    }
  ]
});

module.exports = mongoose.model('Service', serviceSchema);
