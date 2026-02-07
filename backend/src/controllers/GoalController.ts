/**
 * Goal Controller - CRUD for goals (admin only)
 */

import { Request, Response } from "express";
import { GoalModel } from "../models/Goal";

function toItem(d: Record<string, unknown>) {
  const id = (d._id as { toString?: () => string })?.toString?.();
  const { _id, ...rest } = d;
  return {
    ...rest,
    id: id ?? _id,
    targetDate: (d.targetDate as Date)?.toISOString?.() ?? d.targetDate,
    createdAt: (d.createdAt as Date)?.toISOString?.() ?? d.createdAt,
    updatedAt: (d.updatedAt as Date)?.toISOString?.() ?? d.updatedAt,
  };
}

export class GoalController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-createdAt";
      const status = req.query.status as string | undefined;

      const filter =
        status && ["active", "completed"].includes(status) ? { status } : {};
      const docs = await GoalModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => toItem(d));
      const total = await GoalModel.countDocuments(filter);

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("Goal list error:", err);
      res.status(500).json({
        error: "Failed to list goals",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, targetDate, status, notes } = req.body || {};
      if (!title || typeof title !== "string" || !title.trim()) {
        res
          .status(400)
          .json({ error: "Validation error", message: "title is required" });
        return;
      }
      const doc = await GoalModel.create({
        title: String(title).trim(),
        targetDate: targetDate ? new Date(targetDate) : undefined,
        status: ["active", "completed"].includes(status) ? status : "active",
        notes: notes != null ? String(notes).trim() : undefined,
      });
      res
        .status(201)
        .json(toItem(doc.toObject() as unknown as Record<string, unknown>));
    } catch (err) {
      console.error("Goal create error:", err);
      res.status(500).json({
        error: "Failed to create goal",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, targetDate, status, notes } = req.body || {};
      const updates: Record<string, unknown> = {};
      if (title != null) updates.title = String(title).trim();
      if (targetDate !== undefined)
        updates.targetDate = targetDate ? new Date(targetDate) : null;
      if (["active", "completed"].includes(status)) updates.status = status;
      if (notes !== undefined) updates.notes = String(notes).trim();

      const doc = await GoalModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Goal not found" });
        return;
      }
      res.json(toItem(doc as Record<string, unknown>));
    } catch (err) {
      console.error("Goal update error:", err);
      res.status(500).json({
        error: "Failed to update goal",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const doc = await GoalModel.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Goal not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("Goal delete error:", err);
      res.status(500).json({
        error: "Failed to delete goal",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
