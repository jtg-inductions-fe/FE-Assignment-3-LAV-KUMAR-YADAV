import z from 'zod';

import { passwordSchema } from './passwordSchema';

/**
 * Zod schema for validating login form input.
 *
 * Ensures:
 * - Valid email format
 * - Strong password format
 */
export const loginSchema = z.object({
    email: z.email(),
    password: passwordSchema,
});
