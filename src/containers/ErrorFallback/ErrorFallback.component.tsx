import OopsIllustration from '@/assets/images/oops.svg';
import { StatusFallback } from '@/components';

/**
 * ErrorFallback component
 *
 * Displays a generic error state when an unexpected application error occurs.
 *
 * @example
 * ```tsx
 * <ErrorFallback />
 * ```
 */

export const ErrorFallback = () => (
    <StatusFallback
        heading="Something Went Wrong"
        content="We keep track of these errors, but feel free to contact us if refreshing doesn't fix things."
        illustration={OopsIllustration}
    />
);
