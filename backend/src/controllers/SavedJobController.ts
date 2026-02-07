/**
 * Saved Job Controller - CRUD for job wishlist (admin only)
 */

import { Request, Response } from "express";
import { SavedJobModel } from "../models/SavedJob";

function toItem(d: Record<string, unknown>) {
  const id = (d._id as { toString?: () => string })?.toString?.();
  const { _id, ...rest } = d;
  return {
    ...rest,
    id: id ?? _id,
    savedAt: (d.savedAt as Date)?.toISOString?.() ?? d.savedAt,
    createdAt: (d.createdAt as Date)?.toISOString?.() ?? d.createdAt,
    updatedAt: (d.updatedAt as Date)?.toISOString?.() ?? d.updatedAt,
  };
}

export class SavedJobController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-savedAt";

      const docs = await SavedJobModel.find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => toItem(d));
      const total = await SavedJobModel.countDocuments();

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("SavedJob list error:", err);
      res.status(500).json({
        error: "Failed to list saved jobs",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { companyName, position, jobUrl, source, notes } = req.body || {};
      if (!companyName || !position) {
        res.status(400).json({
          error: "Validation error",
          message: "companyName and position are required",
        });
        return;
      }
      const doc = await SavedJobModel.create({
        companyName: String(companyName).trim(),
        position: String(position).trim(),
        jobUrl: jobUrl != null ? String(jobUrl).trim() : undefined,
        source: source != null ? String(source).trim() : undefined,
        notes: notes != null ? String(notes).trim() : undefined,
      });
      res
        .status(201)
        .json(toItem(doc.toObject() as unknown as Record<string, unknown>));
    } catch (err) {
      console.error("SavedJob create error:", err);
      res.status(500).json({
        error: "Failed to save job",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { companyName, position, jobUrl, source, notes } = req.body || {};
      const updates: Record<string, unknown> = {};
      if (companyName != null) updates.companyName = String(companyName).trim();
      if (position != null) updates.position = String(position).trim();
      if (jobUrl !== undefined) updates.jobUrl = String(jobUrl).trim();
      if (source !== undefined) updates.source = String(source).trim();
      if (notes !== undefined) updates.notes = String(notes).trim();

      const doc = await SavedJobModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Saved job not found",
        });
        return;
      }
      res.json(toItem(doc as Record<string, unknown>));
    } catch (err) {
      console.error("SavedJob update error:", err);
      res.status(500).json({
        error: "Failed to update saved job",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const doc = await SavedJobModel.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Saved job not found",
        });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("SavedJob delete error:", err);
      res.status(500).json({
        error: "Failed to delete saved job",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
