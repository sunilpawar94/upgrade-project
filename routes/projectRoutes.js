const express = require('express');
const router = express.Router();
const { createProject, getProjects, applyToProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Create Project (Only Brands)
router.post('/', protect, createProject);

// Get All Projects (For Influencers to Browse)
router.get('/', protect, getProjects);

// Apply to a Project (For Influencers)
router.put('/apply/:id', protect, applyToProject);

module.exports = router;
