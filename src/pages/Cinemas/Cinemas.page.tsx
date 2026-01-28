import { ErrorBoundary } from '@/components';
import { Cinemas as CinemasContainer, ErrorFallback } from '@/containers';

/**
 *
 *  A page which will show list of cinemas
 */
export const Cinemas = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <CinemasContainer />
    </ErrorBoundary>
);
