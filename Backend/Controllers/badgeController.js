import BadgeDefinition from "../Models/badgeDefinitionModel.js"; 

// @desc    Create a new badge definition
// @route   POST /api/badges
// @access  Private/Admin

export const createBadgeDefinition = async (req, res) => {
    const { name, description, image } = req.body;

    try {
        const badgeDefinition = new BadgeDefinition({
            name,
            description,
            image
        });

        const createdBadgeDefinition = await badgeDefinition.save();
        res.status(201).json(createdBadgeDefinition);
    } catch (error) {
        console.error('Error creating badge definition:', error);
        res.status(400).json({ message: error.message });
    }
};


// @desc    Get all badge definitions
// @route   GET /api/badges
// @access  Public
export const getBadgeDefinitions = async (req, res) => {
    try {
        const badgeDefinitions = await BadgeDefinition.find({});
        res.json(badgeDefinitions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a badge definition by ID
// @route   GET /api/badges/:id
// @access  Public
export const getBadgeDefinitionById = async (req, res) => {
    try {
        const badgeDefinition = await BadgeDefinition.findById(req.params.id);

        if (badgeDefinition) {
            res.json(badgeDefinition);
        } else {
            res.status(404).json({ message: "Badge definition not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a badge definition
// @route   PUT /api/badges/:id
// @access  Private/Admin
export const updateBadgeDefinition = async (req, res) => {
    const { name, description, image } = req.body;

    try {
        const badgeDefinition = await BadgeDefinition.findById(req.params.id);

        if (badgeDefinition) {
            badgeDefinition.name = name || badgeDefinition.name;
            badgeDefinition.description = description || badgeDefinition.description;
            badgeDefinition.image = image || badgeDefinition.image;

            const updatedBadgeDefinition = await badgeDefinition.save();
            res.json(updatedBadgeDefinition);
        } else {
            res.status(404).json({ message: "Badge definition not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a badge definition
// @route   DELETE /api/badges/:id
// @access  Private/Admin
export const deleteBadgeDefinition = async (req, res) => {
    try {
        const badgeDefinition = await BadgeDefinition.findByIdAndDelete(req.params.id);

        if (badgeDefinition) {
            res.json({ message: "Badge definition removed" });
        } else {
            res.status(404).json({ message: "Badge definition not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};