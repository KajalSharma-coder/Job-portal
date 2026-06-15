import Resume from "../models/Resume.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { analyzeResumeText, extractTextFromFile } from "../services/resumeAnalysisService.js";
import { buildRecommendations } from "../services/recommendationService.js";

export const uploadAndAnalyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const extractedText = await extractTextFromFile(req.file);
  const analysis = await analyzeResumeText(extractedText);

  const resume = await Resume.create({
    user: req.user._id,
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    extractedText,
    ...analysis,
  });

  await User.findByIdAndUpdate(req.user._id, {
    skills: analysis.keywords,
    latestResumeScore: analysis.score,
  });

  res.status(201).json(resume);
};

export const getMyResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(resumes);
};

export const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json(resume);
};

export const getResumeInsights = async (req, res) => {
  const latestResume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  if (!latestResume) {
    return res.status(404).json({ message: "No resume found for this user" });
  }

  const jobs = await Job.find();
  const { recommendations, resumeCluster } = buildRecommendations(latestResume, jobs);

  res.json({
    resume: latestResume,
    recommendations,
    resumeCluster,
    regressionSeries: recommendations.slice(0, 6).map((job) => ({
      job: job.title,
      suitabilityScore: job.suitabilityScore,
      matchPercentage: job.matchPercentage,
    })),
    clusteringSeries: recommendations.slice(0, 6).map((job, index) => ({
      name: job.title,
      x: index + 1,
      y: job.matchPercentage,
      cluster: job.cluster,
    })),
  });
};

