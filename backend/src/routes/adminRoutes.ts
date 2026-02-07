/**
 * Admin Routes - Protected API for dashboard
 */

import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth";
import { AdminController } from "../controllers/AdminController";
import { ProfileController } from "../controllers/ProfileController";
import { ContactController } from "../controllers/ContactController";
import { AppliedCompanyController } from "../controllers/AppliedCompanyController";
import { TaskController } from "../controllers/TaskController";
import { GoalController } from "../controllers/GoalController";
import { NoteController } from "../controllers/NoteController";
import { SavedCoverLetterController } from "../controllers/SavedCoverLetterController";
import { SavedJobController } from "../controllers/SavedJobController";
import { AiController } from "../controllers/AiController";

const router = Router();
const aiController = new AiController();
const adminController = new AdminController();
const profileController = new ProfileController();
const contactController = new ContactController();
const appliedCompanyController = new AppliedCompanyController();
const taskController = new TaskController();
const goalController = new GoalController();
const noteController = new NoteController();
const savedCoverLetterController = new SavedCoverLetterController();
const savedJobController = new SavedJobController();

router.post("/login", (req, res) => adminController.login(req, res));

router.get("/stats", requireAdmin, (req, res) =>
  adminController.getStats(req, res),
);

router.put("/profile", requireAdmin, (req, res) =>
  profileController.updateProfile(req, res),
);

router.get("/contacts", requireAdmin, (req, res) =>
  contactController.listContactMessages(req, res),
);
router.delete("/contacts/:id", requireAdmin, (req, res) =>
  contactController.deleteContactMessage(req, res),
);

router.get("/companies", requireAdmin, (req, res) =>
  appliedCompanyController.list(req, res),
);
router.post("/companies", requireAdmin, (req, res) =>
  appliedCompanyController.create(req, res),
);
router.put("/companies/:id", requireAdmin, (req, res) =>
  appliedCompanyController.update(req, res),
);
router.delete("/companies/:id", requireAdmin, (req, res) =>
  appliedCompanyController.delete(req, res),
);

router.get("/tasks", requireAdmin, (req, res) => taskController.list(req, res));
router.post("/tasks", requireAdmin, (req, res) =>
  taskController.create(req, res),
);
router.put("/tasks/:id", requireAdmin, (req, res) =>
  taskController.update(req, res),
);
router.delete("/tasks/:id", requireAdmin, (req, res) =>
  taskController.delete(req, res),
);

router.get("/goals", requireAdmin, (req, res) => goalController.list(req, res));
router.post("/goals", requireAdmin, (req, res) =>
  goalController.create(req, res),
);
router.put("/goals/:id", requireAdmin, (req, res) =>
  goalController.update(req, res),
);
router.delete("/goals/:id", requireAdmin, (req, res) =>
  goalController.delete(req, res),
);

router.get("/notes", requireAdmin, (req, res) => noteController.list(req, res));
router.post("/notes", requireAdmin, (req, res) =>
  noteController.create(req, res),
);
router.put("/notes/:id", requireAdmin, (req, res) =>
  noteController.update(req, res),
);
router.delete("/notes/:id", requireAdmin, (req, res) =>
  noteController.delete(req, res),
);

router.get("/cover-letters", requireAdmin, (req, res) =>
  savedCoverLetterController.list(req, res),
);
router.post("/cover-letters", requireAdmin, (req, res) =>
  savedCoverLetterController.create(req, res),
);
router.put("/cover-letters/:id", requireAdmin, (req, res) =>
  savedCoverLetterController.update(req, res),
);
router.delete("/cover-letters/:id", requireAdmin, (req, res) =>
  savedCoverLetterController.delete(req, res),
);

router.get("/saved-jobs", requireAdmin, (req, res) =>
  savedJobController.list(req, res),
);
router.post("/saved-jobs", requireAdmin, (req, res) =>
  savedJobController.create(req, res),
);
router.put("/saved-jobs/:id", requireAdmin, (req, res) =>
  savedJobController.update(req, res),
);
router.delete("/saved-jobs/:id", requireAdmin, (req, res) =>
  savedJobController.delete(req, res),
);

router.get("/ai/status", requireAdmin, (req, res) =>
  aiController.status(req, res),
);
router.post("/ai/enhance-cover-letter", requireAdmin, (req, res) =>
  aiController.enhanceCoverLetter(req, res),
);
router.post("/ai/summarize-jd", requireAdmin, (req, res) =>
  aiController.summarizeJobDescription(req, res),
);
router.post("/ai/interview-questions", requireAdmin, (req, res) =>
  aiController.generateInterviewQuestions(req, res),
);

export default router;
