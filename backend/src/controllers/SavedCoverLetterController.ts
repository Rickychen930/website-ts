/**
 * Saved Cover Letter Controller - CRUD for different letters per company
 */

import { Request, Response } from "express";
import { SavedCoverLetterModel } from "../models/SavedCoverLetter";

function toItem(d: Record<string, unknown>) {
  const id = (d._id as { toString?: () => string })?.toString?.();
  const { _id, ...rest } = d;
  return {
    ...rest,
    id: id ?? _id,
    createdAt: (d.createdAt as Date)?.toISOString?.() ?? d.createdAt,
    updatedAt: (d.updatedAt as Date)?.toISOString?.() ?? d.updatedAt,
  };
}

export class SavedCoverLetterController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-updatedAt";

      const docs = await SavedCoverLetterModel.find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => toItem(d));
      const total = await SavedCoverLetterModel.countDocuments();

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("SavedCoverLetter list error:", err);
      res.status(500).json({
        error: "Failed to list cover letters",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { companyName, position, jobDescription, bodyText } =
        req.body || {};
      if (!companyName || !position) {
        res.status(400).json({
          error: "Validation error",
          message: "companyName and position are required",
        });
        return;
      }
      const doc = await SavedCoverLetterModel.create({
        companyName: String(companyName).trim(),
        position: String(position).trim(),
        jobDescription:
          jobDescription != null ? String(jobDescription).trim() : undefined,
        bodyText: bodyText != null ? String(bodyText) : "",
      });
      res.status(201).json(toItem(doc.toObject() as Record<string, unknown>));
    } catch (err) {
      console.error("SavedCoverLetter create error:", err);
      res.status(500).json({
        error: "Failed to create cover letter",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { companyName, position, jobDescription, bodyText } =
        req.body || {};
      const updates: Record<string, unknown> = {};
      if (companyName != null) updates.companyName = String(companyName).trim();
      if (position != null) updates.position = String(position).trim();
      if (jobDescription !== undefined)
        updates.jobDescription = String(jobDescription).trim();
      if (bodyText !== undefined) updates.bodyText = String(bodyText);

      const doc = await SavedCoverLetterModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Cover letter not found",
        });
        return;
      }
      res.json(toItem(doc as Record<string, unknown>));
    } catch (err) {
      console.error("SavedCoverLetter update error:", err);
      res.status(500).json({
        error: "Failed to update cover letter",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const doc = await SavedCoverLetterModel.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Cover letter not found",
        });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("SavedCoverLetter delete error:", err);
      res.status(500).json({
        error: "Failed to delete cover letter",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
