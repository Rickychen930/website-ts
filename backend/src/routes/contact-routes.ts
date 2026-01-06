/**
 * Contact Routes
 * API routes for contact form
 */

import { Router } from 'express';
import { createContactMessage } from '../controllers/contact-controller';
import { logger } from '../utils/logger';
import { contactFormRateLimiter } from '../middleware/rate-limiter';

const router = Router();

// Apply rate limiting to all contact routes
router.use(contactFormRateLimiter.middleware());

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required',
        fields: { name: !!name, email: !!email, subject: !!subject, message: !!message },
      });
    }

    // Validate field lengths
    if (name.length > 100) {
      return res.status(400).json({ error: 'Name must be less than 100 characters' });
    }
    if (subject.length > 200) {
      return res.status(400).json({ error: 'Subject must be less than 200 characters' });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message must be less than 5000 characters' });
    }

    // Create contact message
    const contactMessage = await createContactMessage({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      id: contactMessage._id,
    });
  } catch (error) {
    logger.error('Error in contact form submission', error, 'ContactRoutes');
    
    if (error instanceof Error) {
      // Validation errors
      if (error.message.includes('required') || error.message.includes('Invalid')) {
        return res.status(400).json({ error: error.message });
      }
    }

    res.status(500).json({
      error: 'Failed to submit contact message. Please try again later.',
    });
  }
});

export default router;

