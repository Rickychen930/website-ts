/**
 * Admin Auth Middleware - Protects admin routes with ADMIN_SECRET
 */

import { Request, Response, NextFunction } from "express";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!ADMIN_SECRET) {
    res.status(503).json({
      error: "Admin not configured",
      message: "ADMIN_SECRET is not set on the server.",
    });
    return;
  }

  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : (req.body?.token as string | undefined);

  if (!token || token !== ADMIN_SECRET) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing admin token.",
    });
    return;
  }

  next();
};
