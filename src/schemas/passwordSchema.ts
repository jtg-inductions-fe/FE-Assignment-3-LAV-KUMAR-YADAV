import z from 'zod';

/**
 * Zod schema for validating strong passwords.
 *
 * Requirements:
 * - At least 8 characters
 * - At least 1 lowercase letter
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must contains at least 8 characters')
    .regex(/[a-z]/, 'Password must contains at least 1 lowercase letter')
    .regex(/[A-Z]/, 'Password must contains at least 1 uppercase letter')
    .regex(/[0-9]/, 'Password must contains at least 1 number')
    .regex(
        /[^a-zA-Z0-9]/,
        'Password must contains at least 1 special character',
    );
