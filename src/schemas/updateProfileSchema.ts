import z from 'zod';

import { imageSchema } from './imageSchema';

/**
 * Zod schema for validating update profile form input.
 *
 * Validates:
 * - Optional Personal information
 * - Optional profile image upload
 */
export const updateProfileSchema = z.object({
    name: z.string().trim().min(2).max(50).optional(),
    email: z.email().optional(),
    phone_number: z
        .string()
        .length(10, 'Phone number should be exactly 10 digits')
        .optional()
        .or(z.string().length(0)),
    profile_pic: imageSchema.optional(),
});
