import {
  Request,
  Response
} from "express";

import bcrypt from "bcryptjs";

import User from "../models/User";

import {
  generateToken
} from "../utils/generateToken";

import {
  asyncHandler
} from "../middleware/asyncHandler";

import {
  AppError
} from "../errors/AppError";

export const register =
asyncHandler(
async (
  req: Request,
  res: Response
) => {

  const {
    email,
    password
  } = req.body;

  const existingUser =
    await User.findOne({
      email
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );

  const user =
    await User.create({
      email,
      password:
        hashedPassword
    });

  const token =
    generateToken(
      user._id.toString()
    );

  res.status(201).json({
    success: true,
    token,

    user: {
      id: user._id,
      email: user.email
    }
  });
});

export const login =
asyncHandler(
async (
  req: Request,
  res: Response
) => {

  const {
    email,
    password
  } = req.body;

  const user =
    await User.findOne({
      email
    });

  if (!user) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const valid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!valid) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const token =
    generateToken(
      user._id.toString()
    );

  res.json({
    success: true,
    token,

    user: {
      id: user._id,
      email: user.email
    }
  });
});