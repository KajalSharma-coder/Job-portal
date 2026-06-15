import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { body } from "express-validator";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || undefined);

export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const googleValidation = [
  body("token").optional().isString(),
  body("email").optional().isEmail(),
  body("name").optional().isString(),
];

const buildAuthPayload = (user) => ({
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio,
    skills: user.skills,
    latestResumeScore: user.latestResumeScore,
  },
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local",
  });

  res.status(201).json(buildAuthPayload(user));
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(buildAuthPayload(user));
};

export const googleAuth = async (req, res) => {
  const { token, email, name, avatar } = req.body;
  let profile = null;

  if (process.env.GOOGLE_CLIENT_ID && token) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    profile = ticket.getPayload();
  } else {
    profile = {
      email,
      name: name || "Google User",
      picture: avatar || "",
    };
  }

  if (!profile?.email) {
    return res.status(400).json({ message: "Unable to verify Google user" });
  }

  let user = await User.findOne({ email: profile.email });
  if (!user) {
    user = await User.create({
      name: profile.name || "Google User",
      email: profile.email,
      avatar: profile.picture || "",
      provider: "google",
    });
  }

  res.json(buildAuthPayload(user));
};
