import express from "express";
import {
  countAllUsers,
  deleteUserData,
  deleteUserForAdmin,
  getAllUsersData,
  getUserProfile,
  updateUserData,
  updateUserPassword,
} from "../Controllers/userController.js";
import { protect } from "../Middleware/authMiddleware.js";
import { admin } from "../Middleware/adminMiddleware.js";

const router = express.Router();

router.route("/all").get(protect, admin, getAllUsersData);
router.route("/count").get(protect, admin, countAllUsers);
router.route("/profile").get(protect, getUserProfile);
router.route("/editProfile").patch(protect, updateUserData);
router.route("/editPassword").patch(protect, updateUserPassword);
router.route("/delete").delete(protect, deleteUserData);
router.route("/delete/:id").delete(protect, admin, deleteUserForAdmin);

export default router;
