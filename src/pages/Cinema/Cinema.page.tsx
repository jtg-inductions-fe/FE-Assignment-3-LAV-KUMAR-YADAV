import { ErrorBoundary } from '@/components';
import { Cinema as CinemaContainer, ErrorFallback } from '@/containers';

/**
 * A page which shows all the movies with their slots in a particular cinema with cinema location
 */
export const Cinema = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <CinemaContainer />
    </ErrorBoundary>
);
