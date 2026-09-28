/**
 * Chat Controller — thin HTTP layer over ChatbotService
 */

import { Request, Response } from "express";
import {
  chatbotService,
  ChatbotError,
} from "../services/chatbot/ChatbotService";

export class ChatController {
  public async message(req: Request, res: Response): Promise<void> {
    try {
      const result = await chatbotService.handleMessage({
        message: req.body?.message,
        session_id: req.body?.session_id,
        ip: req.ip ?? "unknown",
      });
      res.json(result);
    } catch (err) {
      if (err instanceof ChatbotError) {
        res.status(err.status).json({ success: false, error: err.message });
        return;
      }
      console.error(
        "[chatbot] unexpected error:",
        err instanceof Error ? err.message : "unknown",
      );
      res.status(500).json({
        success: false,
        error: "Kobi dozed off for a moment — please try again.",
      });
    }
  }
}
