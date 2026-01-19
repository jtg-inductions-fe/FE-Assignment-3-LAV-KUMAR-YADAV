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
 * Return a utility function which convert a number into Alphabets
 * @example A -> 1, AA -> 27, AC-> 29, AAC
 */
export const numberToAlphabet = (num: number): string => {
    let result = '';

    while (num > 0) {
        num--;

        const remainder = num % 26;
        result = String.fromCharCode(65 + remainder) + result;
        num = Math.floor(num / 26);
    }

    return result;
};
