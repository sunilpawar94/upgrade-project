const Project = require('../models/Project');

// Create Project (Brands Only)
const createProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        const project = await Project.create({
            title,
            description,
            brand: req.user.id,
        });

        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Projects (For Influencers)
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ status: 'Open' });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Apply to Project (Influencers Only)
const applyToProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.influencersApplied.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already applied to this project' });
        }

        project.influencersApplied.push(req.user.id);
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createProject, getProjects, applyToProject };
