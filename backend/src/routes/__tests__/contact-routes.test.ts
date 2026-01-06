/**
 * Integration tests for Contact API routes
 */

import request from 'supertest';
import express from 'express';
import contactRoutes from '../contact-routes';
import { ContactMessageModel } from '../../models/contact-message-model';
import mongoose from 'mongoose';

// Mock the ContactMessageModel
jest.mock('../../models/contact-message-model');

const app = express();
app.use(express.json());
app.use('/api/contact', contactRoutes);

describe('Contact API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    const validContactData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    };

    it('should create a contact message successfully', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...validContactData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      (ContactMessageModel as any).mockImplementation(() => ({
        save: mockSave,
      }));

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('id');
      expect(mockSave).toHaveBeenCalled();
    });

    it('should return 400 if name is missing', async () => {
      const { name, ...dataWithoutName } = validContactData;

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithoutName)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });

    it('should return 400 if email is missing', async () => {
      const { email, ...dataWithoutEmail } = validContactData;

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithoutEmail)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if subject is missing', async () => {
      const { subject, ...dataWithoutSubject } = validContactData;

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithoutSubject)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if message is missing', async () => {
      const { message, ...dataWithoutMessage } = validContactData;

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithoutMessage)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if name is too long', async () => {
      const longName = 'a'.repeat(101);
      const dataWithLongName = { ...validContactData, name: longName };

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithLongName)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('100 characters');
    });

    it('should return 400 if subject is too long', async () => {
      const longSubject = 'a'.repeat(201);
      const dataWithLongSubject = { ...validContactData, subject: longSubject };

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithLongSubject)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('200 characters');
    });

    it('should return 400 if message is too long', async () => {
      const longMessage = 'a'.repeat(5001);
      const dataWithLongMessage = { ...validContactData, message: longMessage };

      const response = await request(app)
        .post('/api/contact')
        .send(dataWithLongMessage)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('5000 characters');
    });

    it('should return 500 on database error', async () => {
      const mockSave = jest.fn().mockRejectedValue(new Error('Database error'));

      (ContactMessageModel as any).mockImplementation(() => ({
        save: mockSave,
      }));

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(500);

      expect(response.body).toHaveProperty('error');
    });
  });
});

