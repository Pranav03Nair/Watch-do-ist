import type { Request, Response } from "express";
import { User } from "../models/user.model";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ Error: "Email is a required field" });
    }
    if (!password) {
      return res.status(400).json({ Error: "Password is a required field" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User already exists. Please Sign In" });
    }

    const user = await User.create({ email, password });
    const token = signToken(user._id.toString());

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ Error: "Email is a required field" });
    }
    if (!password) {
      return res.status(400).json({ Error: "Password is a required field" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = signToken(user._id.toString());
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
