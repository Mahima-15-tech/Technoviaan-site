const express = require("express");
const router = express.Router();
const counterController = require("../controllers/counterController");

// GET all counters
router.get("/", counterController.getAllCounters);

// POST new counter (optional, for admin use)
router.post("/", counterController.createCounter);

router.put("/:id", counterController.updateCounter);

router.delete("/:id", counterController.deleteCounter);

module.exports = router;
