import z from 'zod';

/**
 * Maximum allowed image file size (5MB).
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * List of supported image MIME types.
 */
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

/**
 * Zod schema for validating uploaded image files.
 *
 * Validates:
 * - File size does not exceed 5MB.
 * - File type is one of the supported image formats.
 */
export const imageSchema = z
    .file()
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
    );
