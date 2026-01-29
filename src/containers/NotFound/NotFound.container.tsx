import OopsIllustration from '@/assets/illustrations/oops.svg';
import { StatusFallback } from '@/components';

/**
 * NotFound component
 *
 * Displays a 404 fallback page when the requested route does not exist.
 *
 * @example
 * ```tsx
 * <NotFound />
 * ```
 */

export const NotFound = () => (
    <StatusFallback
        heading="404 - Page Not Found"
        content="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        illustration={OopsIllustration}
        to={{ link: '/', title: 'GO TO HOMEPAGE' }}
    />
);
