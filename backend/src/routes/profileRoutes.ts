/**
 * Profile Routes - API route definitions
 */

import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";

const router = Router();
const profileController = new ProfileController();

router.get("/", (req, res) => profileController.getProfile(req, res));

export default router;
