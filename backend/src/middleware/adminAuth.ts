/**
 * Admin Auth Middleware - Protects admin routes with token from DB (set on login)
 */

import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../models/Admin";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : (req.body?.token as string | undefined);

  if (!token) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing admin token.",
    });
    return;
  }

  const admin = await AdminModel.findOne({ token }).lean();
  if (!admin) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing admin token.",
    });
    return;
  }

  next();
};
