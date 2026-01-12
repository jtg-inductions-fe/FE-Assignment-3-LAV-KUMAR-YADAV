import z from 'zod';

import { imageSchema } from './imageSchema';
import { passwordSchema } from './passwordSchema';

export const signupSchema = z
    .object({
        name: z.string().trim().min(2).max(50),
        email: z.email(),
        phone_number: z
            .string()
            .length(10, 'phone number should be exactly 10 digits')
            .optional(),
        profile_pic: imageSchema.optional(),
        password: passwordSchema,
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'password do not match',
        path: ['confirmPassword'],
    });
