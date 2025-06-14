const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactroutes');
const heroRoutes = require('./routes/hero'); 
const counterRoutes = require("./routes/counterRoutes");
const technologiesRoutes = require("./routes/technologiesRoutes");
const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const serviceRoutes = require('./routes/serviceRoutes')
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');


const app = express();

app.use(cors({
  origin: ['http://localhost:5173','https://technoviaan.com'], // or the port where your frontend runs
  credentials: true
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', authRoutes);
app.use('/', contactRoutes); 
app.use('/api/hero', heroRoutes);
app.use("/api/counters", counterRoutes);
app.use("/api/technologies", technologiesRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);





// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
  const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
});
