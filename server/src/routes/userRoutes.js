import express from "express";
import { getLeaderboard, getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;

