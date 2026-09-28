import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  phone: z.string().trim().max(24).regex(/^[+\d ()-]+$/, 'Please enter a valid contact number.')
    .transform((value) => value.replace(/[ ()-]/g, ''))
    .pipe(z.string().regex(/^\+?\d{10,15}$/, 'Please enter a valid contact number.')),
  email: z.union([z.string().trim().email().max(254), z.literal('')]).optional().default(''),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0, 'Please try submitting the form again.').optional(),
});
