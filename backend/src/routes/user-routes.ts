import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { getUserByName } from "../controllers/user-controller";
import { logger } from "../utils/logger";
import { apiRateLimiter } from "../middleware/rate-limiter";

const router = Router();

// Apply rate limiting to all user routes
router.use(apiRateLimiter.middleware());

/**
 * Validation middleware for user name parameter
 */
const userNameValidation = [
  param("name")
    .trim()
    .notEmpty()
    .withMessage("Name parameter is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters")
    .matches(/^[a-zA-Z0-9\s'-]+$/)
    .withMessage("Name contains invalid characters"),
];

router.get(
  "/:name",
  userNameValidation,
  async (req: Request, res: Response) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          errors: errors.array(),
        });
      }

      const name = decodeURIComponent(req.params.name);
      const user = await getUserByName(name);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      logger.error("Error fetching user by name", err, "UserRoutes");
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },
);

export default router;
