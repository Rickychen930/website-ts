/**
 * Task Controller - CRUD for tasks (admin only)
 */

import { Request, Response } from "express";
import { TaskModel } from "../models/Task";

function toItem(d: Record<string, unknown>) {
  const id = (d._id as { toString?: () => string })?.toString?.();
  const { _id, ...rest } = d;
  return {
    ...rest,
    id: id ?? _id,
    dueDate: (d.dueDate as Date)?.toISOString?.() ?? d.dueDate,
    createdAt: (d.createdAt as Date)?.toISOString?.() ?? d.createdAt,
    updatedAt: (d.updatedAt as Date)?.toISOString?.() ?? d.updatedAt,
  };
}

export class TaskController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-createdAt";
      const status = req.query.status as string | undefined;

      const filter =
        status && ["todo", "in_progress", "done"].includes(status)
          ? { status }
          : {};
      const docs = await TaskModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => toItem(d));
      const total = await TaskModel.countDocuments(filter);

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("Task list error:", err);
      res.status(500).json({
        error: "Failed to list tasks",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, dueDate, priority, status, category, notes } =
        req.body || {};
      if (!title || typeof title !== "string" || !title.trim()) {
        res
          .status(400)
          .json({ error: "Validation error", message: "title is required" });
        return;
      }
      const doc = await TaskModel.create({
        title: String(title).trim(),
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority: ["low", "medium", "high"].includes(priority)
          ? priority
          : "medium",
        status: ["todo", "in_progress", "done"].includes(status)
          ? status
          : "todo",
        category: ["study", "work", "personal"].includes(category)
          ? category
          : "personal",
        notes: notes != null ? String(notes).trim() : undefined,
      });
      res.status(201).json(toItem(doc.toObject() as Record<string, unknown>));
    } catch (err) {
      console.error("Task create error:", err);
      res.status(500).json({
        error: "Failed to create task",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, dueDate, priority, status, category, notes } =
        req.body || {};
      const updates: Record<string, unknown> = {};
      if (title != null) updates.title = String(title).trim();
      if (dueDate !== undefined)
        updates.dueDate = dueDate ? new Date(dueDate) : null;
      if (["low", "medium", "high"].includes(priority))
        updates.priority = priority;
      if (["todo", "in_progress", "done"].includes(status))
        updates.status = status;
      if (["study", "work", "personal"].includes(category))
        updates.category = category;
      if (notes !== undefined) updates.notes = String(notes).trim();

      const doc = await TaskModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Task not found" });
        return;
      }
      res.json(toItem(doc as Record<string, unknown>));
    } catch (err) {
      console.error("Task update error:", err);
      res.status(500).json({
        error: "Failed to update task",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const doc = await TaskModel.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Task not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("Task delete error:", err);
      res.status(500).json({
        error: "Failed to delete task",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
