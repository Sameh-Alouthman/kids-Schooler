import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";
import {
  addNewProgress,
  deleteProgress,
  getContentCompletionStatusBreakdown,
  getMostPlayedGames,
  getMyProgress,
  getUserProgress,
  updateProgress,
} from "../Controllers/progressController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getMyProgress)
  .post(protect, admin, addNewProgress)
  .patch(protect, updateProgress);
router.route("/count").get(protect, admin, getContentCompletionStatusBreakdown);
router.route("/count-game").get(protect, admin, getMostPlayedGames);
router
  .route("/:id")
  .get(protect, getUserProgress)
  .delete(protect, admin, deleteProgress);

export default router;
