const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// ✅ Add new blog (admin panel)
router.post('/add', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get latest 3 blogs
router.get('/latest', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
  res.json(blogs);
});

// ✅ Get all blogs
router.get('/all', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});



router.post('/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a blog by ID
router.put('/:id', async (req, res) => {
  const { title, slug, shortContent, fullContent, thumbnailImage, bannerImage } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        shortContent,
        fullContent,
        thumbnailImage,
        bannerImage,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get blog by slug
// ✅ Slug-based dynamic blog route (move this above :id routes for safety too)
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
