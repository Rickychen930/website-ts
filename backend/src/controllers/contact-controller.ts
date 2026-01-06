/**
 * Contact Controller
 * Handles contact form submissions
 */

import { ContactMessageModel, IContactMessage } from '../models/contact-message-model';
import { logger } from '../utils/logger';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Create a new contact message
 */
export async function createContactMessage(
  data: ContactFormData
): Promise<IContactMessage> {
  try {
    // Validate input
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error('All fields are required');
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }

    // Create contact message
    const contactMessage = new ContactMessageModel({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    const saved = await contactMessage.save();
    logger.info('Contact message created', { id: saved._id, email: saved.email }, 'ContactController');
    
    return saved;
  } catch (error) {
    logger.error('Failed to create contact message', error, 'ContactController');
    throw error;
  }
}

/**
 * Get all contact messages (admin only - for future use)
 */
export async function getContactMessages(
  limit: number = 50,
  skip: number = 0
): Promise<IContactMessage[]> {
  try {
    const messages = await ContactMessageModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();

    return messages;
  } catch (error) {
    logger.error('Failed to get contact messages', error, 'ContactController');
    throw error;
  }
}

/**
 * Get contact message by ID
 */
export async function getContactMessageById(id: string): Promise<IContactMessage | null> {
  try {
    const message = await ContactMessageModel.findById(id).exec();
    return message;
  } catch (error) {
    logger.error('Failed to get contact message by ID', error, 'ContactController');
    throw error;
  }
}

