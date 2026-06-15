import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import User from "../models/User.js";

export const getAdminOverview = async (req, res) => {
  const [userCount, resumeCount, jobCount, topUsers] = await Promise.all([
    User.countDocuments(),
    Resume.countDocuments(),
    Job.countDocuments(),
    User.find().sort({ latestResumeScore: -1 }).limit(5).select("name latestResumeScore"),
  ]);

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .select("name email role latestResumeScore createdAt");

  res.json({
    metrics: {
      userCount,
      resumeCount,
      jobCount,
    },
    topUsers,
    recentUsers,
  });
};

