import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";
import {
    addNewLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    getLessonsCountBySubject,
    countAllLessons,
    getAllLessonsData,
} from "../Controllers/lessonController.js";

const router = express.Router();

router.route("/").get(getAllLessons).post(protect, admin, addNewLesson);
router.route("/all").get(getAllLessonsData)
router.route("/count").get(protect,admin,getLessonsCountBySubject)
router.route("/countAll").get(protect,admin,countAllLessons)
router
    .route("/:id")
    .get(getLessonById)
    .patch(protect, admin, updateLesson)
    .delete(protect,admin,deleteLesson);
export default router;