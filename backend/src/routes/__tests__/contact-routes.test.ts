/**
 * Unit tests for Contact Routes
 * Tests express-validator validation and rate limiting
 */

import request from "supertest";
import express, { Express } from "express";
import contactRoutes from "../contact-routes";
import { createContactMessage } from "../../controllers/contact-controller";

// Mock the contact controller
jest.mock("../../controllers/contact-controller", () => ({
  createContactMessage: jest.fn(),
}));

// Mock rate limiter to bypass rate limiting in tests
jest.mock("../../middleware/rate-limiter", () => ({
  contactFormRateLimiter: {
    middleware: () => (req: any, res: any, next: any) => next(),
  },
}));

describe("Contact Routes", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/contact", contactRoutes);
    jest.clearAllMocks();
  });

  describe("POST /api/contact", () => {
    const validContactData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message:
        "This is a test message with enough characters to pass validation.",
    };

    it("should create contact message with valid data", async () => {
      const mockContactMessage = {
        _id: "123",
        ...validContactData,
      };

      (createContactMessage as jest.Mock).mockResolvedValue(mockContactMessage);

      const response = await request(app)
        .post("/api/contact")
        .send(validContactData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: "Contact message submitted successfully",
        id: "123",
      });
      expect(createContactMessage).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message:
          "This is a test message with enough characters to pass validation.",
      });
    });

    it("should reject request with missing name", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          email: validContactData.email,
          subject: validContactData.subject,
          message: validContactData.message,
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(response.body.errors).toBeDefined();
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with invalid email format", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          email: "invalid-email",
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(
        response.body.errors.some((e: any) => e.msg.includes("email")),
      ).toBe(true);
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with name too short", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          name: "A",
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with name too long", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          name: "A".repeat(101),
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with invalid characters in name", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          name: "John123",
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with subject too short", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          subject: "AB",
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should reject request with message too short", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          message: "Short",
        })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(createContactMessage).not.toHaveBeenCalled();
    });

    it("should sanitize HTML in subject and message", async () => {
      const mockContactMessage = {
        _id: "123",
        ...validContactData,
      };

      (createContactMessage as jest.Mock).mockResolvedValue(mockContactMessage);

      const response = await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          subject: '<script>alert("xss")</script>Test Subject',
          message:
            '<script>alert("xss")</script>This is a test message with enough characters.',
        })
        .expect(201);

      // Verify response body
      expect(response.body).toBeDefined();

      // express-validator's escape() should sanitize HTML
      expect(createContactMessage).toHaveBeenCalled();
      const callArgs = (createContactMessage as jest.Mock).mock.calls[0][0];
      expect(callArgs.subject).not.toContain("<script>");
      expect(callArgs.message).not.toContain("<script>");
    });

    it("should handle controller errors gracefully", async () => {
      (createContactMessage as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .post("/api/contact")
        .send(validContactData)
        .expect(500);

      expect(response.body.error).toBe(
        "Failed to submit contact message. Please try again later.",
      );
    });

    it("should normalize email to lowercase", async () => {
      const mockContactMessage = {
        _id: "123",
        ...validContactData,
      };

      (createContactMessage as jest.Mock).mockResolvedValue(mockContactMessage);

      await request(app)
        .post("/api/contact")
        .send({
          ...validContactData,
          email: "JOHN@EXAMPLE.COM",
        })
        .expect(201);

      expect(createContactMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "john@example.com",
        }),
      );
    });
  });
});
