/**
 * Chat Routes — portfolio assistant ("Kobi")
 */

import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ChatController } from "../controllers/ChatController";
import { CHAT_MAX_LENGTH } from "../services/chatbot/ChatbotService";

const router = Router();
const chatController = new ChatController();

const validateMessage = [
  body("message")
    .isString()
    .withMessage("Message is required")
    .trim()
    .isLength({ min: 1, max: CHAT_MAX_LENGTH })
    .withMessage(`Message must be 1–${CHAT_MAX_LENGTH} characters`),
  body("session_id").optional().isString().isLength({ max: 64 }),
];

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: errors.array()[0]?.msg ?? "Invalid request",
    });
    return;
  }
  next();
};

router.post(
  "/message",
  validateMessage,
  handleValidationErrors,
  (req: Request, res: Response) => chatController.message(req, res),
);

export default router;
