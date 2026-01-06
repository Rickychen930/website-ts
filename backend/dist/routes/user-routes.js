"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user-controller");
const logger_1 = require("../utils/logger");
const rate_limiter_1 = require("../middleware/rate-limiter");
const router = (0, express_1.Router)();
// Apply rate limiting to all user routes
router.use(rate_limiter_1.apiRateLimiter.middleware());
/**
 * Validation middleware for user name parameter
 */
const userNameValidation = [
    (0, express_validator_1.param)("name")
        .trim()
        .notEmpty()
        .withMessage("Name parameter is required")
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters")
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage("Name contains invalid characters"),
];
router.get("/:name", userNameValidation, async (req, res) => {
    try {
        // Check validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: "Validation failed",
                errors: errors.array(),
            });
        }
        const name = decodeURIComponent(req.params.name);
        const user = await (0, user_controller_1.getUserByName)(name);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        logger_1.logger.error("Error fetching user by name", err, "UserRoutes");
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
exports.default = router;
