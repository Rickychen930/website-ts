/**
 * Applied Company Controller - CRUD for tracked companies (admin only)
 */

import { Request, Response } from "express";
import { AppliedCompanyModel } from "../models/AppliedCompany";

export class AppliedCompanyController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(Math.max(0, Number(req.query.limit) || 50), 200);
      const skip = Math.max(0, Number(req.query.skip) || 0);
      const sort = (req.query.sort as string) || "-appliedAt";

      const docs = await AppliedCompanyModel.find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const items = docs.map((d: Record<string, unknown>) => {
        const id = (d._id as { toString?: () => string })?.toString?.();
        const { _id, ...rest } = d;
        return {
          ...rest,
          id: id ?? _id,
          appliedAt: (d.appliedAt as Date)?.toISOString?.() ?? d.appliedAt,
          followUpAt: (d.followUpAt as Date)?.toISOString?.() ?? d.followUpAt,
          nextInterviewAt:
            (d.nextInterviewAt as Date)?.toISOString?.() ?? d.nextInterviewAt,
          createdAt: (d.createdAt as Date)?.toISOString?.() ?? d.createdAt,
          updatedAt: (d.updatedAt as Date)?.toISOString?.() ?? d.updatedAt,
        };
      });
      const total = await AppliedCompanyModel.countDocuments();

      res.json({ items, total, limit, skip });
    } catch (err) {
      console.error("AppliedCompany list error:", err);
      res.status(500).json({
        error: "Failed to list companies",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        companyName,
        position,
        appliedAt,
        status,
        notes,
        jobUrl,
        followUpAt,
        nextInterviewAt,
        contactPerson,
      } = req.body || {};
      if (!companyName || !position) {
        res.status(400).json({
          error: "Validation error",
          message: "companyName and position are required",
        });
        return;
      }
      const doc = await AppliedCompanyModel.create({
        companyName: String(companyName).trim(),
        position: String(position).trim(),
        appliedAt: appliedAt ? new Date(appliedAt) : new Date(),
        status: [
          "applied",
          "interview",
          "rejected",
          "offer",
          "withdrawn",
        ].includes(status)
          ? status
          : "applied",
        notes: notes != null ? String(notes).trim() : undefined,
        jobUrl: jobUrl != null ? String(jobUrl).trim() : undefined,
        followUpAt: followUpAt ? new Date(followUpAt) : undefined,
        nextInterviewAt: nextInterviewAt
          ? new Date(nextInterviewAt)
          : undefined,
        contactPerson:
          contactPerson != null ? String(contactPerson).trim() : undefined,
      });
      const obj = doc.toJSON();
      res.status(201).json({
        ...obj,
        appliedAt: doc.appliedAt?.toISOString?.(),
        followUpAt: doc.followUpAt?.toISOString?.(),
        nextInterviewAt: doc.nextInterviewAt?.toISOString?.(),
      });
    } catch (err) {
      console.error("AppliedCompany create error:", err);
      res.status(500).json({
        error: "Failed to create company",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        companyName,
        position,
        appliedAt,
        status,
        notes,
        jobUrl,
        followUpAt,
        nextInterviewAt,
        contactPerson,
      } = req.body || {};
      const doc = await AppliedCompanyModel.findByIdAndUpdate(
        id,
        {
          ...(companyName != null && {
            companyName: String(companyName).trim(),
          }),
          ...(position != null && { position: String(position).trim() }),
          ...(appliedAt != null && { appliedAt: new Date(appliedAt) }),
          ...(status != null &&
            ["applied", "interview", "rejected", "offer", "withdrawn"].includes(
              status,
            ) && { status }),
          ...(notes !== undefined && { notes: String(notes).trim() }),
          ...(jobUrl !== undefined && { jobUrl: String(jobUrl).trim() }),
          ...(followUpAt !== undefined && {
            followUpAt: followUpAt ? new Date(followUpAt) : null,
          }),
          ...(nextInterviewAt !== undefined && {
            nextInterviewAt: nextInterviewAt ? new Date(nextInterviewAt) : null,
          }),
          ...(contactPerson !== undefined && {
            contactPerson: String(contactPerson).trim(),
          }),
        },
        { new: true, runValidators: true },
      );
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Company not found",
        });
        return;
      }
      const obj = doc.toJSON();
      res.json({
        ...obj,
        appliedAt: doc.appliedAt?.toISOString?.(),
        followUpAt: doc.followUpAt?.toISOString?.(),
        nextInterviewAt: doc.nextInterviewAt?.toISOString?.(),
      });
    } catch (err) {
      console.error("AppliedCompany update error:", err);
      res.status(500).json({
        error: "Failed to update company",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doc = await AppliedCompanyModel.findByIdAndDelete(id);
      if (!doc) {
        res.status(404).json({
          error: "Not found",
          message: "Company not found",
        });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error("AppliedCompany delete error:", err);
      res.status(500).json({
        error: "Failed to delete company",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
}
