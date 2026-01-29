import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class name values into a single string while resolving
 * Tailwind CSS class conflicts intelligently.
 *
 * This utility is a wrapper around `clsx` for conditional class construction
 * and `tailwind-merge` for deduplicating and merging Tailwind classes.
 *
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Returns a string with capitalized first character
 */
export const capitalizeFirstCharacter = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText === '') return;

    return trimmedText[0].toUpperCase() + trimmedText.slice(1);
};

/**
 * A utility function which converts a number into Alphabets
 * @example 1 -> A, 27 -> AA, 29 -> AC, 731 -> ABC
 */
export const numberToAlphabet = (num: number): string => {
    if (!Number.isInteger(num) || num <= 0) return '';
    let result = '';

    while (num > 0) {
        num--;

        const remainder = num % 26;
        result = String.fromCharCode(65 + remainder) + result;
        num = Math.floor(num / 26);
    }

    return result;
};

/**
 * Converts a plain object into FormData.
 *
 * Used primarily for multipart/form-data requests such as
 * user registration with file uploads.
 */
export const getFormData = (
    object: Record<string, string | File | undefined>,
) =>
    Object.keys(object).reduce((formData, key) => {
        if (object[key]) {
            formData.append(key, object[key]);
        }

        return formData;
    }, new FormData());
