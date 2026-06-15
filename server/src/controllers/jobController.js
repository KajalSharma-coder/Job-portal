import { body } from "express-validator";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import defaultJobs from "../data/defaultJobs.js";
import { buildRecommendations } from "../services/recommendationService.js";

export const jobValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("skills").isArray({ min: 1 }).withMessage("At least one skill is required"),
];

export const ensureSeedJobs = async () => {
  const count = await Job.countDocuments();
  if (!count) {
    await Job.insertMany(defaultJobs);
  }
};

export const getJobs = async (req, res) => {
  await ensureSeedJobs();
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};

export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  await job.deleteOne();
  res.json({ message: "Job deleted successfully" });
};

export const getRecommendations = async (req, res) => {
  await ensureSeedJobs();
  const latestResume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  if (!latestResume) {
    return res.status(404).json({ message: "Upload a resume to get job recommendations" });
  }

  const jobs = await Job.find();
  const result = buildRecommendations(latestResume, jobs);
  res.json(result);
};

