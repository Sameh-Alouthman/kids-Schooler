import express from "express";
import {
  createBadgeDefinition,
  getBadgeDefinitions,
  getBadgeDefinitionById,
  updateBadgeDefinition,
  deleteBadgeDefinition,
} from "../Controllers/badgeController.js";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getBadgeDefinitions)
  .post(protect, admin, createBadgeDefinition);
router
  .route("/:id")
  .get(getBadgeDefinitionById)
  .patch(protect, admin, updateBadgeDefinition)
  .delete(protect, admin, deleteBadgeDefinition);

export default router;
