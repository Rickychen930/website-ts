/**
 * Note Controller - CRUD for notes (admin only)
 */

import { Request, Response } from "express";
import { NoteModel } from "../models/Note";

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

export class NoteController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-updatedAt";
      const category = req.query.category as string | undefined;

      const filter =
        category && ["study", "work", "interview", "other"].includes(category)
          ? { category }
          : {};
      const docs = await NoteModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => toItem(d));
      const total = await NoteModel.countDocuments(filter);

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("Note list error:", err);
      res.status(500).json({
        error: "Failed to list notes",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, category } = req.body || {};
      if (!title || typeof title !== "string" || !title.trim()) {
        res
          .status(400)
          .json({ error: "Validation error", message: "title is required" });
        return;
      }
      const doc = await NoteModel.create({
        title: String(title).trim(),
        content: content != null ? String(content) : "",
        category: ["study", "work", "interview", "other"].includes(category)
          ? category
          : "other",
      });
      res.status(201).json(toItem(doc.toObject() as Record<string, unknown>));
    } catch (err) {
      console.error("Note create error:", err);
      res.status(500).json({
        error: "Failed to create note",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content, category } = req.body || {};
      const updates: Record<string, unknown> = {};
      if (title != null) updates.title = String(title).trim();
      if (content !== undefined) updates.content = String(content);
      if (["study", "work", "interview", "other"].includes(category))
        updates.category = category;

      const doc = await NoteModel.findByIdAndUpdate(id, updates, {
        new: true,
      }).lean();
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Note not found" });
        return;
      }
      res.json(toItem(doc as Record<string, unknown>));
    } catch (err) {
      console.error("Note update error:", err);
      res.status(500).json({
        error: "Failed to update note",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const doc = await NoteModel.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Not found", message: "Note not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("Note delete error:", err);
      res.status(500).json({
        error: "Failed to delete note",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
