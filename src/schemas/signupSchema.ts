import z from 'zod';

import { imageSchema } from './imageSchema';
import { passwordSchema } from './passwordSchema';

/**
 * Zod schema for validating signup form input.
 *
 * Validates:
 * - Personal information
 * - Optional profile image upload
 * - Strong password rules
 * - Matching password confirmation
 */
export const signupSchema = z
    .object({
        name: z.string().trim().min(2).max(50),
        email: z.email(),
        phone_number: z
            .string()
            .length(10, 'Phone number should be exactly 10 digits')
            .optional()
            .or(z.string().length(0)),
        profile_pic: imageSchema.optional(),
        password: passwordSchema,
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Confirm Password do not match with password',
        path: ['confirm_password'],
    });
