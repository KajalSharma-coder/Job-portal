import Resume from "../models/Resume.js";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const latestResume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    user,
    latestResume,
  });
};

export const updateProfile = async (req, res) => {
  const allowedFields = ["name", "bio", "avatar"];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  }).select("-password");

  res.json(user);
};

export const getLeaderboard = async (req, res) => {
  const users = await User.find()
    .select("name email latestResumeScore skills avatar")
    .sort({ latestResumeScore: -1, createdAt: 1 })
    .limit(10);

  res.json(
    users.map((user, index) => ({
      rank: index + 1,
      ...user.toObject(),
    }))
  );
};

