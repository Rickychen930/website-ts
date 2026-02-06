/**
 * Admin Routes - Protected API for dashboard
 */

import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth";
import { AdminController } from "../controllers/AdminController";
import { ProfileController } from "../controllers/ProfileController";
import { ContactController } from "../controllers/ContactController";

const router = Router();
const adminController = new AdminController();
const profileController = new ProfileController();
const contactController = new ContactController();

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

export default router;
