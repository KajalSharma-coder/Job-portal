import express from "express";
import {
  googleAuth,
  googleValidation,
  login,
  loginValidation,
  signup,
  signupValidation,
} from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.post("/google", googleValidation, validate, googleAuth);

export default router;

