const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  shortContent: String,    // For blog cards
  fullContent: String,     // For detailed view
  thumbnailImage: String,  // For card view
  bannerImage: String,     // For detailed view
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.pre("save", function (next) {
  if (this.slug && !this.link) {
    this.link = `/blogspages/${this.slug}`;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
