import z from 'zod';

export const passwordSchema = z
    .string()
    .min(8, 'password must contains at least 8 characters')
    .regex(/[a-z]/, 'password must contains at least 1 lowercase letter')
    .regex(/[A-Z]/, 'password must contains at least 1 upperrcase letter')
    .regex(/[0-9]/, 'password must contains at least 1 number')
    .regex(
        /[^a-zA-Z0-9]/,
        'password must contains at least 1 special character',
    );
