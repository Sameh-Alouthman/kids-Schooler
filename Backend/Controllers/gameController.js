import asyncHandler from "express-async-handler";
import Game from "../Models/gameModel.js";

// @desc    Add a new game
// @route   POST /api/games
// @access  Private/Admin
export const addNewGame = asyncHandler(async (req, res) => {
    const newGame = await Game.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
    });
    res.status(201).json({
        message: "Game Added Successfully.",
        success: true,
        data: newGame,
    });
});

// @desc    Get all games
// @route   GET /api/games
// @access  Public
export const getAllGames = asyncHandler(async (req, res) => {
    const games = await Game.find({});
    res.json(games);
});

// @desc    Get a game by ID
// @route   GET /api/games/:id
// @access  Public
export const getGameById = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (game) {
        res.json(game);
    } else {
        res.status(404);
        throw new Error("Game not found");
    }
});

// @desc    Update a game
// @route   patch /api/games/:id
// @access  Private/Admin
export const updateGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (game) {
        game.name = req.body.name || game.name;
        game.description = req.body.description || game.description;
        game.category = req.body.category || game.category;

        const updatedGame = await game.save();
        res.json(updatedGame);
    } else {
        res.status(404);
        throw new Error("Game not found");
    }
});

// @desc    Delete a game
// @route   DELETE /api/games/:id
// @access  Private/Admin
export const deleteGame = asyncHandler(async (req, res) => {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (game) {
        res.json({ message: "Game removed" });
    } else {
        res.status(404);
        throw new Error("Game not found");
    }
});

export const getAllGamesData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  try {
    const totalGames = await Game.countDocuments();
    const games = await Game.find()
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      games,
      totalGames,
      totalPages: Math.ceil(totalGames / limit),
      page,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Server error fetching games" });
  }
});
