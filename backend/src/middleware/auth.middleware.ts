import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";

import { env }
from "../config/env";

export const protect =
(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  const token =
    authHeader.split(" ")[1];

  try {

    const decoded =
      jwt.verify(
        token,
        env.JWT_SECRET
      ) as { id: string };

    req.user = {
      id: decoded.id
    };

    next();

  } catch {

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};