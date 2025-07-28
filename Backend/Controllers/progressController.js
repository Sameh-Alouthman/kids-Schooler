import asyncHandler from "express-async-handler";
import Progress from "../Models/progressModel.js";

// @desc    Add a new progress
// @route   POST /api/progresses
// @access  Private/Admin
export const addNewProgress = asyncHandler(async (req, res) => {
  const {
    userId,
    contentId,
    contentType,
    status,
    score,
    startedAt,
    completedAt,
  } = req.body;

  // Validate required fields
  if (!userId || !contentId || !contentType) {
    res.status(400);
    throw new Error("Please provide userId, contentId and contentType");
  }

  // Create new progress
  const progress = await Progress.create({
    user: userId,
    contentId,
    contentType,
    status: status || "To-be-Started",
    score: score || 0,
    startedAt: startedAt || Date.now(),
    completedAt: completedAt || null,
  });

  res.status(201).json({
    message: "Progress added successfully",
    success: true,
    data: progress,
  });
});

// @desc    Get a user progress
// @route   GET /api/progresses/:id
// @access  Private/Teacher/Admin
export const getUserProgress = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const progress = await Progress.find({ user: id })
    .populate("user")
    .populate("contentId");
  console.log(id);
  if (!progress || progress.length === 0) {
    return res.status(404).json({
      message: "No progress found for this user",
      success: false,
      data: [],
    });
  }
  res.json({
    message: "Progress fetched successfully",
    success: true,
    data: progress,
  });
});

// @desc    Get My progress
// @route   GET /api/progresses
// @access  Public
export const getMyProgress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const progress = await Progress.find({ user: userId })
    .populate("contentId");

  if (!progress || progress.length === 0) {
    return res.status(404).json({
      message: "No progress found for your account",
      success: false,
      data: [],
    });
  }

  res.json({
    message: "Your progress fetched successfully",
    success: true,
    data: progress,
  });
});


    // @desc    Update progress
    // @route   GET /api/progresses
    // @access  Private

export const updateProgress = asyncHandler(async (req, res) => {
  const { contentId, contentType, status, score } = req.body;

  if (!contentId || !contentType) {
    res.status(400);
    throw new Error("contentId and contentType are required");
  }

  let progress = await Progress.findOne({
    user: req.user._id,
    contentId,
    contentType,
  });

  if (progress) {
    progress.status = status || progress.status;

    if (score !== undefined) {
      progress.score = score;
    }

    if (progress.status === "In-Progress" && !progress.startedAt) {
      progress.startedAt = new Date();
    }

    if (progress.status === "Completed" && !progress.completedAt) {
      progress.completedAt = new Date();
    }

    await progress.save();
  } else {
    progress = await Progress.create({
      user: req.user._id,
      contentId,
      contentType,
      status: status || "To-be-Started",
      score: score || 0,
      startedAt: status === "In-Progress" ? new Date() : null,
      completedAt: status === "Completed" ? new Date() : null,
    });
  }

  res.status(200).json({
    message: "Progress updated successfully",
    success: true,
    data: progress,
  });
});


// @desc    Delete a progress
// @route   DELETE /api/progress/:id
// @access  Private/Admin
export const deleteProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.findByIdAndDelete(req.params.id);

  if (progress) {
    res.json({ message: "progress removed" });
  } else {
    res.status(404);
    throw new Error("progress not found");
  }
});

// @desc   GET Content Completion Status
// @route   GET /api/progress/count
// @access  Private/Admin

export const getContentCompletionStatusBreakdown = asyncHandler(async (req, res) => {
  const result = await Progress.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1
      }
    }
  ]);

  res.json(result);
});


// @desc    Get most played games with play count 
// @route   GET /api/progress/games-count
// @access  Private/Admin

export const getMostPlayedGames = asyncHandler(async (req, res) => {
  const result = await Progress.aggregate([
    { $match: { contentType: "Game" } },
    {
      $group: {
        _id: "$contentId",
        playCount: { $sum: 1 }
      }
    },
    { $sort: { playCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "games",
        localField: "_id",
        foreignField: "_id",
        as: "game"
      }
    },
    { $unwind: "$game" },
    {
      $project: {
        _id: 0,
        gameId: "$game._id",
        gameName: "$game.name",
        playCount: 1
      }
    }
  ]);

  res.json(result);
});