import asyncHandler from "express-async-handler";
import Story from "../Models/storyModel.js";

// @desc    Add a new story
// @route   POST /api/stories
// @access  Private/Admin
export const addNewStory = asyncHandler(async (req, res) => {
    const newStory = await Story.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        language: req.body.language,
        category: req.body.category,
        pages: req.body.pages,
        section: req.body.section,
    });
    res.status(201).json({
        message: "Story Added Successfully.",
        success: true,
        data: newStory,
    });
});

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
export const getAllStories = asyncHandler(async (req, res) => {
    const stories = await Story.find({});
    res.json(stories);
});

// @desc    Get a story by ID
// @route   GET /api/stories/:id
// @access  Public
export const getStoryById = asyncHandler(async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (story) {
        res.json(story);
    } else {
        res.status(404);
        throw new Error("Story not found");
    }
});

// @desc    Update a story
// @route   PUT /api/stories/:id
// @access  Private/Admin
export const updateStory = asyncHandler(async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (story) {
        story.title = req.body.title || story.title;
        story.description = req.body.description || story.description;
        story.author = req.body.author || story.author;
        story.language = req.body.language || story.language;
        story.category = req.body.category || story.category;
        story.pages = req.body.pages || story.pages;
        story.section = req.body.section || story.section;

        const updatedStory = await story.save();
        res.json(updatedStory);
    } else {
        res.status(404);
        throw new Error("Story not found");
    }
});

// @desc    Delete a story
// @route   DELETE /api/stories/:id
// @access  Private/Admin
export const deleteStory = asyncHandler(async (req, res) => {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (story) {
        res.json({ message: "Story removed" });
    } else {
        res.status(404);
        throw new Error("Story not found");
    }
});

export const countAllStories = asyncHandler(async (req, res) => {
  try {
    const count = await Story.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Server error while counting stories." });
  }
});



// @desc    Number of Stories per Section
// @route   GET /api/stories/count
// @access  Private/Admin

export const getStoriesCountByCategory = asyncHandler(async (req, res) => {
  const result = await Story.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $project: {
        _id: 0,             // remove _id
        category: "$_id",   // rename _id to category
        count: 1            // include count as is
      },
    },
  ]);

  res.json(result);
});



export const getAllStoriesData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalStories = await Story.countDocuments();
    const stories = await Story.find()
      .skip(skip)
      .limit(limit)
      .select("-pages") // exclude pages
      .lean();

    res.json({
      stories,
      totalStories,
      totalPages: Math.ceil(totalStories / limit),
      page,
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Server error fetching stories" });
  }
});