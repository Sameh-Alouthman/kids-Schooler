import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";
import {
  addNewStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
  getStoriesCountByCategory,
  countAllStories,
  getAllStoriesData,
} from "../Controllers/storyController.js";

const router = express.Router();

router.route("/all").get(protect, admin, getAllStoriesData);
router.route("/").get(getAllStories).post(protect, admin, addNewStory);
router.route("/count").get(protect, admin, getStoriesCountByCategory);
router.route("/countAll").get(protect, countAllStories);
router
  .route("/:id")
  .get(protect, getStoryById)
  .patch(protect, admin, updateStory)
  .delete(protect, admin, deleteStory);
export default router;
