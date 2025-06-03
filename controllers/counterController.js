const Counter = require("../models/Counter");

// GET all counters
exports.getAllCounters = async (req, res) => {
  try {
    const counters = await Counter.find();
    res.status(200).json(counters);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch counters", error });
  }
};

// POST: Create a new counter (optional for admin panel)
exports.createCounter = async (req, res) => {
  try {
    const newCounter = new Counter(req.body);
    await newCounter.save();
    res.status(201).json(newCounter);
  } catch (error) {
    res.status(400).json({ message: "Failed to create counter", error });
  }
};

// PUT: Update a counter by ID
exports.updateCounter = async (req, res) => {
  try {
    const updatedCounter = await Counter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCounter) {
      return res.status(404).json({ message: "Counter not found" });
    }
    res.status(200).json(updatedCounter);
  } catch (error) {
    console.error("Error updating counter:", error);
    res.status(500).json({ message: "Failed to update counter", error: error.message });
  }
};

// DELETE: Delete a counter by ID
exports.deleteCounter = async (req, res) => {
  try {
    const deletedCounter = await Counter.findByIdAndDelete(req.params.id);
    if (!deletedCounter) {
      return res.status(404).json({ message: "Counter not found" });
    }
    res.status(200).json({ message: "Counter deleted successfully" });
  } catch (error) {
    console.error("Error deleting counter:", error);
    res.status(500).json({ message: "Failed to delete counter", error: error.message });
  }
};

