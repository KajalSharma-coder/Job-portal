import express from "express";
import {
  getMyResumes,
  getResumeById,
  getResumeInsights,
  uploadAndAnalyzeResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/upload", upload.single("resume"), uploadAndAnalyzeResume);
router.get("/mine", getMyResumes);
router.get("/insights", getResumeInsights);
router.get("/:id", getResumeById);

export default router;

