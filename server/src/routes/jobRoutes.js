import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  getRecommendations,
  jobValidation,
  updateJob,
} from "../controllers/jobController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/recommendations/mine", protect, getRecommendations);
router.post("/", protect, adminOnly, jobValidation, validate, createJob);
router.put("/:id", protect, adminOnly, jobValidation, validate, updateJob);
router.delete("/:id", protect, adminOnly, deleteJob);

export default router;

