import express from "express";
import {
  addNewQuizz,
  countAllQuizzes,
  deleteQuizz,
  getAllQuizzes,
  getAllQuizzesData,
  getQuizzById,
  updateQuizz,
} from "../Controllers/quizzController.js";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";

const router = express.Router();
router.route("/all").get(protect, admin, getAllQuizzesData);
router
  .route("/")
  .get(protect, admin, getAllQuizzes)
  .post(protect, admin, addNewQuizz);
router.route("/countAll").get(protect, admin, countAllQuizzes);
router
  .route("/:id")
  .get(getQuizzById)
  .patch(protect, admin, updateQuizz)
  .delete(protect, admin, deleteQuizz);
export default router;
